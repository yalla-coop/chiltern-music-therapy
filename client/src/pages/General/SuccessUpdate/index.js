import { Col, Row } from '../../../components/Grid';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { CLIENT } from '../../../constants/nav-routes';
import { roles } from '../../../constants';
import { useAuth } from '../../../context/auth';

const SuccessUpdate = () => {
  const {
    user: { role },
  } = useAuth();
  return role === roles.THERAPIST ? (
    <Title
      boldFirst
      boldSection="Success!"
      lightSection="Your feedback has been sent"
    />
  ) : (
    <>
      <Title boldSection="Thanks" lightSection="for your update!" boldFirst />
      <Row>
        <Col w={[4, 4, 4]}>
          <T.P color="gray8" mb="4">
            Your therapist will now receive an update.
          </T.P>
          <Button variant="primary" text="Return home" to={CLIENT.DASHBOARD} />
        </Col>
      </Row>
    </>
  );
};

export default SuccessUpdate;
