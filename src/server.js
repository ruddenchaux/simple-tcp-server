import { createServer } from 'net';
import { promisify } from 'util';
import { Logger } from './logger.js';
import { removeItemFromArray } from './utils.js';

const PORT = process.env.PORT;

/** @type {import('net').Socket[]} */
let clients = [];

const server = createServer((socket) => {
  Logger.info('client connect number: %i', clients.length + 1);

  // insert the connected client on internal array
  clients.push(socket);

  // listen on data event
  socket.on('data', (data) => {
    Logger.info('client data: %s', data.toString());

    // send the received data to all others connected client
    clients
      .filter((_socket) => socket !== _socket)
      .forEach((_socket) => {
        _socket.write(data);
      });
  });

  // listen on close event
  socket.on('close', () => {
    Logger.info('client close');

    // remove the disconnected client from internal
    clients = removeItemFromArray(clients, socket);
  });

  // listen on error event
  socket.on('error', (error) => {
    Logger.error('client error: %o', error);
  });
});

/**
 * Start a TCP Server
 * @returns {Promise<void>}
 */
export async function startServer() {
  const listen = promisify(server.listen.bind(server));

  return listen({ port: PORT })
    .then(() => {
      Logger.info('server started on port %i', PORT);
    })
    .catch((error) => {
      Logger.error('listen error: %o', error);
    });
}

/**
 * Stop a TCP Server
 * @returns {Promise<Error | null>}
 */
export async function stopServer() {
  const close = promisify(server.close.bind(server));

  return close().then(() => server.unref());
}
