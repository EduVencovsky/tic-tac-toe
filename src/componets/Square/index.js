import React from 'react'
import PropTypes from 'prop-types'

import { SquareBox } from './styles'

export const SquareType = {
  x: 1,
  o: 2,
}

export default function Square({ value, i, j, onClick }) {
  return (
    <SquareBox {...{ i, j, onClick }}>
      <h1>
        {value === SquareType.x ? 'X' : value === SquareType.o ? 'O' : ''}
      </h1>
    </SquareBox>
  )
}

Square.propTypes = {
  i: PropTypes.number.isRequired,  
  j: PropTypes.number.isRequired,  
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,  
}
