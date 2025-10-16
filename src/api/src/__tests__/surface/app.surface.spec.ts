import { createApp } from '@/app'
import request from 'supertest'
import { Server } from 'http'
import { createLimiter } from '@/middlewares'

describe('App', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let app: any
  let server: Server<typeof app>

  beforeEach(() => {
    const limiter = createLimiter()
    app = createApp(limiter)
    server = app.listen()
  })

  afterEach((done) => {
    app = null
    server.close(done)
  })

  describe('GET /health', () => {
    it('should get health', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body).toMatchObject({
        status: 'OK',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        environment: 'test',
      })
    })

    it('should not be rate limited', async () => {
      await request(app).get('/health').expect(200)

      const response = await request(app).get('/health').expect(200)

      expect(response.headers).not.toHaveProperty('ratelimit-limit')
      expect(response.headers).not.toHaveProperty('ratelimit-remaining')
      expect(response.headers).not.toHaveProperty('ratelimit-reset')
    })
  })

  describe('POST /corn/buy', () => {
    it('should allow fist corn purchase', async () => {
      const response = await request(app).post('/corn/buy').expect(200)

      expect(response.body).toMatchObject({
        message: '1 Corn has been bought',
      })
    })

    it('should not allow second corn purchase', async () => {
      await request(app).post('/corn/buy').expect(200)

      const response = await request(app).post('/corn/buy').expect(429)

      expect(response.body).toMatchObject({
        message: 'Too many requests, please try again later.',
      })
    })

    it('should include rate limit headers', async () => {
      const response = await request(app).post('/corn/buy').expect(200)

      expect(response.headers).toHaveProperty('ratelimit-limit')
      expect(response.headers).toHaveProperty('ratelimit-remaining')
      expect(response.headers).toHaveProperty('ratelimit-reset')
      expect(response.headers['ratelimit-limit']).toBe('1')
      expect(response.headers['ratelimit-remaining']).toBe('0')
    })

    it('should allow corn purchase after rate limit resets', async () => {
      await request(app).post('/corn/buy').expect(200)

      const currentDate = Date.now()
      Date.now = jest.fn(() => currentDate + 60 * 1000)

      await request(app).post('/corn/buy').expect(200)
    })
  })
})
