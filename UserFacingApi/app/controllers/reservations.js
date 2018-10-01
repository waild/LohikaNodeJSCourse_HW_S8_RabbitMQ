const reservationService = require('../services/reservationService');

class reservations {
  static create(req, res) {
    reservationService
      .create(req.body)
      .then(() => {
        res.sendStatus(201);
      }).catch(err => res.status(400).json({ error: err.message }));
  }
}
module.exports = reservations;
