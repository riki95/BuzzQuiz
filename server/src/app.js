const express = require('express');
const http = require('http');


const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.set('port', SERVER_PORT);


app.get('/*', (_req, res) => {
	res.send('hi');
});

const server = http.Server(app);
server.listen(SERVER_PORT, () => console.log(`Starting server on port ${SERVER_PORT}`));