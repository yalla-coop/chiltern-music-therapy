import { htmlLink, formateDate } from '../utils';
import { appLinks } from '../../../constants';

// Notifying a therapist that their client has completed a programme and provided feedback
// recipient => 'THERAPIST'
export default ({
  firstInitial,
  therapistName,
  programmeCreatedAt,
  programmeId,
}) => {
  const loginLink = htmlLink(appLinks.LOGIN, 'link');
  const programmeLink = htmlLink(
    appLinks.THERAPIST_SINGLE_PROGRAMME.replace(':id', programmeId),
    'home programme',
  );
  const _date = formateDate(programmeCreatedAt);

  const subject = 'Your client completed a feedback!';
  const html = `
    <div>
      <p>Dear ${therapistName},</p>
      <br>
      <p>Your client, ${firstInitial}, has completed a feedback form about the ${programmeLink} you created for them on ${_date}.</p>
      <p>Follow this ${loginLink} to log in and view his/her message.</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
    </div>
  `;

  return { html, subject };
};
