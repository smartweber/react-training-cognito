import 'babel-polyfill'
import 'typeface-roboto'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import history from './history'
import './react-table-defaults'
import './styles/index.css'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { routes } from './fuse-configs/fuseRoutesConfig'
import { FuseLayout, FuseTheme, FuseAuthorization } from './@fuse'
import MainToolbar from './main/MainToolbar'
import MainNavbarContent from './main/MainNavbarContent'
import MainNavbarHeader from './main/MainNavbarHeader'
import MainFooter from './main/MainFooter'
import jssExtend from 'jss-extend'
import store from './store'
import { getOrganization } from './auth/cognito/organizationApi'
import { setUserData } from './auth/store/actions'

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()]
})

// @ts-ignore
jss.options.insertionPoint = document.getElementById('jss-insertion-point')
const generateClassName = createGenerateClassName()

getOrganization()
  .then(res => {
    store.dispatch(
      setUserData({
        role: 'member',
        data: {
          displayName: res.email,
          photoURL: 'assets/images/avatars/profile.jpg',
          email: res.email
        }
      })
    )
  })
  .catch(err =>
    store.dispatch(
      setUserData({
        role: 'guest',
        data: {
          displayName: '',
          photoURL: '',
          email: ''
        }
      })
    )
  )
  .then(() =>
    ReactDOM.render(
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Router history={history}>
            <FuseAuthorization routes={routes}>
              <FuseTheme>
                <FuseLayout
                  routes={routes}
                  toolbar={<MainToolbar />}
                  navbarHeader={<MainNavbarHeader />}
                  navbarContent={<MainNavbarContent />}
                  footer={<MainFooter />}
                />
              </FuseTheme>
            </FuseAuthorization>
          </Router>
        </Provider>
      </JssProvider>,
      document.getElementById('root')
    )
  )
