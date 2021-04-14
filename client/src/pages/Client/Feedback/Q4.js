import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Textarea } from '../../../components/Inputs';
import { useState } from 'react';
import Button from '../../../components/Button';

import validate from '../../../validation/schemas/feedback';

const Q4 = ({ handleFinalStep }) => {
  const [likeMostAndLeast, setLikeMostAndLeast] = useState('');
  const [errors, setErrors] = useState({});
  const handleClick = async () => {
    try {
      await validate.q4validate({ likeMostAndLeast });
      setErrors({});
      handleFinalStep({ likeMostAndLeast });
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors(error.inner);
      }
    }
  };
  return (
    <>
      <Row mt="5">
        <Col w={[4, 6, 6]} display="block">
          <T.H5 color="gray7" mb="4">
            QUESTION 4 OF 4
          </T.H5>
          <T.H3 color="gray10" weight="bold" mb="4">
            What did you like the most (and least!) when using the digital
            platform this week?
          </T.H3>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 6]}>
          <Textarea
            placeholder="Write your answer here..."
            value={likeMostAndLeast}
            handleChange={setLikeMostAndLeast}
            error={errors.likeMostAndLeast}
            rows="5"
          />
        </Col>
      </Row>
      <Row mt="6">
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Q4;
