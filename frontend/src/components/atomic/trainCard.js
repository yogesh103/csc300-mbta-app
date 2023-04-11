import React from 'react';
import { Card } from 'react-bootstrap';

function TrainCard(props) {
  const {
    name,
    timeInMinutes,
    direction,
    stopName,
    backgroundColor,
  } = props;
  const bg = `#${backgroundColor}`;
  if(timeInMinutes < 0) return null;
  return (
    <div key={stopName + name + direction} className="col">
      <Card style={{ backgroundColor: bg }} text="white" className="rounded shadow">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-white">{direction}</Card.Subtitle>
          <div className="d-flex justify-content-between">
            <div>
              <i className="bi bi-geo-alt-fill me-2"></i> {stopName}
            </div>
            <div>
              <i className="bi bi-clock-fill me-2"></i> {timeInMinutes} min
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TrainCard;