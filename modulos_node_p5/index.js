import ev from "./events.js";

ev.on("testEvent", obj => {
    console.log("Ouviu também");
});

ev.emit("testEvent", "Teste de outra página");