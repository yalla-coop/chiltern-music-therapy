import React, { useState } from 'react';
import { Row, Col } from '../Grid';
import { BasicInput, Textarea, Dropdown, Checkbox, Rate } from './index';

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
  type: 'text',
  m: { mt: '0' }, // mt, mtT, mtM, mb, mbT, ....
};

// TEXT AREA INPUT
const TextareaExample = (args) => {
  const [value, setValue] = useState('');

  return (
    <Row>
      <Col w={[4, 6, 4]}>
        <Textarea {...args} value={value} handleChange={setValue} />
      </Col>
    </Row>
  );
};

export const textArea = TextareaExample.bind({});
textArea.args = {
  color: '',
  label: 'Programme description',
  w: '100%',
  disabled: false,
  error: '',
  helper: '',
  placeholder: 'Unique biography...',
  type: 'text',
  rows: 5,
  m: { mt: '0' }, // mt, mtT, mtM, mb, mbT, ....
};

// DROPDOWN
const DropdownExample = (args) => {
  const [selected, setSelected] = useState(['Option 1']);

  return (
    <Row>
      <Col w={[4, 6, 4]}>
        <Dropdown {...args} selected={selected} handleChange={setSelected} />
      </Col>
    </Row>
  );
};

export const dropdown = DropdownExample.bind({});
dropdown.args = {
  color: '',
  label: 'Dropdown',
  w: '100%',
  disabled: false,
  error: '',
  helper: '',
  options: [
    { label: 'Option 1 Super Long with Lots of Info', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
  ],
  multi: false,
  bold: false,
  search: false,
};

// CHECKBOX
const CheckboxExample = (args) => {
  const [checked, setChecked] = useState();

  const handleChange = () => setChecked(!checked);

  return (
    <Row>
      <Col w={[4, 6, 4]}>
        <Checkbox {...args} checked={checked} handleChange={handleChange} />
      </Col>
    </Row>
  );
};

export const checkbox = CheckboxExample.bind({});
checkbox.args = {
  disabled: false,
  color: '',
  label: 'plain text label, but it takes jsx child as well.',
  error: '',
};

// Rate
const RateExample = (args) => {
  const [value, setValue] = useState(args.value);
  console.log(value);
  return (
    <Row>
      <Col w={[4, 6, 4]}>
        <Rate {...args} handleChange={setValue} value={value} />
      </Col>
    </Row>
  );
};

export const rate = RateExample.bind({});
rate.args = {
  value: 3, // initial value
  disabled: false,
  allowClear: false,
  error: '',
};
