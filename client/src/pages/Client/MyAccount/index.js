import Title from '../../../components/Title';
import { BasicInput, Checkbox } from '../../../components/Inputs';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import { Row, Col } from '../../../components/Grid';

const MyAccount = () => {
  console.log('hey');

  return (
    <>
      <Title lightSection="My" boldSection="Account" />
      <Row>
        <Col w={[4, 6, 4]}>
          <BasicInput label="Name" />
        </Col>
        <Col w={[4, 6, 4]}>
          <BasicInput label="Email" />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]}>
          <BasicInput label="Mobile number" />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]}>
          <Button text="Save changes" />
        </Col>
      </Row>
    </>
  );
};

export default MyAccount;
