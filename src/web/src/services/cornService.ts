import { config } from '@/config/config'

const orderCorn = async () => {
  const response = await fetch(`${config.apiUrl}/api/corns/buy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to order corn')
  }

  return response.json()
}

export const cornService = { orderCorn }
