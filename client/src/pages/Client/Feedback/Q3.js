import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Rate } from '../../../components/Inputs';
import { useState } from 'react';
import Button from '../../../components/Button';

import validate from '../../../validation/schemas/feedback';

const Q3 = ({ handleStep }) => {
  const [rate, setRate] = useState(null);
  const [errors, setErrors] = useState({});
  const handleClick = async () => {
    try {
      await validate.q3validate({ rate });
      setErrors({});
      handleStep({ enjoyableResources: rate });
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
            QUESTION 3 OF 4
          </T.H5>
          <T.H3 color="gray10" weight="bold" mb="4">
            Did you find this week's digital resources enjoyable?
          </T.H3>
          <T.P color="gray8" mb="5">
            (Scale of 1 to 5, 1 being not very enjoyable, and 5 very enjoyable)
          </T.P>
        </Col>
        <Col w={[4, 12, 12]}>
          <Rate
            value={rate}
            handleChange={setRate}
            error={errors.rate}
            allowClear={false}
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

export default Q3;
