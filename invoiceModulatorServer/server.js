var http = require('http');
var express = require('express');
var config = require('./config.json');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var config_views = require('./middleware/routesSetup.js')(express,app,config);
var invoiceGen =  require('./middleware/invoiceEngine.js');
let invoiceGenObj = new invoiceGen(config);
var routes = require('./middleware/routes.js')(express,app,config,invoiceGenObj);
app.use('/invoice' , routes);
app.get('/' , (req,res)=>res.redirect('/invoice'))

server.listen(config.port , res => {
  console.log("listening on port " , config.port);
})
