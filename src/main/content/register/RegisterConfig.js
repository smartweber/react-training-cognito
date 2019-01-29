import { authRoles } from 'auth/auth'
import Register from './Register'

export const RegisterConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        }
      }
    }
  },
  auth: authRoles.isLoggedOut,
  routes: [
    {
      path: '/register',
      component: Register
    }
  ]
}
