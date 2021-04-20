import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Textarea } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { TherapyGoals } from '../../../components/Cards';
import { step3 as validate } from '../../../validation/schemas/addClient';
import Example from '../../../components/Example';

const Step3 = ({ submitStep }) => {
  const [therapyBackground, setTherapyBackground] = useState('');
  const [therapyGoals, setGoals] = useState([
    { goal: '', category: '', id: 0 },
  ]);

  const [errors, setErrors] = useState({});

  const handleClick = () => {
    try {
      validate({
        therapyBackground,
        therapyGoals,
      });
      setErrors({});
      submitStep({ therapyBackground, therapyGoals });
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
            Please add a summary of your client's therapy background and goals
          </T.P>
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 6, 4]}>
          <Textarea
            label="Therapy background "
            placeholder="Therapy background..."
            value={therapyBackground}
            handleChange={setTherapyBackground}
            name="background"
            error={errors.therapyBackground}
            rows={5}
            mb={4}
          />
          <Example showLabel="Example text">
            <T.P color="gray8">
              Between our therapy sessions and home programme content, we’ll
              continue supporting J P SW in 4 key areas: social interaction &
              communication, emotional wellbeing, cognition; learning, and
              physical skills. Each week, we’ll focus on 1 or more of these
              areas, with an accompanying resource to support her over that
              week.
            </T.P>
          </Example>
        </Col>
        <Col w={[4, 6, 4]} mtM={7}>
          <TherapyGoals
            goals={therapyGoals}
            handleChange={setGoals}
            label="Therapy goals"
            error={errors.therapyGoals}
          />
          <Example showLabel="Example text">
            <T.P bold>Communication</T.P>
            <T.P color="gray8">
              - Goal 1: JE will consistently follow lyrical cues to wait and
              turn-take
            </T.P>
            <T.P bold mt="5">
              Emotional wellbeing
            </T.P>
            <T.P color="gray8">
              - Goal 1: For JE to be able to use eye gaze or visuals to
              communicate how she is feeling.
            </T.P>
          </Example>
        </Col>
      </Row>

      <Row mt={8} mtM={7}>
        <Col w={[4, 6, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step3;
