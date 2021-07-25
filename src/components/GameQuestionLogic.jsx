import React, { Component } from 'react';
import GameResults from './GameResults';

class GameQuestionLogic extends Component {
  constructor(props){
    super(props);
    
    this.xValue = 0; // value for x
    this.yValue = 0; // value for y
    this.zValue = 0; // value for z
    this.pValue = 0; // value for p - system proposed answer
    this.questionsCount = 0;
    this.correctAnswersCount = 0;
    
    // run the function on app load
    this.generateQuestion();
    
    // binding of events
    this.handleOnClickOfButton = this.handleOnClickOfButton.bind(this);
    
    this.state = {
      x: this.xValue,
      y: this.yValue,
      z: this.zValue,
      p: this.pValue,
      questionsCount: this.questionsCount,
      answersCount: this.correctAnswersCount
    }
  }
  
  // generate questions and set state values
  generateQuestion = () => {
    this.xValue = Math.floor(Math.random() * 100);
    this.yValue = Math.floor(Math.random() * 100);
    this.zValue = Math.floor(Math.random() * 100);
    this.pValue = Math.floor(Math.random() * 3) + this.xValue + this.yValue + this.zValue;
    
    console.log('Gen Question', `x: ${this.xValue}, y: ${this.yValue}, z: ${this.zValue}, ans: ${this.pValue}`);
  }
  
  updateGameState = () => {
    this.setState((presentState) => ({
      x: this.xValue,
      y: this.yValue,
      z: this.zValue,
      p: this.pValue,
    }))
  }
  
  // check if the answers are correct
  markQuestionForCorrectAnswer = (answerFromUser) => {
    const correctAnswer = this.state.x + this.state.y + this.state.z;
    const systemAnswer = this.state.p;

    let finalAnswer;
    
    if(answerFromUser === 'false'){
      if(correctAnswer === systemAnswer){
        return false;
      } else {
        return true;
      }
    } else {
      if(correctAnswer !== systemAnswer){
        return false;
      } else {
        return true;
      }
    }

    return finalAnswer;
  }
  
  // when true or false button is clicked
  handleOnClickOfButton = (answer) => {
    const correctAnswer = this.markQuestionForCorrectAnswer(answer);
    
    // increment answersCount only when the answer is correct
    if(correctAnswer){
      this.setState((presentState) => ({
        answersCount: presentState.answersCount + 1
      }))
    };
    
    // increment questionsCount since it's always asking questions
    this.setState((presentState) => ({
      questionsCount: presentState.questionsCount + 1
    }));

    //this.markQuestionForCorrectAnswer(answer);  
    this.generateQuestion();
    this.updateGameState();
  }
  

  render(){
    return(
      <div className="game">
          <h2>Mental Math</h2>
          <div className="equation">
            <p className="text">{`${this.state.x} + ${this.state.y} + ${this.state.z} = ${this.state.p}`}</p>
          </div>
          <button onClick={() => this.handleOnClickOfButton('true')}>True</button>
          <button onClick={() => this.handleOnClickOfButton('false')}>False</button>
          <p className="text">
            <GameResults 
              correctAnswersCount={this.state.answersCount}
              questionsCount={this.state.questionsCount}
            />
          </p>
      </div>
    )
  }
}

export default GameQuestionLogic;