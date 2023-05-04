import React from 'react';
import  TrainCard from './trainCard';

export default {
  title: 'TrainCard',
  component: TrainCard,
};

const Template = (args) => <TrainCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Train Name',
  timeInMinutes: 5,
  direction: 'North',
  stopName: 'Station A',
  backgroundColor: '007bff',
  drivingTimeInMinutes: 10,
  walkingTimeInMinutes: 15,
  stopId: 'stop1',
  userId: 'user1',
  isFavorited: false,
  longitude: -71.0589,
  latitude: 42.3601,
};
