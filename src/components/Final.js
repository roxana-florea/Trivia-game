import React from "react";
import Button from "@material-ui/core/Button";

const Final = ({ score, again }) => {
  return (
    <>
      {score > 7 ? (
        <h1>Congratulations! Your score is {score}</h1>
      ) : (
        <h1>Try harder next time! Your score is {score}</h1>
      )}
      <Button variant="outlined" size="medium" color="primary" onClick={again}>
        Play again
      </Button>
    </>
  );
};

export default Final;
