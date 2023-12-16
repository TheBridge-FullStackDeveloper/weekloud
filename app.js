const express = require("express");
const app = express();
const port = 3000;
const { create } = require('express-handlebars');
const hbs = create({
  extname: 'hbs', // nombre de la extensión de los archivos
  defaultLayout: 'main', // nombre del layout por defecto
  partialsDir: 'views/partials', // ruta de los partials
  // helpers: require('./utils/helpers') // ruta de los helpers
});
const session = require('express-session'); // Sin esta linea no podemos guardar la sesión del usuario Sin la sesión no podemos saber quien es el usuario
const passport = require('passport'); // Utilizamos passport para autenticar al usuario y crea un req.user con los datos del usuario
const morgan = require('morgan'); // Sin esta linea no podemos ver las peticiones que llegan al servidor
const flash = require('connect-flash');
const methodOverride = require('method-override')

app.use(morgan('dev')); // Sin esta linea no podemos ver las peticiones que llegan al servidor
app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false
})); // Sin esta linea no podemos guardar la sesión del usuario

app.use(express.json()); // Sin esta linea no se pueden parsear los datos del body en formato JSON
app.use(express.urlencoded({ extended: true })); // Sin esta linea no se pueden parsear los datos del body en formato URL
app.use(passport.initialize()); // Sin esta linea no podemos inicializar passport
app.use(passport.session()); // Sin esta linea no podemos guardar la sesión del usuario
app.use(express.static('public')); // Sin esta linea no podemos enviar al user los archivos estáticos que están en la carpeta public
app.use(flash()); // Sin esta linea no podemos enviar mensajes flash (mensajes de errores al usuario)
app.use(methodOverride('_method'))

// Configura Handlebars como motor de plantillas
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

require('./config/passport'); // Sin esta linea no se ejecuta el archivo passport.js
require('./config/cloudinary'); // Sin esta linea no se ejecuta el archivo cloudinary.js
// require('./config/cronjob'); // Sin esta linea no se ejecuta el archivo cronjob.js

// Sin esta linea no podemos utilizar las rutas que están en el archivo routes/index.js
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
