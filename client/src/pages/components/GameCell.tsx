import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import GameClass from '../GameClass';
import HintsCell from './HintsCell';

import {setFocus} from '../../redux/actions/gameActions';

import './styles/GridCell.css';

interface Props {
  cell: GridCell
  grid: GameClass
  focus: number
  hintStyle: 'default' | 'inverse'
  setFocus: (n: number) => void
  handleTurn: (cell: GridCell, value: number) => void
}

const ValueCell: React.FC<Props> = (P) => {
  return (
    <div className='cell-value'>
      {P.cell.value}
    </div>
  )
}

const InputCell: React.FC<Props> = (P) => {
  return (
    <input
    type='number'
    value={P.cell.value}
    onChange={(evt) => {
      let value = parseInt(evt.currentTarget.value);
      evt.currentTarget.value = value.toString();
      P.handleTurn(P.cell, value);
    }}
    disabled={P.cell.value !== 0}
    />
  )
}

const GameCell: React.FC<Props> = (P) => {
  console.log('test');

  useEffect( () => {}, [] );
  // onClick={() => P.setFocus(P.cell.index)}
  return (
    <div className={`grid-cell grid-cell-size-${P.grid.n} player-${P.cell.player}`}
    onClick={() => {P.setFocus(P.cell.index)}}
    >
      {
      P.focus === P.cell.index ? <InputCell {...P}/> 
      : 
      P.cell.value === 0 ? <HintsCell {...P}/> 
      : 
      <ValueCell {...P}/> 
      }
    </div>
  )
}

export default connect(null, {setFocus})(GameCell);