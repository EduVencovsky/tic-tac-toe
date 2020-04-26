import React from 'react'
import PropTypes from 'prop-types'

import Square from '../Square'
import { SquareRow } from './styles'
import useWindow from '../../hooks/useWindow'

export default function TicTacToeBoard({ matrix, onClick }) {

  const { width, height } = useWindow()
  const size = (width > height ? height : width) / 1.5

  return (
    <div style={{ width: size + 'px', height: size + 'px' }}>
      {matrix.map((x, i) =>
        <SquareRow key={i}>
          {x.map((value, j) => (
            <Square
              key={i + j}
              {...{ i, j, value }}
              onClick={() => onClick({ value, i, j })}
            />
          ))}
        </SquareRow>)}
    </div>
  )
}

TicTacToeBoard.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
}
