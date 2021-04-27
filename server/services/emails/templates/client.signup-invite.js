import { htmlLink } from '../utils';
import { appLinks, EMAIL_FOOTER } from '../../../constants';

// Inviting client to sign up
// recipient => 'CLIENT'
export default ({ firstInitial, therapistName, inviteToken }) => {
  const _link = appLinks.CLIENT_SIGNUP_INVITE.replace(':invite', inviteToken);
  const link = htmlLink(_link, 'link');

  const subject = 'Welcome to Chiltern Music Therapy Digital Platform!';

  const html = `
    <div>
      <p>Dear ${firstInitial},</p>
      <br>
      <p>Welcome to Chiltern Music Therapy Digital Platform!</p>
      <br>
      <p>Your therapist ${therapistName}, has created an account for you to access your digital music therapy resources in between in-person sessions.</p>
      <p>Follow this ${link} to log in and complete your registration.</p>
      <p>${_link}</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
      <br>
      ${EMAIL_FOOTER}
    </div>
  `;

  return { html, subject };
};
