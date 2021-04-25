import { htmlLink } from '../utils';
import { appLinks, EMAIL_FOOTER } from '../../../constants';

// Notifying a client that their therapist has sent them a new programme
// recipient => 'CLIENT'
export default ({ firstInitial, therapistName, programmeId }) => {
  const link = htmlLink(appLinks.LOGIN, 'link');
  const programmeLink = htmlLink(
    appLinks.THERAPIST_SINGLE_PROGRAMME.replace(':id', programmeId),
    'home programme',
  );

  const subject = 'You have a new programme!';
  const html = `
    <div>
      <p>Dear ${firstInitial},</p>
      <br>
      <p>Your therapist ${therapistName}, has uploaded a new ${programmeLink} for you to access via the chiltern music therapy digital platform.</p>
      <p>Follow this ${link} to log in and start enjoying your personalised digital content.</p>
      <p>${appLinks.LOGIN}</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
      <br>
      ${EMAIL_FOOTER}
    </div>
  `;
  return { html, subject };
};
