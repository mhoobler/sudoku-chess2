import React, {useRef} from 'react'
import { connect } from 'react-redux';
 
import InputCell from './InputCell';
import HintCell from './HintCell';

import { setFocus } from '../redux/actions/gameActions';

type Props = {
  players: number[]
  values: number[]
  focus: number
  hintStyle: 'default' | 'inverse'
  handleTurn: (i: number, v: number) => boolean
  setFocus: (n: number) => void
}

const GameGrid: React.FC<Props> = (P) => {
  const n = Math.sqrt(Math.sqrt(P.values.length))

  return (
    <div className={`grid-container-${n}`}>
      {
        P.values.map( (value: number, index: number) => {
          return (
            <div
            key={index}
            className={`grid-cell cell-size-${n} player-${P.players[index]}`}
            onClick={() => P.setFocus(index)}>
        
              {P.focus === index || value > 0 ? 
                <InputCell
                player={P.players[index]}
                value={value}
                index={index}
                n={n}
                handleTurn={P.handleTurn}
                />
              :
                <HintCell index={index} n={n} values={P.values}/>
              }
        
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    focus: state.game.focus,
    hintStyle: state.game.hintStyle
  }
}

export default connect(mapStateToProps, {setFocus})(GameGrid);