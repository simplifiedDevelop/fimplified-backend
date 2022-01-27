const mysql      	= require('mysql');
const connection 	= mysql.createConnection({
	host     : process.env.DB_HOST,
	user     : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	port	 : process.env.DB_PORT,
	database : process.env.DB_NAME
});

/*const connection 	= mysql.createConnection({
	host     : 'db-mysql-nysp-do-user-10669695-0.b.db.ondigitalocean.com',
	user     : 'doadmin',
	password : 'THfwmCjBQjhaX6LD',
	port: 25060,
	database : 'SimplifiedBackend'
  });*/
 
connection.connect(function(err){
	if (err) {
		console.error("Error al conectar a Data Base ::", err.stack);
		return;
	}
	console.log("Conectado a Data Base con Id. :: ", connection.threadId)
});
 
let query = (sql) => {
	return new Promise( (resolve, reject) => {
		connection.query(`${sql}`, function (error, results, fields) {
		  if (error) {
		  	resolve(JSON.parse(JSON.stringify(error)));
		  }else {
		  	resolve(results);
		  }
		});
	})
}

let Conn = {
	query: query,
	key: "mipassword123"
}

module.exports = Conn