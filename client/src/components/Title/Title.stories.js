import Title from '.';

export default {
  title: 'Common Components/Title',
  component: Title,
};

const Template = (args) => <Title {...args} m="2" />;

export const Default = Template.bind({});
Default.args = { boldSection: 'Programmes', lightSection: 'My' };

export const BoldFirst = Template.bind({});
BoldFirst.args = {
  boldSection: 'Thanks',
  lightSection: 'for your feedback!',
  boldFirst: true,
};
