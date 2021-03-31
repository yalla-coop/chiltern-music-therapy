import Tags from '.';

export default {
  title: 'Common Components/Tags',
  component: Tags,
};

const Template = (args) => {
  return (
    <div style={{ width: '500px', margin: 50 }}>
      <Tags {...args}>{args.tag}</Tags>
    </div>
  );
};

export const SingleTag = Template.bind({});
SingleTag.args = {
  tag: 'Example Category',
};

const Template1 = (args) => {
  return (
    <div style={{ width: '500px', margin: 50 }}>
      <Tags {...args}>{args.tag}</Tags>
    </div>
  );
};
export const MultiTags = Template1.bind({});
MultiTags.args = {
  tags: [
    'Example Category',
    'Example Category1',
    'Example Category2',
    'Example Category3',
    'Example Category3',
    'Example 2',
    'Example 1',
    'Example 3',
  ],
  m: 1,
};
