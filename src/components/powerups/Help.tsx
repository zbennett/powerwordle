import { useState } from 'react'
import { CompletedRow } from '../grid/CompletedRow'
import { EmptyRow } from '../grid/EmptyRow'

type Props = {
  solution: string
  guesses: string[]
}

export const Help = ({ solution, guesses }: Props) => {
  const [isRevealing, setIsRevealing] = useState(false)
  const [hintString, setHintString] = useState('     ')
  const [showHint, setShowHint] = useState(false)
  const [greenIndex, setGreenIndex] = useState(0)

  const getGreenGuess = () => {
    let randomIndex = Math.floor(Math.random() * solution.length)
    let randomCharacater = solution.charAt(randomIndex)
    return { character: randomCharacater, index: randomIndex }
  }

  const randomGreen = () => {
    let greenGuess // = getGreenGuess()

    let randomString = ''

    do {
      greenGuess = getGreenGuess()
      console.log(greenIndex, solution.length)
    } while (
      hintString.charAt(greenGuess.index) !== ' ' &&
      greenIndex < solution.length
    )

    for (let index = 0; index < solution.length; index++) {
      if (index === greenGuess.index) {
        randomString += greenGuess.character
      } else {
        if (hintString.charAt(index) !== ' ') {
          randomString += solution.charAt(index)
        } else {
          randomString += ' '
        }
      }
    }

    setShowHint(true)
    setIsRevealing(true)
    setTimeout(() => {
      setIsRevealing(false)
    }, 350 * solution.length)

    setHintString(randomString)
    setGreenIndex(greenIndex + 1)
  }

  const randomYellow = () => {
    let greenGuess = getGreenGuess()

    let randomString = ''
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * solution.length)
    } while (
      randomIndex === greenGuess.index ||
      solution.charAt(randomIndex) === greenGuess.character
    )

    for (let index = 0; index < solution.length; index++) {
      if (index === randomIndex) {
        randomString += greenGuess.character
      } else {
        randomString += ' '
      }
    }

    setShowHint(true)
    setIsRevealing(true)
    setTimeout(() => {
      setIsRevealing(false)
    }, 350 * solution.length)

    setHintString(randomString)
  }

  return (
    <div className="bg-slate-100 grid ">
      <div className="flex  justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={randomGreen}
        >
          Random Green
        </button>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Placed Green
        </button> */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={randomYellow}
        >
          Random Yellow
        </button>
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={newWord}
        >
          New Word
        </button> */}
      </div>
      <div>
        {showHint && (
          <CompletedRow
            solution={solution}
            guess={hintString}
            isRevealing={isRevealing}
          />
        )}
      </div>
    </div>
  )
}
