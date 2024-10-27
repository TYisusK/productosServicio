var express = require('express');
var path = require('path');
var productosRoutes = require('./routes/productos');

require('dotenv').config();


var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/web', express.static(path.join(__dirname, 'web')));
app.use(express.urlencoded({ extended: true }));


app.use('/', productosRoutes);



var port = process.env.PORT || 3012;

app.listen(port, () => {
  console.log('Servidor en http://localhost:' + port);
});
