import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { BasicInput } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { addClient as validate } from '../../../validation/schemas';

const Step3 = ({ submitStep }) => {
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [PrimaryMobileNumber, setPrimaryMobileNumber] = useState('');
  const [errors, setErrors] = useState('');

  const handleClick = () => {
    try {
      validate({
        email,
        mobileNumber,
        PrimaryMobileNumber,
      });
      setErrors({});
      submitStep({ email, mobileNumber, PrimaryMobileNumber });
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ ...error.inner });
      }
      return false;
    }
  };
  return (
    <>
      <Row>
        <Col w={[4, 6, 6]}>
          <T.P>
            Follow these simple steps to create an account for your client. When
            this is done you are ready to start sharing your music therapy
            digital resources
          </T.P>
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <BasicInput
            label="Email"
            placeholder="Email..."
            value={email}
            handleChange={setEmail}
            name="email"
            error={errors.email}
          />
        </Col>
        <Col w={[4, 4, 4]}>
          <BasicInput
            label="Mobile number"
            placeholder="Mobile number (optional)"
            value={mobileNumber}
            handleChange={setMobileNumber}
            name="mobileNumber"
            error={errors.mobileNumber}
          />
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <BasicInput
            label="Primary contact mobile number"
            placeholder="Mobile number"
            value={PrimaryMobileNumber}
            handleChange={setPrimaryMobileNumber}
            name="PrimaryMobileNumber"
            error={errors.PrimaryMobileNumber}
          />
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step3;
