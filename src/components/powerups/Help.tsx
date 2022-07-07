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
  const [hintDisabled, setHintDisabled] = useState(false)

  const getGreenGuess = () => {
    let randomIndex = Math.floor(Math.random() * solution.length)
    let randomCharacater = solution.charAt(randomIndex)
    return { character: randomCharacater, index: randomIndex }
  }

  const randomGreen = () => {
    setHintDisabled(true)
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
    setHintDisabled(true)
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

  const getDefinition = async () => {
    setHintDisabled(true)
    const response = await fetch(
      'https://api.dictionaryapi.dev/api/v2/entries/en/' + solution
    )
    const json = await response.json()
    console.log(json)
    const defList = json[0].meanings[0].definitions
    let definition: any = ''
    console.log(defList)
    defList.forEach((def: any) => {
      definition += def.definition + '\n'
      console.log(def)
    })
    alert(defList[0].definition)
  }

  return (
    <div className="bg-slate-100 grid ">
      <div className="flex  justify-center">
        <button
          type="button"
          disabled={hintDisabled}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:hover:none"
          onClick={randomGreen}
        >
          Random Green
        </button>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Placed Green
        </button> */}
        <button
          disabled={hintDisabled}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  disabled:opacity-50"
          onClick={randomYellow}
        >
          Random Yellow
        </button>
        <button
          disabled={hintDisabled}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          onClick={getDefinition}
        >
          Definition
        </button>
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
