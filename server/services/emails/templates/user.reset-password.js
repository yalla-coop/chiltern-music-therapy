import { htmlLink } from '../utils';
import { appLinks, EMAIL_FOOTER } from '../../../constants';

// Notifying a client that their therapist has edited one of their programmes
// recipient => 'CLIENT'
export default ({ firstInitial, resetToken }) => {
  const link = htmlLink(
    appLinks.RESET_PASSWORD.replace(':token', resetToken),
    'link',
  );

  const subject = 'Reset your Chiltern Music Therapy password';
  const html = `
    <div>
      <p>Dear ${firstInitial},</p>
      <br>
      <p>We've received your request to reset your Chiltern Music Therapy password. Click this link to set-up your new password:</p>
      <p>${link}</p>
      <br>
      <p>Didn't request a password reset?</p>
      <p>If you didn't ask for your password to be reset please get in touch with Chiltern Music Therapy.</p>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
      <br>
      ${EMAIL_FOOTER}
    </div>
  `;

  return { html, subject };
};
