import React from 'react';

import Example from '.';

import { Row, Col } from '../Grid';
import * as T from '../Typography';

export default {
  title: 'Common Components/Example',
  component: Example,
  argTypes: {},
};

const FirstExample = (args) => {
  return (
    <Row>
      <Col w={[4, 8, 6]} dir="column" ai="flex-start">
        <Example {...args}>
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
  );
};

const SecondExample = (args) => {
  return (
    <Row>
      <Col w={[4, 8, 6]} dir="column" ai="flex-start">
        <Example {...args}>
          <T.P color="gray8">
            Between our therapy sessions and home programme content, we’ll
            continue supporting J P SW in 4 key areas: social interaction &
            communication, emotional wellbeing, cognition; learning, and
            physical skills. Each week, we’ll focus on 1 or more of these areas,
            with an accompanying resource to support her over that week.
          </T.P>
        </Example>
      </Col>
    </Row>
  );
};

export const First = FirstExample.bind({});
First.args = {
  showLabel: '',
  hideLabel: '',
};

export const Second = SecondExample.bind({});
Second.args = {
  showLabel: 'Example text',
  hideLabel: '',
};
