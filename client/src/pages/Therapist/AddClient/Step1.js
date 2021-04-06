import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { BasicInput } from '../../../components/Inputs';
import Button from '../../../components/Button';

const Step1 = () => {
  const [firstInitial, setFirstInitial] = useState('');
  const [secondInitial, setSecondInitial] = useState('');
  const [postcodeLetter, setPostcodeLetter] = useState('');
  const [errors, setErrors] = useState('');
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
            name="setSecondInitial"
            error={errors.setSecondInitial}
          />
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <BasicInput
            label="First two letters of their postcode"
            placeholder="e.g. SW..."
            value={postcodeLetter}
            handleChange={setPostcodeLetter}
            name="postcodeLetter"
            error={errors.postcodeLetter}
          />
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <Button text="Next" />
        </Col>
      </Row>
    </>
  );
};

export default Step1;
