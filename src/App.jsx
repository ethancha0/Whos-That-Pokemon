import { useState } from 'react'

import Input from './Input/Input'
import SpriteRNG from './SpriteRNG/SpriteRNG'
import AnswerChecker from './AnswerChecker/AnswerChecker'


function App() {
  
  const[answer, setAnswer] = useState(null);
  const[guess, setGuess] = useState(null);
  const[check, setCheck] = useState(null);
  
  const[streak, setStreak] = useState(0);

  return (
    <>

      
      <SpriteRNG 
        
        onAnswer={(poke) => setAnswer(poke)}/>

      <Input onSubmitGuess={(guess) => setGuess(guess)} />

      <AnswerChecker 
        onCheck={(check) => setCheck(check)}
        onStreak={() => setStreak(prev => prev + 1)}
        answer = {answer}
        guess = {guess}
        
      />
      <p>{streak}</p>
    </>
  )
}

export default App
