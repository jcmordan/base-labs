import { createApp } from '@/app'
import request from 'supertest'
import { Server } from 'http'

describe('App', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let app: any
  let server: Server

  beforeAll(() => {
    app = createApp()
    server = app.listen(3001)
  })

  afterAll((done) => {
    app = null

    if (server) {
      server.close(done)
    } else {
      done()
    }
  })

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

  it('should buy corn', async () => {
    const response = await request(app).post('/corn/buy').expect(200)

    expect(response.body).toMatchObject({
      message: '1 Corn has been bought',
    })
  })
})
