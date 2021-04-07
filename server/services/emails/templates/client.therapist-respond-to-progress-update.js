import { htmlLink } from '../utils';
import { appLinks } from '../../../constants';

// Sending a client the response from their therapist
// recipient => 'CLIENT'
export default ({ firstInitial, therapistName }) => {
  const loginLink = htmlLink(appLinks.LOGIN, 'link');

  const subject = 'Your therapist sent you a response!';
  const html = `
    <div>
      <p>Dear ${firstInitial},</p>
      <br>
      <p>Your Music Therapist, ${therapistName}, has sent you a response to your feedback.</p>
      <p>Follow this ${loginLink} to log in and view his/her comments!.</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
    </div>
  `;
  return { html, subject };
};
