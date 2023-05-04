import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import MapComponent from "../atomic/mapComponent";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(getUserInfo());
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [favoriteStops, setFavoriteStops] = useState([]);
  const navigate = useNavigate();

  // handle logout button
  const handleLogout = (async) => {
    localStorage.clear();
    navigate("/");
  };

  const removeStop = async (stopId, direction) => {
    try {
      await axios.delete(
        `http://localhost:9000/user/${user.id}/favStops/${stopId}?direction_name=${direction}`
      );
      setFavoriteStops(favoriteStops.filter((stop) => stop.stop_id !== stopId));
    } catch (error) {
      console.error("Error removing stop:", error);
    }
  };

  const getFavoriteStops = async (userId) => {
    const data = await axios.get(
      `http://localhost:9000/user/${userId}/favStops`
    );
    setFavoriteStops(data.data);
    console.log(favoriteStops);
  };

  useEffect(() => {
    getFavoriteStops(user.id);
  }, []);

  if (!user)
    return (
      <div>
        <h4>Log in to view this page.</h4>
      </div>
    );
  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="6" className="mb-4 mb-lg-0">
            <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
              <Row className="g-0">
                <Col
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="100" height="100" fill="#fff" />
                    <circle cx="50" cy="50" r="45" fill="#aaa" />
                    <text
                      x="50"
                      y="55"
                      font-size="30"
                      fill="#fff"
                      text-anchor="middle"
                      dominant-baseline="middle"
                    >
                      {user.username ? user.username[0].toUpperCase() : "Guest"}
                    </text>
                  </svg>
                </Col>
                <Col md="8">
                  <Card.Body className="p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Username</h6>
                        <p className="text-muted">{user.username}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Header>
                <h5>Favorite Stops</h5>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Direction</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {favoriteStops.map((stop) => (
                      <tr key={stop._id}>
                        <td>{stop.name}</td>
                        <td>{stop.direction_name}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              removeStop(stop.stop_id, stop.direction_name)
                            }
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
          <Row className="mt-5">
            <Col>
              {favoriteStops.length !== 0 && (
                <>
                  <h5>Favorite Stops Map</h5>
                  <div style={{ height: "400px", width: "100%" }}>
                    <MapComponent favoriteStops={favoriteStops} />
                  </div>
                </>
              )}
            </Col>
          </Row>
        <Row>
          <div class="col-md-12 text-center">
            <>
              <Button className="me-2" onClick={handleShow}>
                Log Out
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Log Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleLogout}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>
          </Row>
    </section>
  );
};

export default PrivateUserProfile;
