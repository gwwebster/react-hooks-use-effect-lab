import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  // add to component scope so you can clear timeout within handleAnswer
  const timeoutId = setTimeout(() => setTimeRemaining(timeRemaining => timeRemaining - 1), 1000);

  // useEffect
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10)
      onAnswered(false)
      clearTimeout(timeoutId)
    }
   
    // cleanup function -- only runs when component is unmounted
    return function cleanup() {
      clearTimeout(timeoutId)
    }
  }, [question, onAnswered, timeRemaining, timeoutId]);


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    clearTimeout(timeoutId)
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
