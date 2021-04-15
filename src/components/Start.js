import React from "react";
import Button from "@material-ui/core/Button";

const Start = ({  action }) => {
  return (
    <>
      <h1>Welcome to Trivia Game!</h1>
      <Button variant="outlined" size="small" color="primary" onClick={action}>
        START
      </Button>
    </>
  );
};

export default Start;
