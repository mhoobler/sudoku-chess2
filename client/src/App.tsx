import React, { useEffect } from "react";
import { withRouter, Route, Switch, useHistory } from "react-router-dom";
import { Socket } from "socket.io-client";
import { connect } from "react-redux";

//Pages
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import ReplayPage from "./pages/ReplayPage";
import Game from "./Game";

import firebase from "firebase/app";

import "./App.css";

interface Props {
  conn: typeof Socket;
  board: Board;
}

const App: React.FC<Props> = (P) => {
  const history = useHistory();

  useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
      });
    }
    if (P.board !== null && history.location.pathname !== "/game") {
      history.push("/game");
    }
  }, [P.board]);

  return (
    <div className="App">
      <Switch>
        <Route path="/game">
          <Game board={P.board} conn={P.conn} />
        </Route>

        <Route path="/replay">
          <ReplayPage />
        </Route>

        <Route path="/create">
          <CreateGame />
        </Route>

        <Route path="/join">
          <JoinGame />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    conn: state.user.conn,
    board: state.game.board,
  };
};

export default withRouter(connect(mapStateToProps, {})(App));
