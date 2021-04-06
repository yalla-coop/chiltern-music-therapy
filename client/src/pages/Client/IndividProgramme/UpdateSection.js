import { Row, Col } from '../../../components/Grid';
import { dateFormatter } from '../../../helpers';
import * as T from '../../../components/Typography';
import { navRoutes } from '../../../constants';
import Button from '../../../components/Button';

const UpdateSection = ({ update, therapist, id }) => (
  <Row mb="8">
    {update ? (
      <Col w={[4, 6, 8]} dir="column" ai="left">
        <T.H3 mb="2">Progress update</T.H3>
        <T.P color="gray8" mb="4">
          You sent your update{' '}
          {therapist && `to ${therapist.firstName} ${therapist.lastName} `}
          on {dateFormatter(update.createdAt)}
        </T.P>
        {update.therapistMessage && (
          <>
            <T.P color="gray8" weight="bold">
              Here's a message from your therapist:
            </T.P>
            <T.P color="gray8" mb="4">
              "{update.therapistMessage}"
            </T.P>
          </>
        )}
      </Col>
    ) : (
      <Col w={[4, 6, 8]} dir="column" ai="left">
        <T.H3 mb="2">Send a progress update</T.H3>
        <T.P color="gray8" mb="4">
          Want to send your therapist an update? Share videos, music, general
          thoughts or ask any questions here!
        </T.P>
        <Button
          to={navRoutes.CLIENT.SEND_UPDATE.replace('id', id)}
          text="Send update"
        />
      </Col>
    )}
  </Row>
);

export default UpdateSection;
