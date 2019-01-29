import { MaterialUINavigation } from 'main/content/components/material-ui/MaterialUINavigation'
import { authRoles } from 'auth/auth'

export const fuseNavigationConfig = [
  {
    id: 'account',
    title: 'Account',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'company_information',
        title: 'Company Information',
        type: 'item',
        icon: 'dashboard',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'features',
        title: 'Features',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'payments',
        title: 'Payments',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'subscription',
        title: 'Subscription',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'transactions',
        title: 'Transactions',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      }
    ]
  },
  {
    id: 'configurations',
    title: 'Configurations',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'channel_information',
        title: 'Channel Information',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'single_sign_on',
        title: 'Single Sign-On',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'tube_branding',
        title: 'Tube Branding',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'tags',
        title: 'Tags',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'information_classification',
        title: 'Information Classification',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      },
      {
        id: 'access_control',
        title: 'Access Control',
        type: 'item',
        icon: 'email',
        url: '/pages/profile',
        auth: authRoles.member
      }
    ]
  }
]
