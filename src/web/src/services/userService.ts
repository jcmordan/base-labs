import { CreateUserFields } from '@/types'
import { config } from '@/config/config'

const createUser = async (fields: CreateUserFields) => {
  const response = await fetch(`${config.apiUrl}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  })

  if (!response.ok) {
    throw new Error('Failed to create user')
  }

  return response.json()
}

export default { createUser }
