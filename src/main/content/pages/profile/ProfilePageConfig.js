import ProfilePage from 'main/content/pages/profile/ProfilePage'
import { authRoles } from 'auth/auth'

export const ProfilePageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.isLoggedIn,
  routes: [
    {
      path: '/pages/profile',
      component: ProfilePage
    }
  ]
}
