const config = require('config');

const rabbitMQUrl = config.get('RabbitMQ.url');
const open = require('amqplib').connect(rabbitMQUrl);


class RabbitMQManager {
  static publish(queueName, data) {
    return open.then(conn => conn.createChannel())
      .then(ch => ch.assertQueue(queueName, { durable: false })
        .then(() => {
          if (data) {
            if (typeof data === 'string') {
              ch.sendToQueue(queueName, Buffer.from(data));
            } else {
              ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
            }
          }
        }));
  }

  static subscribe(queueName, callback) {
    return open.then(conn => conn.createChannel())
      .then(ch => ch.assertQueue(queueName, { durable: false })
        .then(() => ch.consume(queueName, (msg) => {
          if (msg !== null) {
            if (callback) {
              try {
                callback(JSON.parse(msg.content.toString()));
              } catch (error) {
                callback(msg.content.toString());
              }
              ch.ack(msg);
            }
          }
        })));
  }
}

module.exports = RabbitMQManager;
