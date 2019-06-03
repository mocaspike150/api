const cors = require('cors');
const { parse } = require('url');
const https  = require('https');
const contact = require('./contact');

const path = require('path');

const express = require('express')
const bodyParser = require('body-parser')
const multer  = require('multer');
const upload = multer();

const app = express()

app.use(cors());

app.use('/', express.static(path.join(__dirname, 'public')));

app.post('/', upload.none(), contact);

module.exports = app

