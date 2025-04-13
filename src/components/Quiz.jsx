import { useState,useCallback } from "react";
import QUESTIONS from "../questions";
import quizIsCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz(){
    const [userAnswers, setUserAnswers]  = useState([]);
    const [answerState,setanswerState] = useState("");
    const activeQuestionIndex =  userAnswers.length;
    
    const quizIsComplete = activeQuestionIndex  === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswer) =>  [...prevUserAnswer, selectedAnswer]);
        
    },[activeQuestionIndex]);

    const handleSkipAnswer = useCallback(()=> {handleSelectAnswer(null)}, [handleSelectAnswer])
    if (quizIsComplete){
        console.log("Quiz completed");
        
        return <div id="summary">
            <h2>Quiz Completed</h2>
            <img src={quizIsCompleteImg} alt="Trophy Icon" />
        </div>
    }

    return (
        <div id="quiz">
            <Question 
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer = {handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}/>
        </div>
    );
}