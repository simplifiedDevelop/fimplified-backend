module.exports = function(app){

	//const midd = require('../services/middleware.js');	
	const Cors = require('../config/cors.js');
	const userService 	= require ('../services/userService.js');
	const authorizationService = require ('../services/authorizationService.js');
	app.use(Cors.cors(Cors.corsOptions));


	app.get('/users/test', async function(req, res){
		let response 	= "Running";
		res.send(response);
	})

	//Devuelve JSON con la colección de objetos "usuario" activos.
	app.get('/users', async function(req, res){
		let rols = ["Admin"]
		let authResponse = await authorizationService.AdminAuthorization(req, rols)
		if(authResponse.status === 200){
			let response 	= await userService.getUsers();
			res.send(response);
		}else {
            res.status(authResponse.status)
            res.send({error: authResponse.message})
        }
	})

	app.get('/users/login', async function(req, res){
		let user		= req.body;
		let response 	= await userService.userLogin(user.email, user.password);
		res.send(response);
	})

	app.post('/users', async function(req, res){
		let user	 		= req.body;
		let response 		= await userService.createUser(user);
		res.send(response);
	})
	
	//Procedimiento para la validación de credenciales de usuario (usuarioEmail y usuarioPassword)
	// para el ingreso al sistema. Caso de éxito devuele objeto usuario asociado a cuenta de mail 
	// ingresada y token de sesión generado. Caso de error retorna mensaje correspondiente.
	/*app.post('/usuario/login', async function(req, res){
		let usuarioLog 		= req.body;
		const Usuario 		= require('../services/usuarios.js');
		let response 		= await Usuario.usuarioLogin(usuarioLog.usuarioEmail, usuarioLog.usuarioPassword);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})	*/

	//Devuelve JSON con objeto "usuario" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	/*app.get('/usuario/:id', midd.rutasProtegidas, async function (req, res) {
		let id 			= req.params.id;
		let Usuario 	= require('../services/usuarios');
		let response 	= await Usuario.obtenerUsuarioPorId(id);
		res.set(['Content-Type', 'application/json']);
		res.send(response);
	});*/

	//Devuelve JSON con objeto "usuario" seleccionado a partir del valor de su campo Id. 
	// si se encuentra activo.
	//Incluye sus respectivos objetos organizacion y rol del usuario.
	/*app.get('/usuario/full/:id', midd.rutasProtegidas, async function (req, res) {
		let id 			= req.params.id;
		let Usuario 	= require('../services/usuarios');
		let response 	= await Usuario.obtenerUsuarioPorIdFull(id);
		res.set(['Content-Type', 'application/json']);
		res.send(response);
	});*/

	//Devuelve JSON con objeto "usuarioEmail" seleccionado por el valor de su campo Email.
	/*app.get('/usuario/mail/find', midd.rutasProtegidas, async function (req, res) {
		let mail 		= req.body.usuarioEmail;
		let Usuario 	= require('../services/usuarios');
		let response 	= await Usuario.obtenerUsuarioPorEmail(mail);
		res.set(['Content-Type', 'application/json']);
		res.send(response);
	});*/

	//Valida que el usuario revisor especificado a partir del valor de su campo Id. no esté
	// vinculado a la revisión (tenga devoluciones asociadas a artículos en estado "En Revisión")  
	// de un artículo cuyo valor de su atributo Id. sea distinto al valor especificado en el 
	//parámetro articuloId recibido.
	/*app.get('/usuario/validar/revision/:usuarioId/:articuloId', midd.rutasProtegidas, async function (req, res) {
		let idUsuario 	= req.params.usuarioId;
		let idArticulo 	= req.params.articuloId;
		let Usuario 	= require('../services/usuarios');
		let response 	= await Usuario.validarUsuarioRevision(idUsuario, idArticulo);
		res.set(['Content-Type', 'application/json']);
		res.send(response);
	});*/

	//Permite dar de alta a un nuevo registo usuario.
	/*app.post('/usuario/new', async function (req, res) {
		 let usuario	= req.body;
		 let Usuario 	= require('../services/usuarios');
		 let response	= await Usuario.ingresarUsuario(usuario);
		 res.set(['Content-Type', 'application/json']);
		 res.send(response);
	});*/

	//Permite editar los valores de los atributos del usuario seleccionado
	// a partir del valor de su campo Id.
	/*app.put('/usuario/edit/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let usuario		= req.body;
		let Usuario 	= require('../services/usuarios.js');
		let response 	= await Usuario.actualizarUsuario(usuario, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})*/

	//Permite borrar de manera lógia al usuario identificado por el valor de su campo Id.
	//(pasa a inactivo).
	/*app.put('/usuario/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let Usuario 	= require('../services/usuarios.js');
		let response 	= await Usuario.eliminarUsuario(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})*/
	
}