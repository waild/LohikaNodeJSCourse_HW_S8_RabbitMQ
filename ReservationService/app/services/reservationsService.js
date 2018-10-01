
const config = require('config');
const reservationRepo = require('../repositories/reservationRepo');
const rmqManager = require('../infrastracture/rabbitMQManager');

const notificationQueueName = config.get('RabbitMQ.notificationQueueName');

const map = (reservation) => {
  const end = new Date(reservation.reservation_start);
  end.setSeconds(end.getSeconds() + reservation.reservation_duration * 60 * 60);
  return {
    start: new Date(reservation.reservation_start),
    end,
    guests: reservation.guests,
    user_email: reservation.user_email,
  };
};

const sendReservationNotification = (wasReserved, reservationData) => {
  const notificationData = {
    user_email: reservationData.user_email,
    message: wasReserved ? 'Reservation is successful.' : 'Reservation is not successful',
  };
  rmqManager.publish(notificationQueueName, notificationData);
};


class ReservationsService {
  static async create(reservationRequest) {
    const reservation = map(reservationRequest);
    const freeTables = await reservationRepo
      .getFreeTablesForPeriod(reservation.start, reservation.end);
    const smalestAvailableTable = freeTables
      .find(value => value.capacity >= reservationRequest.guests);
    if (smalestAvailableTable) {
      reservation.table_id = smalestAvailableTable.id;
      await reservationRepo.create(reservation);
      sendReservationNotification(true, reservationRequest);
    } else {
      sendReservationNotification(false, reservationRequest);
    }
  }
}

module.exports = ReservationsService;
