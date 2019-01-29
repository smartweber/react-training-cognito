import * as React from 'react'
import { authRoles } from '../auth/auth'
import { Redirect } from 'react-router-dom'
import { FuseUtils } from '../@fuse/index'
import { appsConfigs } from '../main/content/apps/appsConfigs'
import { pagesConfigs } from '../main/content/pages/pagesConfigs'
import { authRoleExamplesConfigs } from '../main/content/auth/authRoleExamplesConfigs'
import { UserInterfaceConfig } from '../main/content/user-interface/UserInterfaceConfig'
import { ComponentsConfig } from '../main/content/components/ComponentsConfig'
import { ComponentsThirdPartyConfig } from '../main/content/components-third-party/ComponentsThirdPartyConfig'
import { GettingStartedConfig } from '../main/content/getting-started/GettingStartedConfig'
import Home from '../main/content/home'
import Login from '../main/content/login/Login'
import Register from '../main/content/register/Register'
import Channels from '../main/content/channels/Channels'

const routeConfigs = [
  {
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
  },
  {
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
  },
  {
    auth: authRoles.isLoggedIn,
    routes: [
      {
        path: '/home',
        component: Home
      }
    ]
  },
  {
    auth: authRoles.isLoggedIn,
    routes: [
      {
        path: '/channels/:channelId',
        component: Channels
      }
    ]
  },
  ...appsConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  ComponentsConfig,
  ComponentsThirdPartyConfig,
  UserInterfaceConfig,
  GettingStartedConfig
]

export const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/home" />
  }
]
