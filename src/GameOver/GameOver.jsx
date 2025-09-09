import {useState} from 'react';


function GameOver({answer, streak, onSave, onPlayAgain}){

    const[userName, setUserName] = useState('');

    function HandleSubmit(){

        onSave(userName, streak);

    }

    return(
        <div>
            <p>
                Nice try, it was actually {answer}.<br></br>
                You had a streak of {streak}.<br></br> <br></br>
                Please enter a username for the leaderboard:

            </p>

                <input
                    type="text"
                    placeholder="Enter name"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                 ></input>

                <button onClick={HandleSubmit}>Save</button>

                <button onClick={onPlayAgain}>Play Again</button>
            
        </div>
    );


}

export default GameOver