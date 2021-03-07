import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styled from "styled-components";

const Timer = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #ff4e8e;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Game = ({ question, answers, isCorrect, number, score, timer }) => {
  return (
    <>
      <h2>
        {number}.{question}
      </h2>
      <Container>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined primary button group"
        >
          {answers.map((answer, i) => (
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              key={i}
              onClick={() => isCorrect(i)}
            >
              {answer}
            </Button>
          ))}
        </ButtonGroup>

        <p>Score: {score}</p>
        <Timer>{timer}</Timer>
      </Container>
    </>
  );
};

export default Game;
