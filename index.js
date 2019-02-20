let app = require('express')();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/dp_world');
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/', (req, res) => {
    res.send('hello dp world')
});


const port = 80;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
