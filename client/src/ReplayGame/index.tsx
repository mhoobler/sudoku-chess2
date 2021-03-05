import React, { useState, useEffect } from "react";

import Game from "../Game";

import "./ReplayGame.css";

type Props = {
  board: Board;
};

const ReplayGame: React.FC<Props> = (P) => {
  const [turn, setTurn] = useState(1);
  const [replayBoard, setReplayBoard] = useState<Board>(P.board);

  useEffect(() => {
    let board: Board = {
      ...P.board,
      turnArr: P.board.turnArr.slice(0, turn),
    };

    console.log(board);

    setReplayBoard(board);
  }, [turn]);

  const handleClick = (n: -1 | 1) => {
    if (turn + n > P.board.turnArr.length) {
      console.log("too much");
    } else if (turn + n < 1) {
      console.log("too little");
    } else {
      console.log(n);
      setTurn(turn + n);
    }
  };

  return (
    <div className="replay-container">
      <Game board={replayBoard} />
      <div className="replay-inputs">
        <button className="fa fa-arrow-left" onClick={() => handleClick(-1)} />
        <div>{`${turn} / ${P.board.turnArr.length}`}</div>
        <button className="fa fa-arrow-right" onClick={() => handleClick(1)} />
      </div>
    </div>
  );
};

export default ReplayGame;
