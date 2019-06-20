
let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let logger = require('morgan');
let rfs = require('rotating-file-stream');
let path = require('path');
let cors = require('cors');

// configure CORS (Cross-origin resource sharing)
const corsOptions = {
  origin: ['http://200.98.200.133','http://200.98.200.133:3000'],
  optionsSuccessStatus: 204,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
}
app.use(cors(corsOptions));

// create a write stream (in append mode)
let accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// setup the logger
app.use(logger('combined', { stream: accessLogStream }));

// config middlewares
app.use(express.static("public"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// difinig routes in routes/index.js
app = require('./routes').routes(app);

//definig cron jobs
require('./scripts/cron-notification');

// defining server port and start server
const port = 3000;
app.listen(port, () => console.log(`Server runnig in port ${port}`));
