import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { BasicInput } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { step1 as validate } from '../../../validation/schemas/addClient';

const Step1 = ({ submitStep }) => {
  const [firstInitial, setFirstInitial] = useState('');
  const [secondInitial, setSecondInitial] = useState('');
  const [postcodeLetters, setPostcodeLetters] = useState('');
  const [errors, setErrors] = useState({});

  const handleClick = () => {
    try {
      validate({
        firstInitial,
        secondInitial,
        postcodeLetters,
      });
      setErrors({});
      submitStep({ firstInitial, secondInitial, postcodeLetters });
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
            value={firstInitial}
            handleChange={setFirstInitial}
            name="firstInitial"
            error={errors.firstInitial}
          />
        </Col>
        <Col w={[4, 4, 4]}>
          <BasicInput
            label="Second initial"
            placeholder="Second initial..."
            value={secondInitial}
            handleChange={setSecondInitial}
            name="secondInitial"
            error={errors.secondInitial}
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
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step1;
