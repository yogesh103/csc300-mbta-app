// SubmitButton.stories.js
import React from 'react';
import  SubmitButton  from './submitButton';

export default {
  title: 'SubmitButton',
  component: SubmitButton,
};

const Template = (args) => <SubmitButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  text: 'Submit',
  onClick: () => console.log('Submit Button Clicked'),
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

