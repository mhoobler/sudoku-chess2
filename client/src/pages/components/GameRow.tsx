import React, {useEffect} from 'react';

import GameClass from '../GameClass';
import GameCell from './GameCell';

import './styles/GridRow.css';

type Props = {
  row: GridRow
  grid: GameClass
  handleTurn: (cell: GridCell, value: number) => void
  hintStyle: 'default' | 'inverse',
  focus: number
}

const GameRow: React.FC<Props> = (P) => {

  useEffect( () => {}, [] );
  return (
    <div className='grid-row'>
      {P.row.map( (e: GridCell, i: number) => {
        return (
        <GameCell
        key={i}
        grid={P.grid}
        cell={e}
        focus={P.focus}
        hintStyle={P.hintStyle}
        handleTurn={P.handleTurn}
        />)
      })}
    </div>
  )
}

export default GameRow;