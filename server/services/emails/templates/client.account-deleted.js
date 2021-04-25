import { EMAIL_FOOTER } from '../../../constants';

// Client deletes account
// recipient => 'CLIENT'
export default ({ firstInitial }) => {
  const subject = 'You have successfully deleted your account!';

  const html = `
    <div>
      <p>Dear ${firstInitial},</p>
      <br>
      <p>You have successfully deleted your account from Chiltern Music Therapy Digital Platform</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
      <br>
      ${EMAIL_FOOTER}
    </div>
  `;

  return { html, subject };
};
