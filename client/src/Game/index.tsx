import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Socket } from "socket.io-client";

import GameGrid from "./GameGrid";
import ScoreBord from "./Scoreboard";

import { setTurnArr } from "../redux/actions/gameActions";

import GameFuncs from "./GameFuncs";

import "./styles/Game.css";

type GameState = {
  values: number[];
  players: number[];
};

type Props = {
  conn?: typeof Socket;
  board: Board;
  focus: number;
  hintStyle: "default" | "inverse";
  isPlayer: 1 | 2;
  setTurnArr: (ta: Turn[]) => void;
};

const Game: React.FC<Props> = (P) => {
  // This n value is very important,
  // helps determine things like the size of grid and grid coordinates
  const n = Math.sqrt(Math.sqrt(P.board.size));

  // These two arrays help render the GameGrid and keep score
  const [gameState, setGameState] = useState<GameState>({
    values: Array(P.board.size).fill(0),
    players: Array(P.board.size).fill(0),
  });

  // States to store errors and to help with listeners
  const [errors, setErrors] = useState<GameErrors>({ types: [], cells: [] });
  const [hasJoined, setHasJoined] = useState(
    P.conn ? (P.isPlayer === 2 ? true : false) : true
  );
  const [hasQuit, setHasQuit] = useState(false);
  // Determine player turn
  const turnArr = P.board.turnArr,
    len = turnArr.length;
  const isTurn = len > 0 ? (turnArr[len - 1].player === 1 ? 2 : 1) : 1;

  useEffect(() => {
    const newGrid = GameFuncs.initGrid(P.board.turnArr, n);
    if (newGrid.values !== gameState.values) {
      setGameState(newGrid);
    }

    if (P.conn) {
      P.conn.on("PLAYER_JOIN", () => {
        setHasJoined(true);
      });
      P.conn.on("USER_QUIT", () => {
        setHasQuit(true);
      });
      P.conn.on("UPDATE_TURN", (message: any) => {
        P.setTurnArr(message.turnArr);
      });

      return () => {
        P.conn!.off("UPDATE_TURN");
        P.conn!.off("USER_QUIT");
        P.conn!.off("UPDATE_TURN");
      };
    }
  }, [P.board, hasQuit]);

  // BUG Somehow a value of "151" will turn into "15" and become a potentially valid
  // This gets called inside InputCell
  const handleTurn = (index: number, value: number) => {
    if (P.conn) {
      console.log(isTurn);

      //initialize variables
      // const turnArr = P.board.turnArr, len = turnArr.length;
      const testInput = GameFuncs.testInput(index, gameState.values, n, value);
      const canTurn = P.isPlayer === isTurn;
      let newErrors: GameErrors = { types: [], cells: [] };

      //Make sure input is valid
      if (testInput === true && canTurn && value > 0 && value <= n * n) {
        const newTurn: Turn = {
          gameID: P.board._id,
          player: P.isPlayer,
          index: index,
          value: value,
        };

        //Send new turn
        P.conn.emit("ADD_TURN", newTurn);
      }

      // Handle Errors
      if (typeof testInput !== "boolean" && value !== 0) {
        newErrors = {
          types: [...newErrors.types, "BAD_INPUT"],
          cells: testInput,
        };
      }
      if (!canTurn) {
        newErrors.types.push("NOT_TURN");
      }
      if (value < 1) {
        newErrors.types.push("ZERO_NUM");
      }
      if (value > n * n) {
        newErrors.types.push("BIG_NUM");
      }
      setErrors(newErrors);

      // This was trying to fix something in InputCell
      // if(newErrors.types.length > 0) {
      //   return false;
      // } else {
      //   return true;
      // }
    }
  };

  return (
    <div className="game-container">
      {hasQuit ? (
        <div className="pre-game">
          <h4> Uh oh, it looks like the other player quit the game! </h4>
          <h4>
            {" "}
            Currently there is no way for someone to rejoin a game, sorry :(
          </h4>
        </div>
      ) : hasJoined ? (
        <React.Fragment>
          <ScoreBord
            players={gameState.players}
            errors={errors}
            isTurn={isTurn}
            isPlayer={P.isPlayer}
          />
          <GameGrid
            errors={errors.cells}
            players={gameState.players}
            values={gameState.values}
            handleTurn={handleTurn}
          />

          <div className="game-sidebar-right">&nbsp;</div>
        </React.Fragment>
      ) : (
        <div className="pre-game">
          <h4>Waiting for player to join you</h4>
          <h4>You're Game ID is: {P.board._id} </h4>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    focus: state.game.focus,
    hintStyle: state.game.hintStyle,
    isPlayer: state.game.isPlayer,
  };
};

export default connect(mapStateToProps, { setTurnArr })(Game);
