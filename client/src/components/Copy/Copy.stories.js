import React from 'react';

import Copy from './index';

export default {
  title: 'Common Components/Copy',
  component: Copy,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => {
  return (
    <div style={{ width: '400px' }}>
      <Copy {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
