const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Inicializando
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({ storage }).single('image'));

// Routes
app.use('/api/photos/', require('./routes/photo.routes'));
app.use('/api/menus/', require('./routes/menu.routes'));

// Archivos estaticos
// v1
/*app.use(express.static(path.join(__dirname, 'public/dist')));
app.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, 'public/dist/index.html'));
});*/
// v2
/*app.use(express.static(__dirname + '/dist'));
app.get('/*', function (req, res) {
  res.sendfile(path.join(__dirname + '/dist/index.html'));
});*/

// Exportamos la constate 'app'
module.exports = app;