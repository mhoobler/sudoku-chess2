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

//Actions

import './App.css';

interface Props {
  conn: typeof Socket,
  board: Board
}

// Add auto-complete
// Add "player turn" restriction

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
          <Game board={P.board} conn={P.conn}/>
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