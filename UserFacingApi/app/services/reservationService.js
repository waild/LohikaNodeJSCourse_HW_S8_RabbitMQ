const Ajv = require('ajv');
const config = require('config');
const rmqManager = require('./../infrastracture/rabbitMQManager');

const reservationQueueName = config.get('RabbitMQ.reservationQueueName');

const ajv = new Ajv();

const { reservationSchema } = require('../validations/validationSchemas');

const isreservationValid = reservation => ajv.validate(reservationSchema, reservation);

class reservationService {
  static create(reservationRequest) {
    if (!isreservationValid(reservationRequest)) {
      return Promise.reject(new Error('Data is not valid'));
    }
    return rmqManager.publish(reservationQueueName, reservationRequest);
  }
}

module.exports = reservationService;
