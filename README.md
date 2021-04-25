# Campsite

A proof-of-concept implementation of a server embodying values of the [Local Web](docs/local-web.md).

## Getting Started

This server is a work in progress at the moment. An ideal implementation of this server would use WebRTC for maximum decentralization. However, this would at a minimum require a signaling server, which would significantly complicate the implementation here.

For now, you should be able to run this as-is locally or on a service such as Heroku.

## Starting the server

To run the server locally, run the following:

```shell
$ npm install
$ npm run dev
```

This will start the server in development mode. To test the websocket connection, use a utility such as [`wscat`](https://github.com/websockets/wscat) in another terminal window or tab:

```shell
$ wscat -c ws://localhost:3000
```

This should then connect to the server.

```shell
$ wscat -c ws://localhost:3000
Connected (press CTRL+C to quit)
< {"message": "Hi there, I am a WebSocket server", "id": "f980def8-720b-4a33-880c-9ec1c93af06a", "username": ""}
```

While you are here, you can join the chat by sending the following JSON:

```shell
> {"join": "jlleblanc"}
< {"message": "jlleblanc joined the chat", "id": "d237d81a-a3ea-45cf-8efd-0b708bde793a", "username": ""}
```
