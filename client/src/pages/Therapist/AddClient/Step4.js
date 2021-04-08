import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import { Textarea, Checkbox } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { step4 as validate } from '../../../validation/schemas/addClient';
import Avatar from '../../../components/Avatar';

const Step4 = ({ submitStep }) => {
  const [therapistBio, setBiography] = useState('');
  const [useMainBio, setUseMainBio] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClick = () => {
    try {
      validate({
        therapistBio,
        useMainBio,
      });
      setErrors({});
      submitStep({ therapistBio, useMainBio });
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ ...error.inner });
      }
      return false;
    }
  };

  const handleChange = () => setUseMainBio(!useMainBio);
  return (
    <>
      <Row mt={6}>
        <Col w={[4, 4, 4]} jcT="center">
          <Avatar status="loading" />
        </Col>
        <Col w={[4, 6, 6]} mtT={6}>
          <Textarea
            label="Would you like to include your biography for your client to see?"
            placeholder="Tell your clients a little bit about you..."
            value={therapistBio}
            handleChange={setBiography}
            name="biography"
            error={errors.therapistBio}
            rows={5}
            mb={4}
          />
          <Checkbox
            checked={useMainBio}
            handleChange={handleChange}
            label="Use my main biography"
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

export default Step4;
