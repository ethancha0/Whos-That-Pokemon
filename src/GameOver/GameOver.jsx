import {useState} from 'react';
import styles from './GameOver.module.css';

function GameOver({answer, streak, onSave, onPlayAgain}){

    const[userName, setUserName] = useState('');

    function HandleSubmit(){

        onSave(userName, streak);

    }

    return(
        <div className={styles.gameOverContainer}>
            <p className={styles.gameOverText}>
                Nice try, it was actually <span className={styles.answerText}>{answer}</span>.<br></br>
                You had a streak of <span className={styles.streakText}>{streak}</span>.<br></br> <br></br>
                Please enter a username for the leaderboard:
            </p>

            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Enter name"
                    className={styles.userNameInput}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && HandleSubmit()}
                />

                <div className={styles.buttonContainer}>
                    <button className={styles.gameButton} onClick={HandleSubmit}>Save</button>
                    <button className={`${styles.gameButton} ${styles.playAgainButton}`} onClick={onPlayAgain}>Play Again</button>
                </div>
            </div>
        </div>
    );


}

export default GameOver