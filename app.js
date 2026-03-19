const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

const port = new SerialPort({
    path: 'COM4',
    baudRate: 9600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', data => {
    io.emit('newData', data);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log("http://localhost:3000");
});