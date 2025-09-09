import {useState} from 'react';
import styles from './Input.module.css';

function Input({onSubmitGuess}){

    const [guess, setGuess] = useState(""); //track user input

    const handleSubmit = () =>{
        if(!guess.trim()) return;
        onSubmitGuess(guess) // pass guess back to parent by calling prop as a func.
        setGuess(""); // clear input
    };

    return(

        <div className={styles.inputContainer}>

            <input 
            type="text" 
            placeholder="Guess Here"
            className={styles.inputField}
            value = {guess}
            onChange={(e) => setGuess(e.target.value)} // update state
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
             


            <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
            
        </div>


    );



}


export default Input