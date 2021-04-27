import { useState, useEffect } from "react";
import Axios from "axios";
import Start from "./components/Start";
import Game from "./components/Game";
import Final from "./components/Final";
import TimesUp from "./components/TimesUp";
import { shuffle, random } from "lodash";
import click from "./components/audio/clicksoundeffect.mp3";
import { Container } from './styled-components';

var sound = new Audio(click);

function App() {
  const [questions, getQuestions] = useState([]);
  const [gameStatus, setGameStatus] = useState('Start');
  const [chosenQuestion, setChosenQuestion] = useState([]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [page, setPage] = useState(1);
  const [timerActive, setTimerActive] = useState(false);
  const [counter, setCounter] = useState(0);
 
    const fetchData = async () => {
      const result = await Axios(
        "https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple"
      );
      getQuestions(result.data.results);
    };
   
  
  useEffect(() => {
    fetchData()
  }, []);


  const playSound = () => {
    sound.play();
  };

  const startGame = () => {
    setGameStatus('Play');
    getOneQuestion();
    setTimerActive(true);
    setCounter(15);
    playSound();
  };
  const removeUselessChar = str => str.replace(/(?:&.{4,6};)/g,'');


  const getOneQuestion = () => {
    const randomObject = questions[random(questions.length)];
    const question = randomObject.question;
    const answers = [];
    answers.push(removeUselessChar(randomObject.correct_answer));
    randomObject.incorrect_answers.forEach((answer) =>
      answers.push(removeUselessChar(answer))
    );
    setChosenQuestion(randomObject);
    setQuestion(removeUselessChar(question));
    setAnswers(shuffle(answers));
  };

  const isCorrect = (key) => {
    answers[key] === chosenQuestion.correct_answer
      ? setScore(score + 1)
      : setScore(score + 0);
    setPage(page + 1);

    if (page === 15) {
      setGameStatus('GameOver');
      setTimerActive(false);
    }
    getOneQuestion();
    setCounter(15);
    playSound();
  };

  const playAgain = () => {
    fetchData();
    setGameStatus('Start');
    setScore(0);
    setPage(1);
    playSound();
  };

  useEffect(() => {
    const timer = counter > 0 && timerActive &&
      setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter, timerActive]);

  return (
    <Container>
       {
         gameStatus === 'Start' &&
         <Start action={startGame} />
       }
        {
          gameStatus === 'Play' &&
          <Game
          number={page}
          question={question}
          answers={answers}
          isCorrect={isCorrect}
          score={score}
          timer={counter > 0 ? counter : <TimesUp action={isCorrect} />}
        />
        }
        
      {gameStatus === 'GameOver' && <Final score={score} again={playAgain} />}
    </Container>
  )
}

export default App;
