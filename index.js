let app = require('express')();
let bodyParser = require('body-parser');
let logger = require('morgan');
let rfs = require('rotating-file-stream');
let path = require('path');
let cors = require('cors');

// configure CORS (Cross-origin resource sharing)
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
}
app.use(cors(corsOptions));

// create a write stream (in append mode)
// let accessLogStream = fs.createWriteStream(path.join(__dirname, './log/access.log'), { flags: 'a' });
let accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// setup the logger
app.use(logger('combined', { stream: accessLogStream }));

// config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// difine routes
const companies = require('./routes/company');
app.use('/companies', companies);



const port = 80;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));