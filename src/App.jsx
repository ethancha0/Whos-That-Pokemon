import { useState } from 'react'

import Input from './Input/Input'
import SpriteRNG from './SpriteRNG/SpriteRNG'
import GameOver from './GameOver/GameOver'



function App() {
  
  const[answer, setAnswer] = useState(null);
  const[guess, setGuess] = useState(null);
  const[check, setCheck] = useState(null);

  const[refreshKey, setRefreshKey] = useState(0);
  const[streak, setStreak] = useState(0);
  const[lastStreak, setLastStreak] = useState(0); //used to keep track of score before reset
  const[gameOver, setGameOver] = useState(false);
  const[showAnswer, setShowAnswer] = useState(false);
  const[guessCorrect, setGuessCorrect] = useState(null);
  const[newPokemon, setNewPokemon] = useState(false); // tells if pokemon was just guessed. 

  const[userName, setUserName] = useState('');

  function handleGuess(guess){
    if(answer === guess){
      setStreak(prev => prev + 1);
      setShowAnswer(true);
      setGuessCorrect(true);
      setNewPokemon(true); // allows next pkm button to work 
      //setRefreshKey((prev) => (prev + 1))

    }else{
      setLastStreak(streak);
      setStreak(0);
      setShowAnswer(true);
      setGameOver(true);
      setGuessCorrect(false);
      

      
    }
  }

  function changePokemon(){
   
    if(!newPokemon) return;

    setRefreshKey((prev) => (prev + 1));
    setShowAnswer(false);
    setNewPokemon(false);
  }


  // gives feedback for every run 
  let feedback;

  if(guessCorrect === null){
    feedback = null;
  }
  else if(guessCorrect){
    feedback = (<div>
                  <p>CORRRRECT!</p>
                  <button onClick={changePokemon}>Next Pokemon</button>
                </div>);
  }
  else if(!guessCorrect){
    feedback=(      <div>
          <p>WrOnG</p>
          <GameOver 
          answer={answer} 
          streak={lastStreak}
          onSave={HandleSave}
          onPlayAgain={resetGame}
           />
           
        </div>);
        
        
      }
      else{
      feedback = (<p>error....</p>);
      }


  //Saves user data into leaderboard
  function HandleSave(userName, streak){
    console.log([userName, streak])
  }

  //resets game 
  function resetGame(){
    setStreak(0);
    setGameOver(false);
    setShowAnswer(false);
    setGuessCorrect(null);
    setNewPokemon(false);
    setRefreshKey(prev => prev + 1);
  }

  return (
    <>

      
      <SpriteRNG 
        onAnswer={(poke) => setAnswer(poke)}
        refreshKey={refreshKey}
        reveal = {showAnswer}
        />

      <Input 
      onSubmitGuess={
        (guess) => {
          setGuess(guess) // save guess to state
          handleGuess(guess) // check if guess is correct
          }}/> 

      
      
      <p>{feedback}</p>
      {streak === 0 ? null : <p>Streak: {streak}</p>}
         
    </>
  )
}

export default App
