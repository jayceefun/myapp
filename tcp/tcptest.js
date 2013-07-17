var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

net.createServer(function (sock) {
	console.log("Connected: " + sock.remoteAddress + ":" + sock.remotePort);
	
	sock.on('data', function (data) {
		console.log('DATA ' + sock.remoteAddress + ': ' + data);
		sock.write('You said "' + data + '"');
	});

	sock.on('close', function (data) {
		console.log("Closed: " + sock.remoteAddress + ':' + sock.remotePort);
	});
}).listen(PORT);

console.log("Server is listenning at " + HOST + ':' + PORT);