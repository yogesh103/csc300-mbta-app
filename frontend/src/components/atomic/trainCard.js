import React from 'react';
import { Card } from 'react-bootstrap';

function TrainCard(props) {
  const { name, timeInMinutes, direction, stopName, backgroundColor } = props;

  return (
    <Card bg={backgroundColor} text="white" className="rounded shadow">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{direction}</Card.Subtitle>
        <Card.Text>
          Time: {timeInMinutes} min<br />
          Stop: {stopName}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TrainCard;