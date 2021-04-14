import Title from '../../../components/Title';

import { Col, Row } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Rate, Textarea } from '../../../components/Inputs';
import { useState } from 'react';
import Button from '../../../components/Button';

import validate from '../../../validation/schemas/feedback';

const Q1 = ({ handleStep }) => {
  const [rate, setRate] = useState(null);
  const [problems, setProblems] = useState('');
  const [errors, setErrors] = useState({});
  const handleClick = async () => {
    try {
      await validate.q1validate({ rate, problems });
      setErrors({});
      handleStep({ clearInstructions: rate, problems });
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors(error.inner);
      }
    }
  };
  return (
    <>
      <Title
        boldFirst
        boldSection="Wel done!"
        lightSection="Amazing effort 💪"
      />
      <Row>
        <Col w={[4, 12, 6]}>
          <T.P>
            Well done for going through the content this week. Remember you can
            go back over it at any time you want in the future
          </T.P>
        </Col>
      </Row>
      <Row mt="5">
        <Col w={[4, 6, 6]} display="block">
          <T.H5 color="gray7" mb="4">
            QUESTION 1 OF 4
          </T.H5>
          <T.H3 color="gray10" weight="bold" mb="4">
            Were the instructions clear for this week?
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
          <Textarea
            label="Did you have any problems in doing the work?"
            placeholder="Problems... (optional)"
            rows="5"
            value={problems}
            handleChange={setProblems}
            error={errors.problems}
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

export default Q1;
