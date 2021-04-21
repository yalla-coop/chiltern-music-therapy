import { useState, useEffect } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { BasicInput } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { step2 as validate } from '../../../validation/schemas/addClient';

import { Users } from '../../../api-calls';

const Step2 = ({ submitStep }) => {
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [primaryMobileNumber, setPrimaryMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [checkingEmail, setCheckingEmail] = useState(false);

  const handleClick = () => {
    try {
      validate({
        email,
        mobileNumber,
        primaryMobileNumber,
      });
      setErrors({});
      setCheckingEmail(true);
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ ...error.inner });
      }
      return false;
    }
  };

  const checkDetails = async () => {
    const { error } = await Users.checkUserExists({
      email,
      primaryMobileNumber,
      fields: ['email', 'primaryMobileNumber'],
    });
    if (error) {
      setErrors({ [error.data?.field]: error.message });
    } else {
      submitStep({ email, mobileNumber, primaryMobileNumber });
    }
    setCheckingEmail(false);
  };

  useEffect(() => {
    if (checkingEmail) {
      checkDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingEmail]);

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
        <Col w={[4, 6, 4]}>
          <BasicInput
            label="Email"
            placeholder="Email..."
            value={email}
            handleChange={setEmail}
            name="email"
            error={errors.email}
          />
        </Col>
        <Col w={[4, 6, 4]} mtM={5}>
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
        <Col w={[4, 6, 4]}>
          <BasicInput
            label="Primary contact mobile number"
            placeholder="Mobile number"
            value={primaryMobileNumber}
            handleChange={setPrimaryMobileNumber}
            name="primaryMobileNumber"
            error={errors.primaryMobileNumber}
          />
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 6, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step2;
