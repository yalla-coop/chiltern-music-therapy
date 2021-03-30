import { useState } from 'react';

import { TherapyGoals } from '.';

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
  return <TherapyGoals {...args} goals={goals} handleChange={setGoals} />;
};

export const therapyGoals = TherapyGoalsExample.bind({});
therapyGoals.args = {
  goals: [
    { goal: 'goal1', category: 'Communication' },
    { goal: 'goal2', category: 'Emotional wellbeing' },
    { goal: 'goal3', category: 'Cognition and learning' },
    { goal: 'goal4', category: 'Physical skills' },
  ],
};
