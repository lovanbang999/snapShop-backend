interface RoleUser {
  USER: string;
  SHOP: string;
  ADMIN: string
}

export const ROLES_USER: RoleUser = {
  USER: '00000',
  SHOP: '11111',
  ADMIN: '33333'
}

export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!'

export const EMAIL_RULE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
export const EMAIL_RULE_MESSAGE = 'Your email fails to match the email pattern!'
