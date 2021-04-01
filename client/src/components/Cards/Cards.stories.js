import { useState } from 'react';
import * as T from '../Typography';

import { TherapyGoals, Info, Basic } from '.';

export default {
  title: 'Common Components/Cards',
  component: TherapyGoals,
  argTypes: {
    color: { control: 'color' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

const TherapyGoalsExample = (args) => {
  const [goals, setGoals] = useState(args.goals);
  return (
    <div style={{ maxWidth: '450px' }}>
      <TherapyGoals {...args} goals={goals} handleChange={setGoals} />
    </div>
  );
};

export const therapyGoals = TherapyGoalsExample.bind({});
therapyGoals.args = {
  goals: [
    { goal: 'goal1', category: 'Communication', id: 0 },
    { goal: 'goal2', category: 'Emotional wellbeing', id: 1 },
    { goal: 'goal3', category: 'Cognition and learning', id: 2 },
    { goal: 'goal4', category: 'Physical skills', id: 3 },
  ],
};

const InfoExampleJSX = (args) => {
  const body = (
    <>
      <T.P color="gray9" m={0}>
        - a minimum of 8 characters
      </T.P>
      <T.P color="gray9" m={0}>
        - one capital letter
      </T.P>
      <T.P color="gray9" m={0}>
        - one lowercase letter
      </T.P>
      <T.P color="gray9" m={0}>
        - one number
      </T.P>
      <T.P color="gray9" m={0}>
        - one non alphabetical or numeric character
      </T.P>
    </>
  );
  return <Info {...args} m={{ mt: 1 }} body={body} />;
};

export const infoExampleJSX = InfoExampleJSX.bind({});
infoExampleJSX.args = {
  title: 'Password must contain:',
};

const InfoExamplePlainBody = (args) => {
  return <Info {...args} m={{ mt: 1 }} />;
};

export const infoExamplePlainBody = InfoExamplePlainBody.bind({});
infoExamplePlainBody.args = {
  title: 'Password must contain:',
  body:
    'Your information is safe with us. All materials are kept confidential and in line with the Data Protection Act 1998, we only keep your data for as long as we need it for, which will be at least for the duration of you receiving our services.',
};

const BasicExample = (args) => {
  return (
    <div style={{ maxWidth: '350px' }}>
      <Basic {...args} />
    </div>
  );
};

export const Therapist = BasicExample.bind({});
Therapist.args = {
  therapistInfo: { firstName: 'Elizabeth', lastName: 'Peters', id: '1' },
  variant: 'therapistInfo',
};

export const TextInfoShort = BasicExample.bind({});
TextInfoShort.args = {
  variant: 'textInfoShort',
};

export const TextInfoLong = BasicExample.bind({});
TextInfoLong.args = {
  variant: 'textInfoLong',
};

export const NoProgrammes = BasicExample.bind({});
NoProgrammes.args = {
  variant: 'noProgrammes',
};
