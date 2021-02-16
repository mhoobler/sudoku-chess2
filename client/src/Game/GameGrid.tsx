import React, {useRef} from 'react'
import { connect } from 'react-redux';
 
import InputCell from './InputCell';
import HintCell from './HintCell';

import { setFocus } from '../redux/actions/gameActions';

import './styles/GameCell.css';

type Props = {
  players: number[]
  values: number[]
  errors: number[]
  focus: number
  hintStyle: 'default' | 'inverse'
  handleTurn: (i: number, v: number) => void
  setFocus: (n: number) => void
}

const GameGrid: React.FC<Props> = (P) => {
  const n = Math.sqrt(Math.sqrt(P.values.length));

  // This function returns a string that gets added to the grid-cell's class
  const getBorders = (i: number) => {
    let col = i % n;
    let row = ~~( i / (n * n) ) % n; 
    let str = '';

    // is the cell at the VERY left
    if(i % (n*n) === 0 ) { str +='left ' };
    // is the cell on the right side of a box
    if(col === n-1) { str += 'right ' };
    // is the cell at the VERY top
    if( ~~( i / (n * n) ) === 0) { str += 'top ' };
    // is the cell on the bottom of a box
    if(row === n-1) { str += 'bottom ' };
    return str;
  }

  let errSet = new Set(P.errors);

  return (
    <div className={`grid-container-${n}`}>
      {
        P.values.map( (value: number, index: number) => {
          return (
            <div
            key={index}
            className={`grid-cell ${getBorders(index)}cell-size-${n} player-${P.players[index]} ${errSet.has(index) ? 'cell-error' : ''}`}
            onClick={() => P.setFocus(index)}>
              {/* If player input was blocked, add a dot to highlight this is causing the block */}
              {errSet.has(index) ? <div className='error-dot'><div></div></div> : null }
        
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