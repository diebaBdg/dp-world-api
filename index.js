let app = require('express')();
let bodyParser = require('body-parser');
let logger = require('morgan');
let fs = require('fs');
let path = require('path')

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(logger('combined', { stream: accessLogStream }))

// difine routes
const companies = require('./routes/company');
app.use('/companies', companies);

// config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const port = 80;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
