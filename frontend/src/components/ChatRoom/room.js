import consumer from '../../consumer' //client websocket connection  to server 


consumer.subscriptions.create(
  { channel: 'NameOfChannel', /* other data needed to set up subscription */ },
  { received: broadcast => {} }
);