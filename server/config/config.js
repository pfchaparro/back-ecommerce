// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.EXPIRATION_TOKEN = '24h';


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================

// User and password
process.env.MONGO_USER = process.env.MONGO_USER || 'root-db';
process.env.MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'hola12345';

// name
process.env.MONGO_NAME = process.env.MONGO_NAME || 'ecommerce';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
   // urlDB = 'mongodb://localhost:27017/parking';
   // urlDB = 'mongodb+srv://@cluster0-yhfy8.mongodb.net/test-back?retryWrites=true&w=majority';
  urlDB = 'mongodb+srv://@cluster0-yhfy8.mongodb.net/' + process.env.MONGO_NAME +'?retryWrites=true&w=majority';
   
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;