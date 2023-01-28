import express from "express";

const app = express();

app.all("/testeAll", (req, res) => {
    res.send(req.method);
});

app.get("/teste?", (req, res) => {
    res.send("/teste?");
});

app.get("/buzz+", (_, res) => {
    res.send("/buzz+");
});

app.get("/one*Blue", (req, res) => {
    res.send(req.path);
});

app.post("/test(ing)?", (req, res) => {
    res.send("/test(ing)?");
});

app.post("/test(ing)+", (req, res) => {
    console.log(req.body);
    res.send("/test(ing)+");
});

app.get(/.*Red$/, (req, res) => {
    res.send("/.*Red$/");
});

app.get("/testParams/:id/:a?", (req, res) => {
    res.send(req.params.id + " " + req.params.a);
});

app.get("/testeQuery", (req, res) => {
    res.send(req.query);
});

const callback1 = (req, res, next) => {
    console.log("Callback 1");
    next();
};

function callback2(req, res, next) {
    console.log("Callback 2");
    next();
};

const callback3 = (req, res) => {
    console.log("Callback 3");
    res.end();
}
    
app.get("/testeMultipleHandlers", (req, res, next) => {
    console.log("Callback 1");
    next();
}, (req, res) => {
    console.log("Callback 2");
    res.end();
});

app.route("/testeRoute")
    .get((req, res) => {
        res.send("/testeRoute GET");
    })
    .post((req, res) => {
        res.send("/testeRoute POST");
    })
    .delete((req, res) => {
        res.send("/testeRoute DELETE");
    });

app.get("/testeMultipleHandlersArray", [callback1, callback2, callback3] );

app.listen(8099, () => {
    console.log("API Started!");
});
