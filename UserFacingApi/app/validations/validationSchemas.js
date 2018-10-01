
module.exports = {
  reservationSchema: {
    type: 'object',
    properties: {
      guests: {
        type: 'integer',
        minimum: 1,
        maximum: 10,
      },
      reservation_start: {
        type: 'string',
        format: 'date-time',
      },
      reservation_duration: {
        type: 'number',
        minimum: 0.5,
        maximum: 6,
      },
      user_email: {
        type: 'string',
        format: 'email',
      },
    },
  },
};
