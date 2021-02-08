import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Socket } from 'socket.io-client';

import GameCell from './GameCell';

import { setTurnArr } from '../redux/actions/gameActions';

import GameFuncs from './GameFuncs';

import './styles/Game.css';


type Props = {
  conn: typeof Socket
  board: Board
  focus: number
  hintStyle: 'default' | 'inverse'
  setTurnArr: (ta: Turn[]) => void
}

const Game: React.FC<Props> = (P) => {

  const n = Math.sqrt(Math.sqrt(P.board.size));
  const [values, setValues] = useState<number[]>([]);
  const [players, setPlayers] = useState<number[]>([]);
  console.log(values);

  P.conn.off('UPDATE_TURN');
  P.conn.on('UPDATE_TURN', (message: any) => {
    let ta = message.turnArr;

    P.setTurnArr(ta);
    
  })

  useEffect( () => {
    if(GameFuncs.initGrid(P.board.turnArr, n).values !== values){
      console.log('UPDATE');
      const {values, players} = GameFuncs.initGrid(P.board.turnArr, n);
      setPlayers(players)
      setValues(values);
    }
  }, [P.board] );

  const handleTurn = (index: number, value: number) => {
    console.log({
      index: index,
      value: value
    })
    let canTurn = GameFuncs.testInput(index, values, n, value);
    console.log(canTurn);

    if(canTurn){
      let newTurn: Turn = {
        gameID: P.board._id,
        player: 1,
        index: index,
        value: value
      }

      P.conn.emit('ADD_TURN', newTurn);
    }

  }

  return (
    <div className='grid-container'>
      {console.time('game')}
      {values.map( (e:number, i:number) => {
        return (
          <GameCell 
          key={i} 
          index={i}
          n={n}
          player={players[i]} 
          value={e}
          values={values}
          handleTurn={handleTurn}
          isFocused={P.focus === i}/>
        )
      })}
      {console.timeEnd('game')}
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    focus: state.game.focus,
    hintStyle: state.game.hintStyle
  }
}

export default connect(mapStateToProps, {setTurnArr})(Game);