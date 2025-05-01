import React from 'react';
import Letter from './components/letter'

export function App(props) {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getRandomLetter = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];

  function generateBoard(){
    const array = []
    for (let i = 0; i < 16; i++){
      array.push(getRandomLetter())
    }
    return array
  }

  function addLetterToWord(index){
    if (!selectedIndices.includes(index)){
      setSelectedIndices(prevState => [...prevState, index])
    }
  }

  function getCurrentWord(){
    let currentWord = ""
    for (let i = 0; i < selectedIndices.length; i++){
      currentWord += gameLetters[selectedIndices[i]]
    }
    return currentWord
  }

  async function addWord(word) {
    if (word.length > 2){
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`)
      if (response.ok && !foundWords.includes(word)){
        setGameScore(currGameScore => {
          if (word.length === 3){
            return currGameScore + 1
          }
          else if (word.length === 4){
            return currGameScore + 2
          }
          else if (word.length === 5){
            return currGameScore + 3
          }
          else{
            return currGameScore + word.length
          }
        })
        setFoundWords([...foundWords, word])
      }
      setSelectedIndices([])
    }
  }

  function resetGame(){
    setGameLetters(() => generateBoard())
    setSelectedIndices([])
    setFoundWords([])
    setGameScore(0)
  }

  const [gameLetters, setGameLetters] = React.useState(() => generateBoard())
  const [selectedIndices, setSelectedIndices] = React.useState([])
  const [foundWords, setFoundWords] = React.useState([])
  const [gameScore, setGameScore] = React.useState(0)
  
  const gameKeys = gameLetters.map((letter, index) => {
    return (<Letter 
              key={index} 
              value={letter}
              index={index}
              addLetterToWord={addLetterToWord}
              selected={selectedIndices.includes(index)}
            />)
  })
  
  const displayFoundWords = foundWords.map((word, index) => <span key={index}>{word}</span>)

  const currentWord = getCurrentWord()

  return (
    <div className='App'>
      <main>
        <header>
          <h1>Word Grid Shuffle</h1>
          <h2>Game score: {gameScore}</h2>
        </header>
      <section className='Board'>
        {gameKeys}
      </section>
      <section className="bottomContent">
        <span className='wordDisplay'>
          <h3>Selected word:</h3>
          <p>{currentWord}</p>
        </span>
        <button id='submitWordButton' onClick={() => addWord(currentWord)}>Submit Word</button>
        <h3>Found words</h3>
        {foundWords.length > 0 &&
          <section className="foundWords">
            {displayFoundWords}
          </section>
        }
        <button id='resetGameButton' onClick={() => resetGame()}>Reset Game</button>
      </section>
      </main>
    </div>
  );
}

// Log to console
console.log('Hello console')