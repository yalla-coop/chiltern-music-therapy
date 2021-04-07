import { useState } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Textarea } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { TherapyGoals } from '../../../components/Cards';
import { step3 as validate } from '../../../validation/schemas/addClient';
import Example from '../../../components/Example';

const Step3 = ({ submitStep }) => {
  const [background, setBackground] = useState('');
  const [goals, setGoals] = useState([{ goal: '', category: '', id: 0 }]);

  const [errors, setErrors] = useState({});

  const handleClick = () => {
    try {
      validate({
        background,
        goals,
      });
      setErrors({});
      submitStep({ background, goals });
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
            Please add a background of your client's therapy background and
            goals
          </T.P>
        </Col>
      </Row>
      <Row mt={6}>
        <Col w={[4, 4, 4]}>
          <Textarea
            label="Therapy background "
            placeholder="Therapy background..."
            value={background}
            handleChange={setBackground}
            name="background"
            error={errors.background}
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
        <Col w={[4, 4, 4]} mtT={7}>
          <TherapyGoals
            goals={goals}
            handleChange={setGoals}
            label="Therapy goals"
            error={errors.goals}
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

      <Row mt={8} mtT={7}>
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step3;
