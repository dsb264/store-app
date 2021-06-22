if (process.env.preact === 'true') {
  const moduleAlias = require('module-alias')
  moduleAlias.addAlias('react', 'preact/compat')
  moduleAlias.addAlias('react-dom', 'preact/compat')
  moduleAlias.addAlias('react-ssr-prepass', 'preact-ssr-prepass')
}

const express = require('express')
const port = parseInt(process.env.port, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const { parse } = require('url')
const next = require('next')
const app = next({ dev })
const handle = app.getRequestHandler()
const mysql = require('mysql2')
const sqlconnection = require('tedious').Connection; 
var mssql = require("mssql"); 
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const db = mysql.createPool({
  host: 'acmedb.cy8ne94fjave.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Amazonians',
  database: 'acmeDB'
  
  //port: "3306"
})

//app.get('/test', (req, res) => {
  //const sqlInsert = "SELECT * FROM Customer";
  //db.query(sqlInsert, (err, result) => {
  //  res.send(err);
  //})
//})

app.prepare().then(() => {
  //const config = {
   // server: 'testdb-1.ccopgex7ytvv.us-east-1.rds.amazonaws.com',
	//authentication: {
		//type: 'default',
		//options: {
			//userName: "amazonian",
      //password: "zYca!GRJzw#H9w",
      //ca: [fs.readFileSync([certificate ], {encoding: 'utf-8'})],
      //rejectUnauthorized: false,
      //requestCert: false,
     // agent: false
		//},
	//},
	//options: {
	//	database: "acmeDB",
	//	encrypted: false,
	//},
  //  }
  const server = express()

  server.get('/service-worker.js', (req, res) => {
    app.serveStatic(req, res, path.join(__dirname, '.next', 'static', 'service-worker.js'))
  })

  server.get('/pages-manifest.json', (req, res) => {
    app.serveStatic(req, res, path.join(__dirname, '.next', 'server', 'pages-manifest.json'))
  })

  server.get('/test', (req, res) => {
    const sqlInsert = "SELECT * FROM Brokers";
    //console.log(db)
   // mssql.connect(config, function (err) {
    
     // if (err) console.log(err);
      //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
      // create Request object
      //var request = new mssql.Request();
         
      // query to the database and get the records
      //request.query('select * from Customer', function (err, recordset) {
          
         // if (err) console.log(err)

          // send records as a response
         // res.send(recordset);
          
     // });
  //});
  db.query(sqlInsert, (err, result) => {
    res.send(result)
  })
   
  })

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
