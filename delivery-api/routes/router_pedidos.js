import express from "express";
import { promises as fs } from "fs";

const router = express.Router();
router.use(express.json())

router.post("/", async (req, res, next) => {
    try {
        let novoPedido = req.body;

        if(!novoPedido.cliente || !novoPedido.cliente || !novoPedido.valor){
            throw new Error("Cliente, Produto e Valor são obrigatórios!");
        }

        if(novoPedido.balance <+ 0){
            throw new Error("Valor não pode ser menor ou igual a zero");
        }

        const data = JSON.parse(await fs.readFile(global.fileName));

        novoPedido = {
            id: data.nextId++,
            cliente: novoPedido.cliente,
            produto: novoPedido.produto,
            valor: novoPedido.valor,
            entregue: false,
            timestamp: new Date(),
        };
        data.pedidos.push(novoPedido);

        await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(novoPedido);

        global.logger.info(`POST /pedidos - ${JSON.stringify(novoPedido)}`);
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        delete data.nextId
        res.send(data);
        global.logger.info("GET /pedidos");
    } catch(err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        const result_pedido = data.pedidos.find(pedido => pedido.id === parseInt(req.params.id));
        
        if(result_pedido === undefined){
            throw new Error("Registro não encontrado.");
        }

        res.send(result_pedido);
        global.logger.info("GET /pedidos/:id");
    } catch(err) {
        next(err);
    }
});

router.get("/totalCliente/:cliente", async (req, res, next) => {
    try {

        const data = JSON.parse(await fs.readFile(global.fileName));

        const pedidos_cliente = data.pedidos.filter(pedido => pedido.cliente == req.params.cliente && pedido.entregue === true);
        
        let valorTotal = 0;
        Object.keys(pedidos_cliente).forEach(key => {
            valorTotal+=pedidos_cliente[key].valor
        });

        res.send(`${valorTotal}`);
        global.logger.info(`GET /totalCliente - ${req.params.cliente}`);
    } catch(err) {
        next(err);
    }
});

router.get("/totalProduto/:produto", async (req, res, next) => {
    try {

        const data = JSON.parse(await fs.readFile(global.fileName));

        const pedidos_produto = data.pedidos.filter(pedido => pedido.produto == req.params.produto && pedido.entregue === true);

        let valorTotal = 0;
        Object.keys(pedidos_produto).forEach(key => {
            valorTotal+=pedidos_produto[key].valor
        });

        res.send(`${valorTotal}`);
        global.logger.info(`GET /totalProduto - ${req.params.produto}`);
    } catch(err) {
        next(err);
    }
});

router.get("/produtos/totalVendidos", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));

        let produtos = [];
        Object.keys(data.pedidos).forEach(key => {
            if(data.pedidos[key].entregue === true){
                const nome_produto = data.pedidos[key].produto;
                const result_produto = produtos.find(produto => produto.nome == nome_produto);

                if(result_produto === undefined){
                    produtos.push({"nome": nome_produto, "qtd": 1});
                }else{
                    result_produto.qtd++;
                }
            }
        });

        const produtos_ordenados = produtos.sort((a, b) => {
            if (a.qtd > b.qtd) { //a é menor que b em algum critério de ordenação
                return -1;
            }
            if (a.qtd < b.qtd) { //a é maior que b em algum critério de ordenação
                return 1;
            }
            return 0;
        });

        let resultado = [];
        Object.keys(produtos).forEach(key => {
            resultado.push(`${produtos[key].nome} - ${produtos[key].qtd}`);
        });

        res.send(resultado);
    } catch(err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        
        const result_pedido = data.pedidos.find(pedido => pedido.id === parseInt(req.params.id));
        if(result_pedido === undefined){
            throw new Error("Registro não encontrado.");
        }

        data.pedidos = data.pedidos.filter(pedido => pedido.id !== parseInt(req.params.id));
        await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.end();
        global.logger.info(`DELETE /pedidos - ${req.params.id}`);
    } catch(err) {
        next(err);
    }
});

router.put("/", async (req, res, next) => {
    try {
        let atualizaPedido = req.body;

        if(!atualizaPedido.id || !atualizaPedido.cliente || !atualizaPedido.cliente || !atualizaPedido.valor || atualizaPedido.entregue == null){
            throw new Error("ID, Cliente, Produto, Valor e Entregue são obrigatórios!");
        }

        if(atualizaPedido.balance <= 0){
            throw new Error("Valor não pode ser menor ou igual a zero");
        }

        const data = JSON.parse(await fs.readFile(global.fileName));
        const index = data.pedidos.findIndex(pedido => pedido.id === atualizaPedido.id);

        if(index === -1){
            throw new Error("Registro não encontrado.");
        }

        data.pedidos[index].cliente = atualizaPedido.cliente;
        data.pedidos[index].produto = atualizaPedido.produto;
        data.pedidos[index].valor = atualizaPedido.valor;
        data.pedidos[index].entregue = atualizaPedido.entregue;

        await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data.pedidos[index]);
        global.logger.info(`PUT /pedidos - ${JSON.stringify(data.pedidos[index])}`);
    } catch(err) {
        next(err);
    }
});

router.patch("/atualizarEntrega", async (req, res, next) => {
    try {
        let atualizaPedido = req.body;

        if(!atualizaPedido.id || atualizaPedido.entregue == null){
            throw new Error("ID e Entregue são obrigatórios!");
        }

        const data = JSON.parse(await fs.readFile(global.fileName));
        const index = data.pedidos.findIndex(pedido => pedido.id === atualizaPedido.id);

        if(index === -1){
            throw new Error("Registro não encontrado.");
        }

        data.pedidos[index].entregue = atualizaPedido.entregue;

        await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data.pedidos[index]);
        global.logger.info(`PATCH /pedidos/atualizarEntrega - ${JSON.stringify(data.pedidos[index])}`);
    } catch(err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ "error": err.message });
});

export default router;