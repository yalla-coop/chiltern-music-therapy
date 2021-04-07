import pubSub from './create-pub-sub';
import events from './event-types';
import { sendMail, keys } from '../emails';

// pubSub.listen(events.user.CLIENT_SIGNUP /* , sendEmail.welcomeClient */);
pubSub.listen(events.USER.CLIENT_SIGNUP, (...args) => {
  console.log('EXAMPLE');
  console.log(args);
});

pubSub.listen(
  events.USER.RESET_PASSWORD,
  async ({ resetToken, firstInitial, email }) => {
    console.log('REACHED', resetToken);
    await sendMail(keys.USER_RESET_PASSWORD, {
      to: email,
      firstInitial,
      resetToken,
    });
  },
);
