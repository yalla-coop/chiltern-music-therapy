import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Textarea } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { step5 as validate } from '../../../validation/schemas/addClient';

const Step5 = ({ submitStep }) => {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleClick = () => {
    try {
      validate({
        message,
      });
      setErrors({});
      submitStep({ message });
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
            Nearly there! Please provide a short personal message to welcome
            them to the tool when they sign up
          </T.P>
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 6, 6]}>
          <Textarea
            label="Personal message"
            placeholder="Intro..."
            value={message}
            handleChange={setMessage}
            name="message"
            error={errors.message}
            rows={5}
            mb={4}
          />
        </Col>
      </Row>

      <Row mt={8} mtT={10}>
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step5;
