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

app.get('/healt', (_req, res) => {
	res.send('OK');
});

// DATA
const users = {};
let bookingList = [];

// Web socket
io.on('connection', (socket) => {
	socket.on('NEW_USER', (data) => {
		users[socket.id] = data.username,

		io.emit('USERS_UPDATED', Object.values(users));
		io.emit('BOOKING_LIST_UPDATED', bookingList);
	})

	socket.on('USER_BOOKING', () => {
		bookingList.push({
			id: socket.id,
			user: users[socket.id],
			position: bookingList.length + 1,
		});

		io.emit('BOOKING_LIST_UPDATED', bookingList);
	})

	socket.on('USER_RESETTING', () => {
		bookingList = [];

		io.emit('BOOKING_LIST_UPDATED', bookingList);
	})

	socket.on('disconnect', () => {
		if (!users[socket.id]) return;

		delete users[socket.id];
		bookingList = bookingList.filter((item) => item.id !== socket.id);

		io.emit('BOOKING_LIST_UPDATED', bookingList);
		io.emit('USERS_UPDATED', Object.values(users));
	});
})


server.listen(SERVER_PORT, () => console.log(`Starting server on port ${SERVER_PORT}`));