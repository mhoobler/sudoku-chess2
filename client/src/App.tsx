import React, { useEffect } from 'react';
import {
  withRouter,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import { Socket } from 'socket.io-client';
import {connect} from 'react-redux';


//Pages
import Home from './pages/Home';
import CreateGame from './pages/CreateGame';
import JoinGame from './pages/JoinGame';
import Game from './pages/Game';
//Test Game
import Game2 from './Game2/Game';

import GameFuncs from './Game2/GameFuncs';

import './App.css';

interface Props {
  conn: typeof Socket,
  board: Board
}

const TurnA: Turn[] = [
  {
    gameID: '',
    player: 1,
    value: 1,
    index: 0
  },
  {
    gameID: '',
    player: 2,
    value: 2,
    index: 1
  },
  {
    gameID: '',
    player: 1,
    value: 3,
    index: 2
  },
  {
    gameID: '',
    player: 2,
    value: 4,
    index: 3
  },
  {
    gameID: '',
    player: 1,
    value: 1,
    index: 0
  },
  {
    gameID: '',
    player: 2,
    value: 2,
    index: 1
  },
  {
    gameID: '',
    player: 1,
    value: 3,
    index: 2
  },
  {
    gameID: '',
    player: 2,
    value: 4,
    index: 3
  },
  
]

const initArr = GameFuncs.initGrid(TurnA, 4);
const set = GameFuncs.getSet1(3, initArr.values, 4);
console.log(set);

const App: React.FC<Props> = (P) => {
  const history = useHistory();

  useEffect( () => {
    console.log(P.conn);

    // P.conn.on('TEST_ROOM', (message: any) => {
    //   console.log(message);
    // })

    if(P.board !== null){
      console.log(P.board);
      history.push('/game');
    }
  }, [P.board])

  return (
    <div className='App'>
      <Switch>

        <Route path='/game'>
          <Game2 board={P.board} conn={P.conn}/>
        </Route>
      
        <Route path='/create'>
          <CreateGame />
        </Route>

        <Route path='/join'>
          <JoinGame />
        </Route>

        <Route exact path='/'>
          <Home />
        </Route>

      </Switch>
    </div>

  );
}

const mapStateToProps = (state: any) => {
  return {
    conn: state.test.conn,
    board: state.game.board
  }
}

export default withRouter(connect(mapStateToProps, {})(App));