import {useState} from 'react';

function Input({onSubmitGuess}){

    const [guess, setGuess] = useState(""); //track user input

    const handleSubmit = () =>{
        if(!guess.trim()) return;
        onSubmitGuess(guess) // pass guess back to parent by calling prop as a func.
        setGuess(""); // clear input
    };

    return(

        <div>

            <input 
            type="text" 
            placeholder="Guess Here"
            id='userInput'
            value = {guess}
            onChange={(e) => setGuess(e.target.value)} // update state
            />
             


            <button id='submit-btn' onClick={handleSubmit}>Submit</button>
            
        </div>


    );



}


export default Input