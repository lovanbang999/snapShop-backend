interface RoleUser {
  USER: string;
  SHOP: string;
  ADMIN: string
}

export const ROLES_USER: RoleUser = {
  USER: 'e8rwjXto0cBEP0jLlCevSoEhpnx4JDQmjVLCEm/CREQ',
  SHOP: 'DwJp3Fq9mDcULhDi9wKlW1IbBl739QjnoWtGPstpzMI',
  ADMIN: 'sAX/T3Ni917vNiPe5v08Ct22GIiw4sgVG/7D4uhd/J4'
}

export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!'

export const EMAIL_RULE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
export const EMAIL_RULE_MESSAGE = 'Your email fails to match the email pattern!'
