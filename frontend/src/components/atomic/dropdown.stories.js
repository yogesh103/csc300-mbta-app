import React from 'react';
import  DropDown  from './dropdown';

export default {
  title: 'DropDown',
  component: DropDown,
};

const Template = (args) => <DropDown {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  onSelect: (selectedOption) => console.log('Selected option:', selectedOption),
};
