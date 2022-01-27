//REQUERIR EXPRESS Y BODY-PARESER
const express 		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
require('dotenv').config()

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//REQUERIR EXPRESS ROUTES EN ARCHIVO EXTERNO
require('./controllers/userController.js')(app)

//DECLARAR COMO GLOBAL LA CONEXIÓN A DATA BASE
global.conn 		= require('./config/conn.js');
//REQUERIR CORS
global.Cors 		= require('./config/cors.js');
app.use(Cors.cors(Cors.corsOptions));
//REQUERIR EL USO DE JWT Y SETEO DE CLAVE BASE PARA ENCRIPTACIÓN
jwt 				= require('jsonwebtoken');
app.set('key', conn.key);

let env;
try {
	env = require('./env');
} catch(e){
	env = {
		port: process.env.PORT
	}
}
//LEVANTAR LA API
app.listen(env.port,function(){
	console.log(`Bonfiweb API lenvantada en puerto ${env.port}`);
})	