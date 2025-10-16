import { CreateUserRequest, User } from '@/entities/user'

interface UserService {
  createUser: (fields: CreateUserRequest) => Promise<User>
}

export const buildUserService = (): UserService => {
  return {
    createUser: async (fields: CreateUserRequest) => {
      /// emulate database operation
      /// generate a unique id for the user
      /// save the user to the database
      /// return the user

      return { ...fields, id: btoa(fields.taxId) }
    },
  }
}
