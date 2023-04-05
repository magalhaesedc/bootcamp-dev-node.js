const express = require('express');
const db = require("./db");

const app = express();

const { check, validationResult } = require('express-validator');

const consultaCliente = require('./consulta-cliente');

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!');
});

app.post(
  '/consulta-credito',

  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
  check('parcelas', 'O número de parcelas deve ser um número inteiro').notEmpty().isInt(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas,
      );
      return res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);

app.post(
  '/produto/create',

  check('codigo', 'Código deve ser informado').notEmpty(),
  check('codigo', 'Código deve ser número').isInt(),
  check('descricao', 'Descrição deve ser informado').notEmpty(),
  check('preco', 'Preco deve ser informado').notEmpty().isFloat(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {

      let produto_cadastrado = await db.produto.findByPk(req.body.codigo);
      if(produto_cadastrado){
        await db.produto.update(
          {
            descricao: req.body.descricao,
            preco: req.body.preco
          },
          {
            where: {id: req.body.codigo}
          }
        );
        return res.status(200).json(await db.produto.findByPk(req.body.codigo));
      }

      const produto = await db.produto.create({
        descricao: req.body.descricao,
        preco: req.body.preco
      });

      return res.status(201).json(produto);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);

app.get(
  '/produto',

  async (req, res) => {
    try {
      const produtos = await db.produto.findAll();
      return res.status(200).json(produtos);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);

app.put(
  '/produto/update',

  check('codigo', 'Código deve ser informado').notEmpty(),
  check('codigo', 'Código deve ser número').isInt(),
  check('descricao', 'Descrição deve ser informado').notEmpty(),
  check('preco', 'Preco deve ser número').isFloat(),
  check('preco', 'Preco deve ser informado').notEmpty(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {

      let produto = await db.produto.findByPk(req.body.codigo)
      if(!produto){
        return res.status(405).json({ erro: "Produto não cadastrado." });
      }

      await db.produto.update(
        {
          descricao: req.body.descricao,
          preco: req.body.preco
        },
        {
          where: {id: req.body.codigo}
        }
      );

      return res.status(200).json(await db.produto.findByPk(req.body.codigo));
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);

app.delete(
  '/produto/delete/:id',

  async (req, res) => {
   
    try {

      let produto = await db.produto.findByPk(req.params.id);
      if(!produto){
        return res.status(405).json({ erro: "Produto não cadastrado." });
      }

      await db.produto.destroy({ where: { id: req.params.id } });

      return res.status(200).json(produto);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);

module.exports = app;
