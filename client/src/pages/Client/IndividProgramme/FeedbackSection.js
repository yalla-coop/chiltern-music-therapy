import { Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { navRoutes } from '../../../constants';
import Button from '../../../components/Button';

const FeedbackSection = ({ feedback, id }) =>
  feedback ? (
    <Col w={[4, 6, 4]} dir="column" ai="left">
      <T.H3 mb="2">Programme completed</T.H3>
      <T.P color="gray8" mb="4">
        Congratulations, you have marked this programme as complete!
      </T.P>
    </Col>
  ) : (
    <Col w={[4, 6, 4]} dir="column" ai="left">
      <T.H3 mb="2">Completed the content?</T.H3>
      <T.P color="gray8" mb="4">
        If you've finished going through the content listed above, click below
        to let your therapist know and provide feedback
      </T.P>
      <Button
        to={navRoutes.CLIENT.SEND_FEEDBACK.replace(':id', id)}
        text="Send feedback"
        variant="tertiary"
      />
    </Col>
  );

export default FeedbackSection;
