import Tag from '.';

export default {
  title: 'Common Components/Tags',
  component: Tag,
};

const Template = (args) => {
  return (
    <div style={{ width: '300px', margin: 50 }}>
      <Tag {...args}>{args.text}</Tag>
    </div>
  );
};

export const Tags = Template.bind({});
Tags.args = {
  text: 'Example Category',
  w: '161px',
};
