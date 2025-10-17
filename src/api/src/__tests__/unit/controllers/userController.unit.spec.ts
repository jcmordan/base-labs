import { createUser } from '@/controllers/userController'
import { Request, Response } from 'express'

describe('UserController', () => {
  describe('#createUser', () => {
    const userService = {
      createUser: jest.fn(() => ({
        id: '123',
      })),
    }

    const req = {
      body: {
        email: 'test@test.com',
      },
      locals: {
        services: {
          getUserService: () => userService,
        },
      },
    } as unknown as Request

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response

    it('should create a user', async () => {
      await createUser(req, res)
      expect(userService.createUser).toHaveBeenCalledWith(req.body)
    })
  })
})
