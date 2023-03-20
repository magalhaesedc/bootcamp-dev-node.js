const supertest = require('supertest')

let request = supertest('http://localhost:5678')

test('Servidor na porta 5678', async () => {
    let resposta = await request.get('/')
    expect(resposta.status).toBe(200)
})