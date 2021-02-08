import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Socket } from 'socket.io-client';

import GameClass, {allButTwo} from './GameClass';
import GameRow from './components/GameRow';
import GameScore from './components/GameScore';

import './styles/Game.css'


type Props = {
  board: Board
  conn: typeof Socket
  focus: number,
  hintStyle: 'default' | 'inverse'
}

const Game: React.FC<Props> = (P) => {
  const [grid, setGrid] = useState(new GameClass(P.board));
  // const [turnArr, setTurnArr] = useState<Turn[]>([]);

  useEffect( () => {
    console.log(grid.score);
    // let turnArr = allButTwo(grid.N, grid.board._id);
    let turnArr: Turn[] = [];

    P.conn.on('UPDATE_TURN', (message: any) => {
      console.log('TESTSETST');

      let ta = turnArr.concat(message.turnArr);
      console.log(ta);
      setGrid(new GameClass({...P.board, turnArr: ta}))
    })
  })

  const handleTurn = (cell: GridCell, value: number) => {
    console.log({
      index: cell.index,
      value: value
    })
    let x = grid.testInput(cell, value);
    console.log(x);

    if(x){
      let newTurnArr = [...grid.board.turnArr];
      let newTurn: Turn = {
        gameID: P.board._id,
        player: 1,
        index: cell.index,
        value: value
      }
      newTurnArr.push(newTurn);

      P.conn.emit('ADD_TURN', newTurn);
      // setTurnArr(newTurnArr);
      // setGrid(new GameClass({...P.board, turnArr: newTurnArr}));
    }

  }

  return (
    <div id='game-container'>
      
      <GameScore score={grid.score}/>

      <div className='grid-matrix'>
        {/* {JSON.stringify(P.board)} */}
        {grid.Rows.map( (e: GridRow, i:number) => {
          return (
            <GameRow 
            row={e} 
            key={i} 
            grid={grid} 
            hintStyle={P.hintStyle}
            focus={P.focus}
            handleTurn={handleTurn}/>
          )
        })}
      </div>
    </div>

  )
}

const mapStateToProps = (state: any) => {
  return {
    focus: state.game.focus,
    hintStyle: state.game.hintStyle
  }
}

export default connect(mapStateToProps, {})(Game);