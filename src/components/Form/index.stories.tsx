import React from 'react';

import { Meta, Story } from '@storybook/react';

import Button from 'components/Button';
import Input from 'components/Input';

import Form, { FormProps } from '.';

export default { component: Form } as Meta;

const formChildren = (
  <>
    <Input type="email" name="email" label="Email" />
    <Input type="password" name="password" label="Password" />
    <Button type="submit" fullWidth>
      Sign Up
    </Button>
  </>
);

const Template = (args: FormProps) => <Form {...args} />;

export const Default: Story<FormProps> = Template.bind({});
Default.storyName = Form.name;
Default.args = { children: formChildren };
