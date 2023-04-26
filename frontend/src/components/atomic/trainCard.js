import React from "react";
import { Card, Row } from "react-bootstrap";

function TrainCard(props) {
  const {
    name,
    timeInMinutes,
    direction,
    stopName,
    backgroundColor,
    drivingTimeInMinutes,
    walkingTimeInMinutes,
  } = props;

  const bg = `#${backgroundColor}`;
  if (timeInMinutes < 0) return null;
  return (
    <div key={stopName + name + direction} className="col">
      <Card
        style={{ backgroundColor: bg }}
        text="white"
        className="rounded shadow"
      >
        <Card.Body>
          <Row>
          <Card.Title>{name}</Card.Title>
          </Row>
          <Card.Subtitle className="mb-2 text-white">{direction}</Card.Subtitle>
          <div className="d-flex justify-content-between">
            <div>
              <i className="bi bi-geo-alt-fill me-2"></i> {stopName}
            </div>
            <div>
              <i className="bi bi-clock-fill me-2"></i>{" "}
              {timeInMinutes < 4 ? "Boarding Now" : timeInMinutes + " min"}
            </div>
          </div>
        </Card.Body>
        <Card.Body>
          <Row>
            <div className="d-flex justify-content-between">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="me-1"
                >
                  <path fill="white" d="m20.772 10.155-1.368-4.104A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6zM5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16zm13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16z"></path>
                </svg>
                {drivingTimeInMinutes}
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="me-1">               
                  <circle fill="white" cx="13" cy="4" r="2"></circle>
                  <path fill="white" d="M13.978 12.27c.245.368.611.647 1.031.787l2.675.892.633-1.896-2.675-.892-1.663-2.495a2.016 2.016 0 0 0-.769-.679l-1.434-.717a1.989 1.989 0 0 0-1.378-.149l-3.193.797a2.002 2.002 0 0 0-1.306 1.046l-1.794 3.589 1.789.895 1.794-3.589 2.223-.556-1.804 8.346-3.674 2.527 1.133 1.648 3.675-2.528c.421-.29.713-.725.82-1.225l.517-2.388 2.517 1.888.925 4.625 1.961-.393-.925-4.627a2 2 0 0 0-.762-1.206l-2.171-1.628.647-3.885 1.208 1.813z"></path>
                </svg>{" "}
               {walkingTimeInMinutes}
              </div>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TrainCard;
