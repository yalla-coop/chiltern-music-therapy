import React from 'react';

import Avatar from '.';

export default {
  title: 'Common Components/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Avatar {...args} />;

export const LoadingStatus = Template.bind({});
LoadingStatus.args = {
  status: 'loading',
  image: '',
};

const testSrc = 'https://images.indianexpress.com/2020/03/amp-4.jpg';

export const ReadyStatus = Template.bind({});
ReadyStatus.args = {
  status: 'ready',
  image: testSrc,
};
