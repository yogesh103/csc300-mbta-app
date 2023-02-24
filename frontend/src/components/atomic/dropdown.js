import React from 'react';
import { Dropdown } from 'react-bootstrap';

function DropDown(props) {
  const { options, onSelect } = props;

  const dropdownOptions = options.map((option, index) => (
    <Dropdown.Item key={index} eventKey={option}>
      {option}
    </Dropdown.Item>
  ));

  return (
    <Dropdown onSelect={onSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select an option
      </Dropdown.Toggle>

      <Dropdown.Menu>{dropdownOptions}</Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;