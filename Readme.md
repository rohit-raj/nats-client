## Simple NATS messaging client(in Javascript) using Promise

### steps :
  - git clone the repo
  - `npm install`
  - start the publisher app server using `npm start`
  - start subscriber app server using `node subscriber.js`
 
### apis :
  - GET  `/fireAndForget/:id` , id can be any name
    - The valid response will be `ok`
  - GET `/requestAndReply/:id`, id, can be any name
     - The valid response will be the `id` sent in the request
     
### extra :
By default the server connects to the open nats server implementation.
  - you can provide any env variable to connect to you personal NATS server.
  - `NATS_PORT` for nats port number
  - `NATS_TOKEN` for nats security token
  - `NATS_URL` for nats url
  
  