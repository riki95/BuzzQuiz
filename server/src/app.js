const express = require('express');
const http = require('http');
const path = require('path');


const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.set('port', SERVER_PORT);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/api/*', (_req, res) => {
	res.send('hi automatic deploy');
});

const server = http.Server(app);

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	console.log('New connection');

	socket.on('message', function (message) {
		console.log(message);
	})
});

server.listen(SERVER_PORT, () => console.log(`Starting server on port ${SERVER_PORT}`));