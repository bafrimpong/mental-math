import React from 'react';

const GameResults = (props) =>{
  return(
    <span className="text">
      Your Score: {props.correctAnswersCount} / {props.questionsCount}
    </span>
  );
}

export default GameResults;