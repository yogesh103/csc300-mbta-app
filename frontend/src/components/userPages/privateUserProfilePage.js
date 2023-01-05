import React, { useState, useEffect, useContext } from "react";
import { Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";


//link to service
//http://localhost:8096/privateUserProfile

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setValues] = useState({ content: "" });
  const navigate = useNavigate();


  // handle logout button
  const handleLogout = (async) => {
    localStorage.clear();
    navigate("/");
  };

  // handle Edit User Information button
  const handleEditUser = (async) => {
    navigate("/editUserPage");
  };

  useEffect(() => {
    setUser(getUserInfo())
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...form, [input.id]: input.value });
  };


  // 	<span><b>{<FollowerCount username = {username}/>}</b></span>&nbsp;
  // <span><b>{<FollowingCount username = {username}/>}</b></span>;
  if (!user) return (<div><h3>You are not authorized to view this page, Please Login in <Link to={'/login'}><a href='#'>here</a></Link></h3></div>)
  return (
    <div class="container">
      <div class="col-md-12 text-center">
        <h1>{user && user.username}</h1>
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
      </div>
    </div>
  );
};

export default PrivateUserProfile;
