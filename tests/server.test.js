import { connect } from 'net';
import { startServer, stopServer } from '../src/server.js';

const PORT = process.env.PORT;

const MESSAGES = {
  CLIENT1: 'Test message client 1',
  CLIENT2: 'Test message client 2'
};

/** @type {import('net').Socket} */
let client;

/** @type {import('net').Socket} */
let client2;

describe('TCP Server', () => {
  beforeAll(() => startServer());

  test('Clients messages', () => {
    return new Promise((resolve) => {
      client = connect({ port: PORT });
      client2 = connect({ port: PORT });

      client.on('data', (data) => {
        client.write(Buffer.concat([data, Buffer.from(MESSAGES.CLIENT1)]));
      });

      client2.on('connect', () => {
        client2.write(Buffer.from(MESSAGES.CLIENT2));
      });

      client2.on('data', (data) => {
        expect(data.toString()).toBe(MESSAGES.CLIENT2 + MESSAGES.CLIENT1);
        resolve();
      });

      client2.on('error', (error) => {
        throw new Error(error);
      });

      client.on('error', (error) => {
        throw new Error(error);
      });
    });
  });

  afterAll(() => {
    client.destroy();
    client2.destroy();
    return stopServer();
  });
});
