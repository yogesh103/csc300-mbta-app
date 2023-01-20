import React, {} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Lottie from 'lottie-react';
import train from '../lottie/train.json';

const Landingpage = () => {
    
    return (
      <Container>
        <Row className="justify-content-md-center">
        <Card style={{ display: 'inline-block', maxWidth: '50%', margin: '0 auto' }} className="mx-2 my-2">
        <Lottie animationData={train} height='50%' loop={true} />
        <Card.Body className="justify-content-md-center">
          <Card.Title>MBTA Alerts App </Card.Title>
          <Card.Text>
          </Card.Text>
          <Card.Link href="/signup">Sign Up</Card.Link>
          <Card.Link href="/login">Login</Card.Link>
        </Card.Body>
      </Card>
      </Row>
      </Container>
    )
}

export default Landingpage