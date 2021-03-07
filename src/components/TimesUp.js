import React from "react";
import Button from "@material-ui/core/Button";

const TimesUp = ({ action }) => {
  return (
    <>
      <p>Time's up!</p>
      <Button
        variant="outlined"
        size="small"
        style={{ color: "#ff4e8e" }}
        onClick={action}
      >
        Next question
      </Button>
    </>
  );
};

export default TimesUp;
