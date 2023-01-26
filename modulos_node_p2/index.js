import {promises as fs} from "fs"

init();

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