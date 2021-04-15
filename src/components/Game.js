import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Timer, Container} from '../styled-components';
import { v4 as uuidv4 } from 'uuid';


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
              key={uuidv4()}
              disabled={timer > 0 ? false : true}
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
