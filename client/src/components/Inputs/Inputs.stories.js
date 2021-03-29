import React, { useState } from 'react';
import { Row, Col } from '../Grid';
import { BasicInput } from './index';

export default {
  title: 'Common Components/Input',
  argTypes: {},
};

// BASIC INPUT
const BasicExample = (args) => {
  const [value, setValue] = useState('');

  return (
    <Row>
      <Col w={[4, 6, 4]}>
        <BasicInput {...args} value={value} handleChange={setValue} />
      </Col>
    </Row>
  );
};

export const basic = BasicExample.bind({});
basic.args = {
  color: '',
  label: 'Name',
  w: '100%',
  disabled: false,
  error: '',
  helper: 'Helper text',
  placeholder: 'Type your name...',
  isOptional: false,
  type: 'text',
  m: { mt: '0' }, // mt, mtT, mtM, mb, mbT, ....
};
