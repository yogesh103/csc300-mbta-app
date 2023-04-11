import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center my-4">About Us</h1>
          <p className="lead">
            This is a webapp built by Vu using the MERN stack (MongoDB, Express, React, and Node.js) that provides information and services for the Massachusetts Bay Transportation Authority (MBTA).
          </p>
          <p>
            Our mission is to make it easy for commuters and visitors to navigate the MBTA system by providing up-to-date information on schedules, delays, and other important news.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
