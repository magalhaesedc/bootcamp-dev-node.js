const express = require('express')
const request = require('supertest');

const db = require('../src/db');

const app = express().use(express.json()).use('/', require('../src/app'))

describe('Testes de Integração', () => {
  
  beforeEach(async () => {
    await db.cliente.destroy({ where: {} });
    await db.consulta.destroy({ where: {} });
    await db.produto.destroy({ where: {} });
  });

  afterAll(async () => db.sequelize.close());

  const clienteJoao = {
    Nome: 'João Silva',
    CPF: '000.000.000-00',
  };

  const resultadoEsperado = {
    montante: 106.9,
    juros: 0.025,
    parcelas: 3,
    primeiraPrestacao: 35.64,
    prestacoes: [35.64, 35.63, 35.63],
  };

  const payloadRequest = {
    nome: clienteJoao.Nome,
    CPF: clienteJoao.CPF,
    valor: 101.75,
    parcelas: 3,
  };

  const payloadRequestProduct = {
    codigo: 1,
    descricao: 'Produto de Teste',
    preco: 101.75
  };

  test('responder http 200 na raiz - Versão 01', () => request(app).get('/')
    .then((res) => expect(res.status).toBe(200)));

  test('responder http 200 na raiz - Versão 02', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  // O teste abaixo está errando, porém passando com sucesso, pois não suporta
  // o comportamento assíncrono da chamada HTTP realizada. O mesmo deveria
  // falhar, uma vez que a aplicação retorna HTTP 200,
  // ao passo que o teste está aguardando um HTTP 400.
  //
  // test('responder http 200 na raiz - Versão COM ERRO', () => {
  //   request(app).get('/')
  //     .then((res) => expect(res.status).toBe(400));
  // });

  test('CENÁRIO 01', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // Resultado é obtido com sucesso
    expect(res.body.erro).toBeUndefined();
    expect(res.body.montante).toBe(106.9);
    expect(res.status).toBe(201);
    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.body).toMatchObject(resultadoEsperado);

    // Cliente foi armazenado
    const cliente = await db.cliente.findOne({ where: { CPF: clienteJoao.CPF } });
    expect(cliente.CPF).toBe(clienteJoao.CPF);

    const consulta = await db.consulta.findOne({ where: { ClienteCPF: clienteJoao.CPF } });
    expect(consulta.Valor).toBe(101.75);
  });

  test('CENÁRIO 02', async () => {

    await db.cliente.create({
      Nome:clienteJoao.Nome,
      CPF:clienteJoao.CPF
    });

    await db.consulta.create({
      Valor: 1,
      NumPrestacoes: 2,
      Juros: 0.5,
      Prestacoes: '1, 1',
      ClienteCPF: clienteJoao.CPF,
      Montante: 2,
      createdAt: '2016-06-22 19:10:25-07',
    });

    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);


    expect(res.body).toMatchSnapshot(resultadoEsperado);
    expect(res.status).toBe(201);

    const count = await db.consulta.count({ where: { ClienteCPF: clienteJoao.CPF } });
    expect(count).toBe(2);
  });

  test('CENÁRIO 03', async () => {
    const res1 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    expect(res1.body).toMatchSnapshot(resultadoEsperado);

    const res2 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest);

    // Resultado é obtido
    console.log(res2.body)
    expect(res2.body.erro).toBeDefined();
    expect(res2.status).toBe(405);
  });

  test('CENÁRIO 04', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send({});

    // Resultado é obtido
    expect(res.body.erro).toBeDefined();
    expect(res.status).toBe(400);
  });

  test('Verificar produto cadastrado', async () => {
    const res = await request(app)
      .post('/produto/create')
      .send(payloadRequestProduct);
    let objRes = {
      descricao: res.body.descricao,
      preco: res.body.preco
    }

    let objEsp = {
      descricao: payloadRequestProduct.descricao,
      preco: payloadRequestProduct.preco
    }
    // Resultado é obtido
    expect(objRes).toMatchObject(objEsp);
    expect(res.status).toBe(201);
  });

  test('Verificar edição do produto', async () => {
    let resCreate = await request(app)
      .post('/produto/create')
      .send(payloadRequestProduct);

    resCreate.body.codigo = resCreate.body.id;
    resCreate.body.descricao = "Produto de Teste Editado";

    const resUpdateDescricao = await request(app)
    .put('/produto/update')
    .send(resCreate.body);

    resCreate.body.preco = 50;

    const resUpdatePreco = await request(app)
    .put('/produto/update')
    .send(resCreate.body);

    // Resultado é obtido
    expect(resUpdateDescricao.body.descricao).not.toBe(payloadRequestProduct.descricao);
    expect(resUpdatePreco.body.preco).not.toBe(payloadRequestProduct.preco);
  });

  test('Verificar listagem produtos', async () => {
    await request(app)
      .post('/produto/create')
      .send(payloadRequestProduct);

    let res = await request(app)
      .get('/produto');
    
    // Resultado é obtido
    expect(res.body.length).toBe(1);
  });

  test('Verificar exclusão do produto', async () => {
    const res = await request(app)
      .post('/produto/create')
      .send(payloadRequestProduct);

    const resDelete = await request(app)
      .delete('/produto/delete/'+res.body.id);

    let resGet = await request(app)
      .get('/produto');
    
    // Resultado é obtido
    expect(resDelete.status).toBe(200);
    expect(resGet.body.length).toBe(0);
  });
});
