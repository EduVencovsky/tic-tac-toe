import styled from 'styled-components'

export const SquareBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: white;
  border-style: solid;
  border-width: 0px;
  border-bottom-width: ${props => props.i < 2 ? '2px' : '0px'};
  border-right-width: ${props => props.j < 2 ? '2px' : '0px'};
` 