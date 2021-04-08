import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { BasicInput } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { step1 as validate } from '../../../validation/schemas/addClient';

const Step1 = ({ submitStep }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [postcodeLetters, setPostcodeLetters] = useState('');
  const [errors, setErrors] = useState({});

  const handleClick = () => {
    try {
      validate({
        firstName,
        lastName,
        postcodeLetters,
      });
      setErrors({});
      submitStep({
        firstName: firstName.toUpperCase(),
        lastName: lastName.toUpperCase(),
        postcodeLetters: postcodeLetters.toUpperCase(),
      });
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
            label="First initial"
            placeholder="First initial..."
            value={firstName}
            handleChange={setFirstName}
            name="firstName"
            error={errors.firstName}
          />
        </Col>
        <Col w={[4, 4, 4]} mtT={5}>
          <BasicInput
            label="Second initial"
            placeholder="Second initial..."
            value={lastName}
            handleChange={setLastName}
            name="lastName"
            error={errors.lastName}
          />
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <BasicInput
            label="First two letters of their postcode"
            placeholder="e.g. SW..."
            value={postcodeLetters}
            handleChange={setPostcodeLetters}
            name="postcodeLetters"
            error={errors.postcodeLetters}
          />
        </Col>
      </Row>
      <Row mt={8} mtT={6}>
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step1;
