const config = require('config');

const notificationQueueName = config.get('RabbitMQ.notificationQueueName');
const rmqManager = require('./app/infrastracture/rabbitMQManager');
const mailManager = require('./app/infrastracture/emailManager');

rmqManager.subscribe(notificationQueueName, mailManager.send);
