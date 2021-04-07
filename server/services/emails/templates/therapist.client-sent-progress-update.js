import { htmlLink } from '../utils';
import { appLinks } from '../../../constants';

// Notifying a therapist that their client has sent an update on how they're getting on with the programme
// recipient => 'THERAPIST'
export default ({ firstInitial, therapistName }) => {
  const link = htmlLink(appLinks.LOGIN, 'link');

  const subject = 'Your client has sent you a progress update!';
  const html = `
    <div>
      <p>Dear ${therapistName},</p>
      <br>
      <p>Your client, ${firstInitial}, has sent you an update on their progress this week.</p>
      <p>Follow this ${link} to log in and view his/her message.</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
    </div>
  `;

  return { html, subject };
};
