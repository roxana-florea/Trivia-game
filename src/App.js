import { useState, useEffect } from "react";
import Axios from "axios";
import Start from "./components/Start";
import Game from "./components/Game";
import Final from "./components/Final";
import TimesUp from "./components/TimesUp";
import { shuffle } from "lodash";
import click from "./components/audio/clicksoundeffect.mp3";

var sound = new Audio(click);

function App() {
  const [questions, getQuestions] = useState([]);
  const [start, setStart] = useState(true);
  const [chosenQuestion, setChosenQuestion] = useState([]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [page, setPage] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [counter, setCounter] = useState(10);

 
    const fetchData = async () => {
      const result = await Axios(
        "https://opentdb.com/api.php?amount=30&difficulty=easy&type=multiple"
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
    setStart(false);
    getOneQuestion();
    setTimerActive(true);
    setCounter(10);
    playSound();
  };

  const getOneQuestion = () => {
    const removeUselessChar = (str) =>
      str
        .split("&quot;")
        .join("")
        .split("&#039;")
        .join("")
        .split("&eacute;")
        .join("")
        .split("&amp")
        .join("")
        .split("&rsquo;")
        .join("")
        .split("&iacute;")
        .join("");
    const randomObject =
      questions[Math.floor(Math.random() * questions.length)];
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
      setGameOver(true);
      setTimerActive(false);
    }
    getOneQuestion();
    setCounter(10);
    playSound();
  };

  const playAgain = () => {
    fetchData();
    setStart(true);
    setScore(0);
    setPage(1);
    setGameOver(false);
    playSound();
  };

  useEffect(() => {
    const timer =
      counter > 0 &&
      timerActive &&
      setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter, timerActive]);

  return (
    <div>
      {start ? (
        <Start action={startGame} />
      ) : (
        !gameOver && (
          <Game
            number={page}
            question={question}
            answers={answers}
            isCorrect={isCorrect}
            score={score}
            timer={counter > 0 ? counter : <TimesUp action={isCorrect} />}
          />
        )
      )}

      {gameOver && <Final score={score} again={playAgain} />}
    </div>
  );
}

export default App;
