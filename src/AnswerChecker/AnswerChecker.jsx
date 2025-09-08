
function AnswerChecker({onCheck, onStreak, answer, guess}){

    let correct = null;

    if(answer === guess){
        onCheck(true);
        correct = true;
        onStreak(); // increment streak
    }else{
        onCheck(false);
    }
    
    
    return(
        <div>
            {correct ? <p>CORRECT!</p> : <p>Wrong..</p>}
        </div>
    );

}


export default AnswerChecker