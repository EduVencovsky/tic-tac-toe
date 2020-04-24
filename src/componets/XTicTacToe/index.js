import React, { useState, useEffect } from 'react'
import { SquareType } from '../Square'
import { updateMatrix, delay, randomBool } from '../../utils'
import TicTactToeBoard from '../TicTacToeBoard'

const { x, none } = SquareType

export default function XTicTacToe() {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill(none)))
  const [round, setRound] = useState(0)
  const [isUserTurn, setIsUserTurn] = useState(() => randomBool())

  useEffect(() => {
    if(!round && !isUserTurn)
      delay(() => computerMove())
  }, [round, isUserTurn])

  const computerMove = () => {
    console.log('computer move')
    setIsUserTurn(true)
  }

  const onClick = ({ value, i, j }) => {
    if (value !== x && isUserTurn) {
      setMatrix(updateMatrix(x, i, j))
      setIsUserTurn(false)
      delay(() => computerMove())
    }
  }

  return (
    <div>
      <p>
        {isUserTurn ? 'User Turn' : 'Computer Turn'}
      </p>
      <TicTactToeBoard {...{ matrix, onClick }} />
    </div>
  )
}
