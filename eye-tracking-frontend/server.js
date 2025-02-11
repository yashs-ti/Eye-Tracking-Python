import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dgram from 'dgram';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"]
  }
});

// Create UDP server to receive data from Python script
const udpServer = dgram.createSocket('udp4');

udpServer.on('message', (msg, rinfo) => {
  // Parse the received buffer
  const timestamp = msg.readBigInt64LE(0);
  const l_cx = msg.readInt32LE(8);
  const l_cy = msg.readInt32LE(12);
  const l_dx = msg.readInt32LE(16);
  const l_dy = msg.readInt32LE(20);

  // Emit the data to all connected clients
  io.emit('eye_tracking_data', {
    timestamp: Number(timestamp),
    l_cx,
    l_cy,
    l_dx,
    l_dy
  });
});

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`UDP Server listening on ${address.address}:${address.port}`);
});

// Bind UDP server to port 7070
udpServer.bind(7070);

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 