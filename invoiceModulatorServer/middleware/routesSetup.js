var path = require('path');

function config_view(express,app,config){

	app.set('view engine', 'html');

	app.engine('html', require('ejs').renderFile);

	app.set('views', (__dirname + '/../public/views'));
	app.use('/images', express.static(__dirname + '/../public/images'));
	app.use('/styles', express.static(__dirname + '/../public/styles'));
	app.use('/scripts', express.static(__dirname + '/../public/scripts'));
	app.use('/socket', express.static(__dirname + '/../node_modules/socket.io-client/dist'));
}

module.exports = config_view;
