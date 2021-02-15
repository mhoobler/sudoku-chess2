import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setFocus } from '../redux/actions/gameActions';

import HintCell from './HintCell';

import './styles/GameCell.css';

type Props = {
  player: number
  value: number
  values: number[]
  index: number
  n: number
  isFocused: boolean
  handleTurn: (i: number, v: number) => void
  setFocus: (n: number) => void
}

const InputCell: React.FC<Props> = (P) => {

  useEffect( () => {
  }, [])

  return (
    <input
    type='number'
    min={0}
    max={P.n * P.n}
    disabled={P.value > 0}
    value={P.value}
    onChange={ (evt) => {
      let val = parseInt(evt.currentTarget.value);
      if(val > 0){
        P.handleTurn(P.index, val);
      }
    }
    }/>
  )
}

const GameCell: React.FC<Props> = (P) => {
  // console.log('test');
  return (
    <div 
    className={`grid-cell cell-size-${P.n} player-${P.player}`}
    onClick={() => P.setFocus(P.index)}>

      {P.isFocused ? 
        <InputCell {...P} />
      :
      P.value > 0 ?
        <InputCell {...P} />
      :
        <HintCell index={P.index} n={P.n} values={P.values}/>
      }

    </div>
  )

}


export default connect(null, {setFocus})(GameCell);