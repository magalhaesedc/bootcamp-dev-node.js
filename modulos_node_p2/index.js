import {promises as fs} from "fs"

//init();
writeReadJson();

async function init() {
    try {
        await fs.writeFile("teste.txt", "bla bla bla");
        await fs.appendFile("teste.txt", "\nteste append file");
        const data = await fs.readFile("teste.txt", "utf-8");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function writeReadJson() {
    try {
        //Faz a escrita inicial no arquivo
        const arrayCarros = [ "Gol", "Palio", "Uno" ];
        const obj = {
            carros: arrayCarros
        }
        await fs.writeFile("teste.json", JSON.stringify(obj));

        //Faz a leitura do arquivo
        const data = JSON.parse(await fs.readFile("teste.json"));

        //Modifica o conteúdo
        data.carros.push("Sandero");

        //Sobrescreve o arquivo com o contúdo modificado
        await fs.writeFile("teste.json", JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}

/*fs.writeFile("teste.txt", "bla bla bla").then(() => {
    fs.appendFile("teste.txt", "\nteste append file").then(() => {
        fs.readFile("teste.txt", "utf-8").then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    })
}).catch(err => {
    console.log(err);
});*/



//Utilizando com callbacks
/*import fs from "fs";

fs.writeFile("teste.txt", "bla bla bla", function(err){
    if (err) {
        console.log(err);
    } else {
        fs.appendFile("teste.txt", "\nteste append file", function(err){
            if (err) {
                console.log(err);
            } else {
                fs.readFile("teste.txt", "utf-8", function(err, data){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data)
                    }
                });
            }
        });
    }
});*/





//Utilizando de forma sincrona
/*try {
    fs.writeFileSync("teste.txt", "bla bla bla");
    const data = fs.readFileSync("teste.txt", "utf-8");
    console.log(data);
} catch {
    console.log(data);
}*/