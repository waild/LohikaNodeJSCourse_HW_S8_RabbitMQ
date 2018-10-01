exports.up = function (knex) {
  return knex('tables')
    .insert([{
      number: 1,
      capacity: 2,
    },
    {
      number: 2,
      capacity: 2,
    },
    {
      number: 3,
      capacity: 4,
    },
    {
      number: 4,
      capacity: 4,
    },
    {
      number: 5,
      capacity: 4,
    },
    {
      number: 6,
      capacity: 4,
    },
    {
      number: 7,
      capacity: 4,
    },
    {
      number: 8,
      capacity: 6,
    },
    {
      number: 9,
      capacity: 6,
    },
    {
      number: 10,
      capacity: 10,
    },
    ]);
};

exports.down = function (knex) {
  return knex('reservations').truncate().then(() => { knex('tables').truncate() ;});
};
