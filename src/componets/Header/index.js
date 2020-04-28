import React, { useState, useRef } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import InfoIcon from '@material-ui/icons/Info'


export default function Header({ isUserTurn, gameOver, onReset }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const anchorEl = useRef(null);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <IconButton
          onClick={() => setIsInfoOpen(true)}
          ref={anchorEl}
          color="primary">
          <InfoIcon />
        </IconButton>
        <Popover
          open={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
          anchorEl={anchorEl && anchorEl.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div>
            <ul>
              <li>Eduardo Vencovsky 201710281 </li>
              <li>Igor Prata 201710277 </li>
              <li>Vitor Facioli 201710292 </li>
            </ul>
            <h3>Rules</h3>
            <ul>
              <li>Same as Tic Tac Toe</li>
              <li>Players only play with X</li>
              <li>The player that wins in the rules of Tic Tac Toe, loses.</li>
            </ul>
          </div>
        </Popover>
      </div>
      <div style={{ flex: 1 }}>
        <p>
          {isUserTurn ? (gameOver ? 'Computer Wins' : 'User Turn') : (gameOver ? 'User Wins' : 'Computer Turn')}
        </p>
      </div>
      <div>
        <Button
          style={{ visibility: gameOver ? "visible" : "hidden" }}
          color="primary"
          variant="contained"
          onClick={onReset}
        >
          Restart
          </Button>
      </div>
    </div>
  )
}
