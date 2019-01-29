import Login from './Login'
import { authRoles } from 'auth/auth'

export const LoginConfig = {
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
      path: '/login',
      component: Login
    }
  ]
}
