import express from "express";
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as io from 'socket.io';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


const server = createServer(app);
const socketio = new Server(server);


let vehicleLocation = {lat: 37.7749, lng: -122.4194};

app.get('/location', (req, res) => {
    res.json(vehicleLocation);
});

socketio.on('connection', (socket) => {
    console.log('new client connected');

    setInterval(()=>{
        vehicleLocation.lat += -0.0001;
        vehicleLocation.lng += -0.0001;
        socket.emit('location update', vehicleLocation);
    },1000);

    socket.on('disconnect', () => {
        console.log('Client Disconnected')
    });
});

const PORT = 4000;
server.listen(PORT, () => console.log('server running on port'));
