import React, {useState, useEffect} from "react";
import styles from './SpriteRNG.module.css'

function SpriteRNG({onAnswer, refreshKey, reveal}){

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
    
    //call RNG
    let currPokemon = gen1();

    fetch(`https://pokeapi.co/api/v2/pokemon/${currPokemon}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error("Error fetching pokemon:", error));
  }, [refreshKey]); // reruns when key tells us to


    //generation 1: 151 pokemon 
    const gen1 = () =>{
        return (Math.floor(Math.random() * 151) + 1)
    };

    //send data back to parent func.
    useEffect(() =>{
        if(pokemon){
            onAnswer(pokemon.name);
        }
    },[pokemon, onAnswer]); // react looks at the values here. when changed, re-run effect
   

    return(
        <div className={styles.spriteContainer}>
            
            {pokemon ? 
            (<img className = {reveal ? styles.normal :  styles.silhouette} src = {pokemon.sprites.front_default}/>) :
            (<p className={styles.loading}>Pokemon Loading...</p>)}
            
        </div>
       
    );



}


export default SpriteRNG