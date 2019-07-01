
let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let logger = require('morgan');
let rfs = require('rotating-file-stream');
let path = require('path');
let cors = require('cors');

// configure CORS (Cross-origin resource sharing)
const corsOptions = {
<<<<<<< HEAD
  origin: ['http://localhost','http://localhost:5000','http://localhost:4000'],
=======
  origin: ['http://localhost:3000', 'http://200.98.200.133','http://200.98.200.133:3000'],
>>>>>>> ac366da6cab0f0947f446c6a8903a030a0e93c81
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
const port = 4000;
app.listen(port, () => console.log(`Server runnig in port ${port}`));
