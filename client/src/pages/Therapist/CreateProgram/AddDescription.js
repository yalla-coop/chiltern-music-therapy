import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { navRoutes } from '../../../constants';
import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  Example,
} from '../../../components';

import validate from '../../../validation/schemas/programme';

const { Row, Col } = Grid;
const { Textarea } = Inputs;

const AddDescription = ({ navFunctions, state, actions, clientId }) => {
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const history = useHistory();

  const { description, errors } = state;
  const { SET_DESCRIPTION, SET_ERRORS } = actions;

  const validateForm = () => {
    try {
      const formData = {
        description,
        part: 'description',
      };
      validate(formData);
      SET_ERRORS({});

      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        SET_ERRORS(error.inner);
      }
      return false;
    }
  };

  useEffect(() => {
    if (submitAttempt) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitAttempt(true);
    const isValid = validateForm();
    if (isValid) {
      navFunctions.goToAddContent();
    }
  };

  const goBack = () => {
    history.push(navRoutes.THERAPIST.CLIENT.replace(':id', clientId));
  };

  return (
    <>
      <GoBack customFn={goBack} />
      <Row mt={5}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme
          </T.H1>
        </Col>
      </Row>
      <Row mt={5}>
        <Col w={[4, 9, 6]}>
          <Textarea
            label="Please add a brief description of the content you are sharing and what you would like them to work on this week."
            placeholder="Programme description..."
            rows={5}
            value={description}
            handleChange={(val) => SET_DESCRIPTION(val)}
            error={errors && errors.description}
          />
        </Col>
      </Row>
      <Row mt={2}>
        <Col w={[4, 9, 6]}>
          <Example>
            Between our therapy sessions and home programme content, we’ll
            continue supporting J in 4 key areas: social interaction &
            communication, emotional wellbeing, cognition; learning, and
            physical skills. Each week, we’ll focus on 1 or more of these areas,
            with an accompanying resource to support her over that week.
          </Example>
        </Col>
      </Row>
      <Row mt={7}>
        <Col w={[4, 9, 4]}>
          <Button
            type="submit"
            variant="primary"
            text="Next"
            handleClick={handleSubmit}
          />
        </Col>
      </Row>
    </>
  );
};

export default AddDescription;
