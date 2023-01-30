import express from "express";
import { promises as fs } from "fs";

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        let lista = [];
        Object.keys(data).forEach(key => {
            lista.push([data[key].brand, data[key].models.length]);
        });
        const maxModels = data.reduce((prev, current)=>{
            return prev.models.length > current.models.length ? prev : current;
        });
        res.send(maxModels);
    } catch (err) {
        next(err);
    }
});

router.get("/maisModelos", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        let max = data[0].models.length;;
        let keyMax = [];
        Object.keys(data).forEach(key => {
            const qtd_models = data[key].models.length;
            if (qtd_models > max) {
                max = qtd_models;
                keyMax = [data[key].brand];
            } else if (qtd_models == max) {
                max = data[key].models.length;
                keyMax.push(data[key].brand);
            }
        });
        res.send(keyMax.length > 1 ? keyMax : keyMax[0]);
    } catch (err) {
        next(err);
    }
});

router.get("/menosModelos", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        let min = data[0].models.length;
        let keyMin = [];
        Object.keys(data).forEach(key => {
            const qtd_models = data[key].models.length;
            if (qtd_models < min) {
                min = qtd_models;
                keyMin = [data[key].brand];
            } else if (qtd_models == min) {
                min = data[key].models.length;
                keyMin.push(data[key].brand);
            }
        });
        res.send(keyMin.length > 1 ? keyMin : keyMin[0]);
    } catch (err) {
        next(err);
    }
});

router.get("/listaMaisModelos/:qtd", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));

        let key_length = [];
        Object.keys(data).forEach(key => {
            key_length.push([key, data[key].models.length]);
        });

        function order_models(a, b) {
            if (a[1] > b[1]) { //a é menor que b em algum critério de ordenação
                return -1;
            }
            if (a[1] < b[1]) { //a é maior que b em algum critério de ordenação
                return 1;
            }

            const brandA = data[a[0]].brand;
            const brandB = data[b[0]].brand;

            return brandA.localeCompare(brandB);
        }

        const key_length_order = key_length.sort(order_models);

        
        /*
         * Não foi usado
        remover_brand.forEach(key_delete => {
            for (let i = 0; i < key_length_order.length; i++) {
                const element = key_length_order[i];
                if(element[0] == key_delete){
                    key_length_order.splice(i, 1);
                }
            }
        });
        */

        key_length_order.splice(parseInt(req.params.qtd));

        let result = [];
        key_length_order.forEach(key_length => {
            result.push(`${data[key_length[0]].brand} - ${key_length[1]}`);
        });

        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/listaMenosModelos/:qtd", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));

        let key_length = [];
        Object.keys(data).forEach(key => {
            key_length.push([key, data[key].models.length]);
        });

        function order_models(a, b) {
            if (a[1] < b[1]) { //a é menor que b em algum critério de ordenação
                return -1;
            }
            if (a[1] > b[1]) { //a é maior que b em algum critério de ordenação
                return 1;
            }

            const brandA = data[a[0]].brand;
            const brandB = data[b[0]].brand;

            return brandA.localeCompare(brandB);
        }

        const key_length_order = key_length.sort(order_models);

        key_length_order.splice(parseInt(req.params.qtd));

        let result = [];
        key_length_order.forEach(key_length => {
            result.push(`${data[key_length[0]].brand} - ${key_length[1]}`);
        });

        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get("/listaModelos", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
       
        const result_models = data.find(dt => dt.brand.toUpperCase() === req.body.brand.toUpperCase());

        res.send(result_models == undefined ? [] : result_models.models);
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    console.log(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ "error": err.message });
});

export default router;