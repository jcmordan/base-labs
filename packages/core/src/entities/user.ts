interface BaseUserFields {
  taxId: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface CreateUserRequest extends BaseUserFields {}

export interface User extends BaseUserFields {
  id: string
}
