import loading from '../lottie/loading.json';
import React from 'react';
import Lottie from 'lottie-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Loading() {
    return (
        <div className='jumbotron vertical-center' style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Container>
                <Row>
                    <Col xs='12' style={{ margin: '0 auto' }}>
                        <Card>
                            <h1 style={{ textAlign: 'center' }}> Searching Nearby Train Stations... </h1>
                            <Lottie animationData={loading} loop={true} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Loading;