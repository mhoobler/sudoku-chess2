import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Socket } from 'socket.io-client';

import GameGrid from './GameGrid';
import ScoreBord from './Scoreboard';

import { setTurnArr } from '../redux/actions/gameActions';

import GameFuncs from './GameFuncs';

import './styles/Game.css';

type GameState = {
  values: number[]
  players: number[]
}

type Props = {
  conn: typeof Socket
  board: Board
  focus: number
  hintStyle: 'default' | 'inverse'
  isPlayer: 1 | 2
  setTurnArr: (ta: Turn[]) => void
}

const Game: React.FC<Props> = (P) => {
  // console.clear();
  const n = Math.sqrt(Math.sqrt(P.board.size));
  console.log(P.isPlayer);

  const [gameState, setGameState] = useState<GameState>(
    { 
      values: Array(P.board.size).fill(0),
      players: Array(P.board.size).fill(0)
    }
  );
  const [errors, setErrors] = useState<GameErrors>({types: [], cells: []});
  const [hasJoined, setHasJoined] = useState(P.isPlayer === 2 ? true : false);
  const [hasQuit, setHasQuit] = useState(false);

  useEffect( () => {
    P.conn.off('PLAYER_JOIN');
    if(!hasJoined){
      P.conn.on('PLAYER_JOIN', (message: any) => {
        setHasJoined(true);
      })
    }

    P.conn.off('USER_QUIT');
    P.conn.on('USER_QUIT', () => {
      console.log('USER_QUIT')
      setHasQuit(true);
    })

    if(GameFuncs.initGrid(P.board.turnArr, n).values !== gameState.values){
      console.log('UPDATE');
      const newState = GameFuncs.initGrid(P.board.turnArr, n);
      setGameState(newState);

      P.conn.off('UPDATE_TURN');
      P.conn.on('UPDATE_TURN', (message: any) => {
        console.log('UPDATE_TURN: ' + new Date().toString());
        let ta = message.turnArr;
    
        P.setTurnArr(ta);
        
      })
    }
  }, [P.board, hasQuit] );

  const handleTurn = (index: number, value: number) => {
    let newErrors: GameErrors = {types: [], cells: []};
    console.log({
      index: index,
      value: value
    })
    let testInput = GameFuncs.testInput(index, gameState.values, n, value);
    let canTurn = P.board.turnArr.length > 0 ? P.board.turnArr.reverse()[0].player !== P.isPlayer : P.isPlayer === 1;
    // console.log(validInput && canTurn);

    // Use this to test with 1 client
    // let canTurn = true;
    let plyr = 1;
    if(P.board.turnArr.length > 0){
      P.board.turnArr.reverse()[0].player === 1 ? plyr = 2 : plyr = 1;
    }

    console.log(canTurn);
    if(testInput === true && canTurn && value > 0 && value <= n*n){
      let newTurn: Turn = {
        gameID: P.board._id,
        player: P.isPlayer,
        index: index,
        value: value
      }

      P.conn.emit('ADD_TURN', newTurn);
    }

    // Handle Errors
    if(testInput !== true) {
      newErrors = {
        types: [...newErrors.types, 'BAD_INPUT'],
        cells: testInput
      }
    }
    if(!canTurn) {
      newErrors.types.push('NOT_TURN')
    }
    if(value < 1){
      newErrors.types.push('NEG_NUM')
    }
    if(value > n*n){
      newErrors.types.push('BIG_NUM')
    }

    setErrors(newErrors);
    if(newErrors.types.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className='game-container'>
      {
      hasQuit ?
        <div className='pre-game'>
          <h4> Uh oh, it looks like the other player quit the game! </h4>
          <h4> Currently there is no way for someone to rejoin a game, sorry :(</h4>
        </div>
      :
      hasJoined ? 
        <React.Fragment>
          <ScoreBord players={gameState.players} errors={errors}/>
          <GameGrid players={gameState.players} values={gameState.values} handleTurn={handleTurn}/>
    
          <div className='game-sidebar'>&nbsp;</div>
        </React.Fragment>
      :
        <div className='pre-game'>
          <h4>Waiting for player to join you</h4>
          <h4>You're Game ID is: {P.board._id} </h4>
        </div>
      }
      </div>

  )
}

const mapStateToProps = (state: any) => {
  return {
    focus: state.game.focus,
    hintStyle: state.game.hintStyle,
    isPlayer: state.game.isPlayer
  }
}

export default connect(mapStateToProps, {setTurnArr})(Game);