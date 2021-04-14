import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Rate, Checkbox } from '../../../components/Inputs';
import { useState } from 'react';
import Button from '../../../components/Button';

import validate from '../../../validation/schemas/feedback';

const Q2 = ({ handleStep }) => {
  const [rate, setRate] = useState(null);
  const [noDemos, setNoDemos] = useState(false);
  const [errors, setErrors] = useState({});
  const handleClick = async () => {
    try {
      await validate.q2validate({ rate, noDemos });
      setErrors({});
      handleStep({ clearDemos: rate, noDemos });
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
            QUESTION 2 OF 4
          </T.H5>
          <T.H3 color="gray10" weight="bold" mb="4">
            Were the demos clear for this week?
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
        <Col w={[4, 6, 6]}>
          <Checkbox
            label="There were no demos this week"
            checked={noDemos}
            handleChange={() => setNoDemos(!noDemos)}
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

export default Q2;
