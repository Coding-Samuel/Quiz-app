import { useState,useCallback } from "react";
import QUESTIONS from "../questions";
import quizIsCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz(){
    const [userAnswers, setUserAnswers]  = useState([]);const activeQuestionIndex = userAnswers.length;
    
    
    const quizIsComplete = activeQuestionIndex  === QUESTIONS.length;
    
    function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswer) =>  [...prevUserAnswer, selectedAnswer]);
    }    

    const handleSkipAnswer = useCallback(()=> {handleSelectAnswer(null)}, [handleSelectAnswer])
    if (quizIsComplete){
        console.log("Quiz completed");
        
        return <div id="summary">
            <h2>Quiz Completed</h2>
            <img src={quizIsCompleteImg} alt="Trophy Icon" />
        </div>
    }
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(()=> Math.random()-0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer =>( <li key={answer} className="answer">
                        <button onClick={()=> handleSelectAnswer(answer)}>{answer}</button>
                    </li>))}
                </ul>
            </div>
        </div>
    );
}