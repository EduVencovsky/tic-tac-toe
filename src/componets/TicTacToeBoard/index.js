import React from 'react'
import PropTypes from 'prop-types'

import Square from '../Square'
import { SquareRow } from './styles'

export default function TicTacToeBoard({ matrix, width, height, onClick }) {
  return (
    <div style={{ width, height }}>
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

TicTacToeBoard.defaultProps = {
  width: '500px',
  height: '500px',
}

TicTacToeBoard.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
}
