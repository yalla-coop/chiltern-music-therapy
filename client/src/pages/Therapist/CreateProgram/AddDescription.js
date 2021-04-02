import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  Example,
} from '../../../components';

import flowTypes from './flowTypes';

const { Row, Col } = Grid;
const { Textarea } = Inputs;

const AddDescription = ({ description, actions }) => {
  const { SET_DESCRIPTION, SET_FLOW } = actions;

  const goNext = () => {
    return SET_FLOW(flowTypes.addContent);
  };

  const setDescription = (val) => {
    return SET_DESCRIPTION(val);
  };

  return (
    <>
      <GoBack />
      <Row mt={5}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme
          </T.H1>
        </Col>
      </Row>
      <Row mt={5}>
        <Col w={[4, 6, 6]}>
          <Textarea
            label="Please add a brief description of the content you are sharing and what you would like them to work on this week."
            rows={5}
            value={description}
            handleChange={setDescription}
          />
        </Col>
      </Row>
      <Row mt={2}>
        <Col w={[4, 6, 6]}>
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
        <Col w={[4, 4, 4]}>
          <Button variant="primary" text="Next" handleClick={goNext} />
        </Col>
      </Row>
    </>
  );
};

export default AddDescription;
