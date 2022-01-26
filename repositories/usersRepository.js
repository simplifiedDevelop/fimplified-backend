let Usuario = {
	
	getRecordById: async function (tabla, idTabla, id){
		let sql 		= `
							SELECT *
							FROM ${tabla}
							WHERE
							${idTabla} = ${id}
						`
		let response 	= {error: "No se encontraron registros"}
		let res 		= await conn.query(sql);
		if (res.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (res.length>0) {
			response 	= res[0];
			}
		return response; 
	},

	//Ger user by Email
	getUserByEmail: async function(email){
			let sql =  `
				SELECT * 
				FROM Users 
				WHERE email = '${email}'
				AND
				active = 1
			`
		let response = {susses: false}
		let users = await conn.query(sql);
		try {
			if (users.length>0) {
				let user 	= users[0];
				response 		= {susses: true, result: user};
			}
		} catch(e) {
			console.log(e);
		}
		return response;
	},

	getUsers: async function(){
		console.log("all")
		let sql 		= `
							SELECT * FROM Users
						`
		let response = {susses: false}
		let resultado 	= await conn.query(sql);
		console.log(resultado)
		if (resultado.code) {
	 		//response 	= {error: "Error en consulta SQL"};
			response = {susses: false}
	 	}else {
			response 	= {susses: true, result: resultado};
		}
		return response;
	},

	insertUser: async function(user){
		console.log(user)
		let sql = `
					INSERT INTO Users
					  		(
							name,
							email,
							password,
							phone,
							rol,
							active
							 )
		  			VALUES
		  					(
							'${user.name}',
							'${user.email}',
							'${user.password}',
							'${user.phone}',
							'${user.rol}',
							'${user.active}'
							)
				`
		response = {susses: false}
		try {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
				//response 	= {error: "Error en consulta SQL"};
				response = {susses: false}
			}else if (resultado.insertId) {
				//response 	= {response: "Usuario creado correctamente"}
				response = {susses: true}
			}
		} catch(error) {
			console.log(error);
		}
		return response;
	},

	obtenerUsuarioPorId: async function (id){
	 let sql = `
	  			SELECT * FROM usuarios
	  			WHERE 
	  			usuarios.usuarioId = '${id}' 
	  			&& usuarios.usuarioActivo = 1
	 		`
	 let usuarios 	= []
	 let response 	= {error: `No existe el usuario con ID: ${id}`}
	 usuarios 		= await conn.query(sql)
	 if (usuarios.code) {
	 	response 	= {error: "Error en consulta SQL"};
	 }else if (usuarios.length > 0) {
	 	response 	= {response: usuarios[0]}
	 }
	 return response;
	},

	obtenerUsuarioPorIdFull: async function(id){
		let idUsuario 	= id;
		let sql 		= `
							SELECT
							usuarios.usuarioId,
							usuarios.usuarioOrg,
							usuarios.usuarioRol
							FROM usuarios
							WHERE (usuarios.usuarioId = '${id}' 
							&& usuarios.usuarioActivo = 1)
						`
		let response 	= {}
		let result 		= {}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			let idOrg 	= resultado[0].usuarioOrg;
			let idRol 	= resultado[0].usuarioRol;
			result["usuario"] 		= await this.getRecordById('usuarios', 
			 							'usuarios.usuarioId', idUsuario);
			result["organizacion"] 	= await this.getRecordById('organizaciones', 
										'organizaciones.organizacionId', idOrg);
			result["rol"] 			= await this.getRecordById('roles', 
			 							'roles.rolId', idRol);
			response 				= {response: result}
		}else {
			response 				= {error: `No se encontró usuario con Id: ${id}`}
		}
		return response;
	},

	updateUser: async function(usuario, id){
		let sql 		= `
							UPDATE usuarios 
							SET 
							usuarioNick 		= '${usuario.usuarioNick}',
							usuarioNombre 		= '${usuario.usuarioNombre}',
							usuarioApellido 	= '${usuario.usuarioApellido}',
							usuarioEmail 		= '${usuario.usuarioEmail}',
							usuarioKeywords 	= '${usuario.usuarioKeywords}',
							usuarioOrg 			= '${usuario.usuarioOrg}',
							usuarioEmpleo 		= '${usuario.usuarioEmpleo}',
							usuarioProfesion 	= '${usuario.usuarioProfesion}',
							usuarioPais 		= '${usuario.usuarioPais}',
							usuarioNivelEduc 	= '${usuario.usuarioNivelEduc}',
							usuarioRol 			= '${usuario.usuarioRol}',
							usuarioPerfil 		= '${usuario.usuarioPerfil}'
							WHERE
							usuarios.usuarioId = '${id}'
						`
		let response 		= {error: "No se pudo actualizar usuario"}
		let existeUsuario 	= await this.obtenerUsuarioPorId(id);
		if (!existeUsuario.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "Usuario actualizado correctamente"}
			}
		}else{
			response 		= {error: `No existe usuario con Id: ${id}`}
			}
		return response;
	},	

	deleteUser: async function(id){
		let sql 		= `
							UPDATE usuarios 
							SET 
							usuarioActivo = 0 
							WHERE
							usuarios.usuarioId = '${id}'
						`
		let response 			= {error: "No se pudo eliminar usuario"}
		let existeUsuario 		= await this.obtenerUsuarioPorId(id);
		if (!existeUsuario.error) {
			let resultado 		= await conn.query(sql);
			if (resultado.code) {
	 			response 		= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
					response 	= {response: "Usuario eliminado correctamente"}
				}
		}else {
			response 			= {error: `No existe usuario con Id: ${id}`}
			}
		return response;
	},

}

module.exports = Usuario;