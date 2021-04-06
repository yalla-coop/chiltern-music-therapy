import { htmlLink } from '../utils';
import { appLinks } from '../../../constants';

// Notifying a client that their therapist has sent them a new programme
// recipient => 'CLIENT'
export default ({ firstInitial, therapistName }) => {
  const link = htmlLink(appLinks.LOGIN, 'link');

  const subject = 'You have a new programme!';
  const html = `
    <div>
      <p>Dear ${firstInitial},</p>
      <br>
      <p>Your therapist, ${therapistName}, has uploaded a new home programme for you to access via the chiltern music therapy digital platform.</p>
      <p>Follow this ${link} to log in and start enjoying your personalised digital content.</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
    </div>
  `;
  return { html, subject };
};
