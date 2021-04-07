import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Textarea } from '../../../components/Inputs';
import Button from '../../../components/Button';
import Copy from '../../../components/Copy';

const Step6 = ({ submitStep }) => {
  const handleClick = () => {
    // try {
    //   setErrors({});
    //   submitStep({ message });
    //   return true;
    // } catch (error) {
    //   console.log({ error });
    //   if (error.name === 'ValidationError') {
    //     console.log({ error });
    //     setErrors({ ...error.inner });
    //   }
    //   return false;
    // }
  };

  return (
    <>
      <Row>
        <Col w={[4, 6, 6]}>
          <T.P color="gary8">
            Please share this unique invite link to your client
          </T.P>
        </Col>
      </Row>
      <Row mt={4}>
        <Col w={[4, 6, 6]}>
          <Copy />
          <T.Link to="/" underline>
            Email link
          </T.Link>
        </Col>
      </Row>

      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} variant="secondary" />
        </Col>
      </Row>
    </>
  );
};

export default Step6;
