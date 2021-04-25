import { EMAIL_FOOTER } from '../../../constants';

// Client deletes account
// recipient => 'THERAPIST'
export default ({ therapistName }) => {
  const subject = 'One of your clients has successfully deleted their account.';

  const html = `
    <div>
      <p>Dear ${therapistName},</p>
      <br>
      <p>One of your clients has successfully deleted his/her/their account.</p>
      <br>
      <p>You can still see anonymised content you shared and feedback forms by accessing the Discharged Users tab on your dashboard.</p>
      <br>
      <p>Best wishes</p>
      <p>Chiltern Music Therapy</p>
      <br>
      ${EMAIL_FOOTER}
    </div>
  `;

  return { html, subject };
};
