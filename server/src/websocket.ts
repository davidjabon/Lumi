import SocketIO from 'socket.io';
import * as Sentry from '@sentry/node';
import http from 'http';

import Logger from './helpers/Logger';

const log = new Logger('websocket');

export default function (server: http.Server): SocketIO.Server {
    log.info('booting');
    const io: SocketIO.Server = SocketIO(server);
    io.on('connection', (socket: SocketIO.Socket) => {
        log.info('new connection');

        socket.on('dispatch', (action) => {
            log.info(action);

            io.emit('action', action);
        });
    });

    io.on('error', (error) => {
        Sentry.captureException(error);
    });
    return io;
}
