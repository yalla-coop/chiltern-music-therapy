import { htmlLink, formateDate } from '../utils';
import { appLinks } from '../../../constants';

// Notifying a client that their therapist has edited one of their programmes
// recipient => 'CLIENT'
export default ({
  firstInitial,
  therapistName,
  programmeId,
  programmeCreatedAt,
}) => {
  const link = htmlLink(appLinks.LOGIN, 'link');

  const programmeLink = htmlLink(
    appLinks.THERAPIST_SINGLE_PROGRAMME.replace(':id', programmeId),
    'home programme',
  );
  const _date = formateDate(programmeCreatedAt);

  const subject = 'Your therapist has edited your programme';
  const html = `
    <div>
      <p>Dear ${firstInitial},</p>
      <br>
      <p>Your therapist ${therapistName}, has edited your ${programmeLink} created on ${_date}</p>
      <p>Follow this ${link} to log in and start enjoying your personalised digital content.</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
    </div>
  `;

  return { html, subject };
};
