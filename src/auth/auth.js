/**
 * Authorization Roles
 */
export const authRoles = {
  admin: ['admin'],
  isAdmin: ['admin'],
  isLoggedIn: ['admin', 'member'],
  isLoggedOut: ['guest'],
  staff: ['admin', 'staff'],
  onlyGuest: ['guest']
}
