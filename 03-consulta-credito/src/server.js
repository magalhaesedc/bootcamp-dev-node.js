const app = require('./app')
const db = require('./db');

const HOST = 'localhost'
const PORT = 5677

db.sequelize.sync().then(async () => {
    await console.log('Conectado ao banco de dados!');
});

app.listen(PORT, () => {
    console.log(`API Started! Running on http://${HOST}:${PORT}`);
}).on('error', (err) => {
    console.log(`Server error: ${err.message}`);
});