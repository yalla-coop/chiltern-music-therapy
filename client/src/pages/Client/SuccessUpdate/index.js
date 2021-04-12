import { Col, Row } from '../../../components/Grid';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { CLIENT } from '../../../constants/nav-routes';
import { useAuth } from '../../../context/auth';

const SuccessUpdate = () => {
  const {
    user: { role },
  } = useAuth();
  return role === 'THERAPIST' ? (
    <Title
      boldFirst
      boldSection="Success!"
      lightSection="Your feedback has been sent"
    />
  ) : (
    <Title>
      <Title boldSection="Thanks" lightSection="for your update!" boldFirst />
      <Row style={{ border: '1px solid red', flexGrow: 1 }}>
        <Col w={[4, 4, 4]}>
          <T.P color="gray8" mb="4">
            Your therapist will now receive an update.
          </T.P>
          <Button variant="primary" text="Return home" to={CLIENT.DASHBOARD} />
        </Col>
      </Row>
    </Title>
  );
};

export default SuccessUpdate;
