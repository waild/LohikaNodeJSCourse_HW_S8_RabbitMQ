var rmqManager = require('./app/infrastracture/rabbitMQManager');
var reservationsService = require('./app/services/reservationsService');
const config = require('config');
const reservationQueueName = config.get('RabbitMQ.reservationQueueName');

rmqManager.subscribe(reservationQueueName, reservationsService.create);