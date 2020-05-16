const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const SERVER_PORT = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);
const io = socketIO(server);


app.set('port', SERVER_PORT);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname + '/static/index.html'));
});

// DATA
const users = {};
let bookingList = [];

// Web socket


var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	console.log('New connection');

	socket.on('message', function (message) {
		console.log(message);
		if (message.content === 'reset') {
			buzzList = [];
			io.sockets.emit('buzzed', buzzList);
		}
		else {
			buzzList.push(message);
			io.sockets.emit('buzzed', buzzList);
		}
	})
});

server.listen(SERVER_PORT, () => console.log(`Starting server on port ${SERVER_PORT}`));