import { Col, Row } from '../../../components/Grid';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { CLIENT } from '../../../constants/nav-routes';

const SuccessUpdate = () => {
  return (
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
