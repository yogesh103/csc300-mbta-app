import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';


const DepartureBoard = (props) => {
  const { trainName, direction, currentStop, nextTrainTime, color } = props;
  const timeDifference = Math.round((nextTrainTime - new Date()) / 60000);

  return (
    <Row>
      <Col md={4}> 
      <Card
          key={`trainName-currentStop`}
          text={'dark'}
          style={{ width: '18rem' , backgroundColor: color}}
          className="mb-2"
        >
          <Card.Body>
          <Card.Header>{trainName}</Card.Header>
          <Card.Body>
            <Card.Title>{currentStop}</Card.Title>
            <Card.Text>
              {timeDifference} mins from now
            </Card.Text>
          </Card.Body>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DepartureBoard;
