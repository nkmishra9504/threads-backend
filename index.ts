// node/npm modules
import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import config from 'config';
import routes from './startup/routes';
import { Server } from 'socket.io';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
    io?: Server,
    user?: JwtPayload
}

const app = express();
const server = createServer(app);
const io = new Server(server)
const PORT = 5000;

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
    req.io = io;
    next();
});

io.on('connection', (socket) => {
    console.log('Socket connected');

    socket.emit('message', 'Hello from server');
});

routes(app);


server.listen(PORT, () => {
    console.log(`[+] Server is running on port ${PORT} [+]`);
});