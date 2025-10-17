import { generateToken, verifyToken } from '@/lib/jwt'
import { User } from '@bobs-corn/core'

const user = { id: '123' } as User

const signMock = jest.fn((...args: any) => 'token')
const verifyMock = jest.fn((...args: any) => user)

jest.mock('jsonwebtoken', () => ({
  sign: (...args: any) => signMock(...args),
  verify: (...args: any) => verifyMock(...args),
}))

describe('JWT', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#generateToken', () => {
    it('should generate a token', () => {
      const token = generateToken({ id: '123' } as User)
      expect(token).toBeDefined()

      expect(signMock).toHaveBeenCalledWith(user, 'default-secret', {
        expiresIn: '1h',
      })
    })
  })

  describe('#verifyToken', () => {
    it('should verify a token', () => {
      const token = generateToken({ id: '123' } as User)
      const verifiedToken = verifyToken(token)
      expect(verifiedToken).toBeDefined()

      expect(verifyMock).toHaveBeenCalledWith(token, 'default-secret')
    })

    it('should return null if the token is invalid', () => {
      const token = null
      const verifiedToken = verifyToken(token as any)
      expect(verifiedToken).toBeNull()

      expect(verifyMock).not.toHaveBeenCalled()
    })
  })
})
