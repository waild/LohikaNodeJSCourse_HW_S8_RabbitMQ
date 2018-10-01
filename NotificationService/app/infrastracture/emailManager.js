const config = require('config');

const mailSettings = config.get('MailSettings');
const sendmail = require('sendmail')(mailSettings);

class EmailManager {
  static send(data) {
    sendmail({
      from: 'no-reply@yourdomain.com',
      to: data.user_email,
      subject: 'Reservation detaild',
      text: data.message,
    }, (err, reply) => {
      console.log(err && err.stack);
      console.dir(reply);
    });
  }
}

module.exports = EmailManager;
