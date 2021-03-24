import React from 'react';

import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body16,
  Body16B,
  BodyB,
  BodyL,
  BodyLB,
  BodyR,
} from '.';

export default {
  title: '0- Typography',
  component: H1,
  argTypes: {
    color: 'pink',
    m: {
      name: 'margin',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    mx: {
      name: 'margin-x',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    my: {
      name: 'margin-y',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    mt: {
      name: 'margin-top',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    mb: {
      name: 'margin-bottom',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    ml: {
      name: 'margin-left',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    mr: {
      name: 'margin-right',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
  },
};

const Heading1 = (args) => <H1 {...args}>Display/H1</H1>;

export const h1 = Heading1.bind({});
h1.args = {
  color: 'blue',
};

const Heading2 = (args) => <H2 {...args}>Display/H2</H2>;

export const h2 = Heading2.bind({});
h2.args = {
  color: 'blue',
};

const Heading3 = (args) => <H3 {...args}>Display/H3</H3>;

export const h3 = Heading3.bind({});
h3.args = {
  color: 'blue',
};

const Heading4 = (args) => <H4 {...args}>Display/H4</H4>;

export const h4 = Heading4.bind({});
h4.args = {
  color: 'blue',
};

const Heading5 = (args) => <H5 {...args}>Display/H5</H5>;

export const h5 = Heading5.bind({});
h5.args = {
  color: 'blue',
};

const Heading6 = (args) => <H6 {...args}>Display/H6</H6>;

export const h6 = Heading6.bind({});
h6.args = {
  color: 'blue',
};

const bodyLargeTemplate = (args) => <BodyL {...args}>Display/body large</BodyL>;

export const bodyLarge = bodyLargeTemplate.bind({});
bodyLarge.args = {
  color: 'blue',
};

const bodyRegularTemplate = (args) => <BodyR {...args}>Display/regular</BodyR>;

export const bodyRegular = bodyRegularTemplate.bind({});
bodyRegular.args = {
  color: 'blue',
};

const body16Template = (args) => <Body16 {...args}>Display/body 16</Body16>;

export const body16 = body16Template.bind({});
body16.args = {
  color: 'blue',
};

const bodyLargeBoldTemplate = (args) => (
  <BodyLB {...args}>Display/body large bold</BodyLB>
);

export const bodyLargeBold = bodyLargeBoldTemplate.bind({});
bodyLargeBold.args = {
  color: 'blue',
};

const bodyBoldTemplate = (args) => <BodyB {...args}>Display/body bold</BodyB>;

export const bodyBold = bodyBoldTemplate.bind({});
bodyBold.args = {
  color: 'blue',
};

const body16BoldTemplate = (args) => <Body16B {...args}>body 16 bold</Body16B>;

export const body16Bold = body16BoldTemplate.bind({});
body16Bold.args = {
  color: 'blue',
};
