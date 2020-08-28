require('./config/config');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('longjohn');
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// Cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));


// Configuración global de rutas
app.use(require('./routes/index'));

// Conexión BD
/*
mongoose.connect(process.env.URLDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) {
        console.log(err);
        console.log('Error de conexión a la BD');
    } else {
        console.log('Base de datos ONLINE');
    }
});
*/

mongoose.connect(process.env.URLDB, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err, res) => {
  if (err) {
    console.log(err);
    console.log('Error de conexión a la BD');
  } else {
    console.log('Base de datos ONLINE');
  }
});


app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});