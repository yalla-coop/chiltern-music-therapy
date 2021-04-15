import { Col, Row } from '../../../components/Grid';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import * as T from '../../../components/Typography';
import { CLIENT } from '../../../constants/nav-routes';

const SuccessFeedback = () => {
  return (
    <>
      <Title boldSection="Thanks" lightSection="for your Feedback!" boldFirst />
      <Row>
        <Col w={[4, 4, 4]}>
          <T.P color="gray8" mb="4">
            This will help shape your plan further to reach your goals.{' '}
          </T.P>
          <Button variant="primary" text="Return home" to={CLIENT.DASHBOARD} />
        </Col>
      </Row>
    </>
  );
};

export default SuccessFeedback;
