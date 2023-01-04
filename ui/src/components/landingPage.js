import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
    // useEffect(() => {
    //  localStorage.removeItem('accessToken')
    // }, [])
    
    return (
        <Card style={{ width: '30rem' }} className="mx-2 my-2">
        <Card.Body>
          <Card.Title>CSC 300 Skeleton App</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">A starting point for an application.</Card.Subtitle>
          <Card.Text>
          </Card.Text>
          <Card.Link href="/signup">Sign Up</Card.Link>
          <Card.Link href="/login">Login</Card.Link>
        </Card.Body>
      </Card>
    )
}

export default Landingpage