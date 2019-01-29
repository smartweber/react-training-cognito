import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'

type Params = {
  userPoolId: string
  clientId: string
}

type UserData = {
  email: string
  token: string
}

export class CognitoAPI {
  private userPool: CognitoUserPool

  constructor({ userPoolId, clientId }: Params) {
    this.userPool = new CognitoUserPool({
      ClientId: clientId,
      UserPoolId: userPoolId
    })
  }

  getUserData(session): UserData {
    let email = ''

    try {
      email = session.idToken.payload.email
    } catch (err) {
      console.error(err)
    }

    return {
      email,
      token: session.getIdToken().getJwtToken()
    }
  }

  sessionLogin(): Promise<UserData> {
    return new Promise((resolve, reject) => {
      const cognitoUser = this.userPool.getCurrentUser()
      if (!cognitoUser) {
        return reject({ message: 'no session' })
      }

      cognitoUser.getSession((err, session) => {
        if (err) {
          return reject(err)
        }
        if (!session.isValid()) {
          return reject({ message: 'invalid session' })
        }

        cognitoUser.getUserAttributes((errAttr, attributes) => {
          if (errAttr) {
            return reject(errAttr)
          }
          if (!attributes) {
            return reject({ message: 'missing user data' })
          }

          return resolve(this.getUserData(session))
        })
      })
    })
  }

  signIn(
    email: string,
    password: string,
    newPassword?: string
  ): Promise<UserData> {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      })

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool
      })

      const authCallbacks = {
        onSuccess: result => resolve(this.getUserData(result)),
        newPasswordRequired: userAttributes => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified

          if (!newPassword) {
            return reject({
              newPassword: true,
              message: 'must create new password'
            })
          }

          cognitoUser.completeNewPasswordChallenge(
            newPassword,
            userAttributes,
            authCallbacks
          )
        },
        onFailure: err => reject(err)
      }
      cognitoUser.authenticateUser(authenticationDetails, authCallbacks)
    })
  }

  signUp(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const dataEmail = {
        Name: 'email',
        Value: email
      }

      const attributeEmail = new CognitoUserAttribute(dataEmail)
      const attributeList = [attributeEmail]
      const validationData = []

      this.userPool.signUp(
        email,
        password,
        attributeList,
        validationData,
        (err, result) => {
          if (err || !result) {
            return reject(err)
          }
          if (result.userConfirmed === false) {
            return resolve({
              userConfirmed: result.userConfirmed
            })
          }
          return resolve(this.getUserData(result))
        }
      )
    })
  }

  confirmRegistration(
    email: string,
    password: string,
    code: string
  ): Promise<UserData> {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: this.userPool
      }

      const cognitoUser = new CognitoUser(userData)
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        this.signIn(email, password)
          .then(resolve)
          .catch(reject)
      })
    })
  }

  signOut() {
    const cognitoUser = this.userPool.getCurrentUser()
    if (!cognitoUser) {
      return null
    }
    return cognitoUser.signOut()
  }
}
