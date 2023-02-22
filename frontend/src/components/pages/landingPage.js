import React, {} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Lottie from 'lottie-react';
import train from '../lottie/train.json';
import getUserInfo from "../../utilities/decodeJwt";
import { useState, useEffect } from 'react';
import DepartureBoard from '../DepartureBoard';

const Landingpage = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
      setUser(getUserInfo())
  }, [])

    return (
      <Container>
        <Row className="justify-content-md-center">
        <Card style={{ display: 'inline-block', maxWidth: '50%', margin: '0 auto' }} className="mx-2 my-2">
        <Lottie animationData={train} height='50%' loop={true} />
        <Card.Body className="justify-content-md-center">
          <Card.Title>MBTA Alerts App </Card.Title>
          <Card.Text>
          </Card.Text>
          {
            user ? <Card.Text> Hello {user.username} ! Welcome to the MBTA Alerts App</Card.Text> :        <>
            <Card.Link href="/signup">Sign Up</Card.Link>
            <Card.Link href="/login">Login</Card.Link>
            </>
          }

        </Card.Body>
      </Card>
      </Row>
      <DepartureBoard trainName="Express Train"
      direction="north"
      currentStop="Central Station"
      nextTrainTime={new Date() - 1000 * 60 * 5}
      color="#FFC107"> </DepartureBoard>
      </Container>
    )
}

export default Landingpage