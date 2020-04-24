import React, { useState } from 'react'
import { SquareType } from '../Square'
import { updateMatrix } from '../../utils'
import TicTactToeBoard from '../TicTacToeBoard'

const { x } = SquareType

export default function XTicTacToe() {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill(false)))

  const onClick = ({ value, i, j }) => {
    if (value !== x)
      setMatrix(updateMatrix(x, i, j))
  }

  return (
    <div>
      <TicTactToeBoard {...{ matrix, onClick }} />
    </div>
  )
}
