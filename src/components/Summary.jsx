import quizIsCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";


export default function Summary({ userAnswers }){
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer,index) => QUESTIONS[index].answers[0] === answer);

    const skippedAnswersShare = Math.floor((skippedAnswers.length/userAnswers.length)*100);

    const correctAnswersShare = Math.floor((correctAnswers.length/userAnswers.length)*100);
    
    const wrongAnswersShare = 100 - correctAnswersShare;
    return( 
    <div id="summary">
            <h2>Quiz Completed</h2>
            <img src={quizIsCompleteImg} alt="Trophy Icon" />
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersShare}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <span className="text">Answered Correctly </span>
                </p>
                <p>
                    <span className="number">{wrongAnswersShare}%</span>
                    <span className="text">Answered Incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index)=>{ 
                    let cssClass = "user-answer";

                    if(answer === null){
                        cssClass += "  skipped";
                    }else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += " correct";
                    }else{
                        cssClass += "wrong"
                    }
                    return( <li key={index}>
                    <h3>{index + 1}</h3>
                    <p className="question">{QUESTIONS[index].text}</p>
                    <p className="user-answer">{answer ?? "Skipped"} </p>
                </li>)}
            )}
            </ol>
        </div>
    );
}