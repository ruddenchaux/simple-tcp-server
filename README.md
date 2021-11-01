# Simple TCP Server

Accept connections on 10000 TCP port from clients and sends any received message to all other connected clients.

## Development

### Run on the developer machine

Install dependencies

```
npm install
```

and run

```
npm start
```

### Run using Docker

Build a image

```
docker build . -t simple-tcp-server
```

and run

```
docker run -p 10000:10000 -d simple-tcp-server
```
