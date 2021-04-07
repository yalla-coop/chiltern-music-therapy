import { htmlLink, formateDate } from '../utils';
import { appLinks } from '../../../constants';

// Notifying a therapist that their client has sent an update on how they're getting on with the programme
// recipient => 'THERAPIST'
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

  const subject = 'Your client has sent you a progress update!';
  const html = `
    <div>
      <p>Dear ${therapistName},</p>
      <br>
      <p>Your client ${firstInitial}, has sent you an update on their progress in the ${programmeLink} created on ${_date}.</p>
      <p>Follow this ${link} to log in and view his/her message.</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
    </div>
  `;

  return { html, subject };
};
