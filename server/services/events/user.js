import pubSub from './create-pub-sub';
import events from './event-types';
// import external service or another module eg. sendEmail

// pubSub.listen(events.user.CLIENT_SIGNUP /* , sendEmail.welcomeClient */);
pubSub.listen(events.user.CLIENT_SIGNUP, (...args) => {
  console.log('EXAMPLE');
  console.log(args);
});
