import { useState,useCallback } from "react";
import QUESTIONS from "../questions";
import quizIsCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz(){
    // const  = useRef();
    const [userAnswers, setUserAnswers]  = useState([]);
    const [answerState,setanswerState] = useState("");
    const activeQuestionIndex = answerState === ""?userAnswers.length: userAnswers.length - 1;
    
    const quizIsComplete = activeQuestionIndex  === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setanswerState("answered");
        setUserAnswers((prevUserAnswer) =>  [...prevUserAnswer, selectedAnswer]);

        setTimeout(()=> {
            if (QUESTIONS[activeQuestionIndex].answers[0] === selectedAnswer){
                setanswerState("correct");
                console.log("correct");
                
            }else{
                setanswerState("wrong");
                console.log("wrong");
            }
            setTimeout(()=> {
                setanswerState("");
            },2000)
        }, 1000)

        console.log(selectedAnswer);
        console.log(QUESTIONS[activeQuestionIndex].answers[0]);
        
        
        
    },[activeQuestionIndex]);

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
                    {shuffledAnswers.map(answer =>{
                        let isSelected = userAnswers[userAnswers.length - 1] === answer ;
                        let cssClass = "";
                        if (answerState === "answered" && isSelected){
                            cssClass = "selected"
                        }
                        if ((answerState === "correct" || answerState === "wrong") && isSelected){
                            cssClass = answerState
                        }
                        return(
                            <li key={answer} className="answer">
                        <button className={cssClass}onClick={()=> handleSelectAnswer(answer)}>{answer}</button>
                    </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}