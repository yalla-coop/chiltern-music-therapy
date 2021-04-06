import nodeMailer from 'nodemailer';
import config from '../../config';
import keys, { templatesKeys } from './template-keys';

const { senderEmail, senderPassword } = config.emails;

const sendMail = (templateKey, data = {}) => {
  const transporter = () =>
    nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

  const { subject, html } = templatesKeys[templateKey](data);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('email suppose to be sent to');
    // eslint-disable-next-line no-console
    console.log('email details', {
      from: senderEmail,
      to: data.to,
      subject,
      html,
    });
    return;
  }

  return transporter().sendMail({
    from: senderEmail,
    to: data.to,
    subject,
    html,
  });
};

export default {
  sendMail,
  keys,
};
