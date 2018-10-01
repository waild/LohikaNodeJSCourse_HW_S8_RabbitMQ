const express = require('express');

const router = express.Router();
const reservationsCtrl = require('../controllers/reservations');

router.route('/reservations').post(reservationsCtrl.create);
module.exports = router;
