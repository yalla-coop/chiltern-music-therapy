import React from 'react';

import Icon from '.';

export default {
  title: 'Common Components/Icon',
  component: Icon,
  argTypes: {
    color: { control: 'color' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

const Template = (args) => <Icon {...args} />;

export const Email = Template.bind({});
Email.args = {
  icon: 'email',
  width: 50,
  height: 50,
};
