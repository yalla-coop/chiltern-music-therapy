import React from 'react';
import { Row, Col } from '.';

export default {
  title: 'Common Components/Grid',
  component: Row,
  argTypes: {
    w: { control: 'array', defaultValue: [2, 12, 12] },
  },
};

const Template = (args) => (
  <Row inner={args.inner} jc={args.jc}>
    <Col w={args.w}>
      <p style={{ background: 'red' }}>COl 1</p>
    </Col>
    <Col w={args.w}>
      <p style={{ background: 'green' }}>COl 2</p>
    </Col>
    <Col w={args.w}>
      <p style={{ background: 'orange' }}>COl 3</p>
    </Col>
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  inner: true,
  jc: 'flex-start',
};
