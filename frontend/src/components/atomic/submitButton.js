import React from 'react';
import { Button } from 'react-bootstrap';

function SubmitButton(props) {
  const { disabled, text, onClick } = props;

  return (
    <Button variant="primary" type="submit" disabled={disabled} onClick={onClick}>
      {text}
    </Button>
  );
}

export default SubmitButton;