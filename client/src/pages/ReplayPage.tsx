import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ReplayGame from "../ReplayGame";
import MenuButton from "./components/MenuButton";

import useGetGames from "../utils/useGetGames";
import API from "../utils/API";

const ReplayPage: React.FC = () => {
  const uid: string = useSelector((state: any) => {
    return state.user.uid;
  });
  const dispatch = useDispatch();
  const boards = useGetGames(uid ? uid : "");
  const [selected, setSelected] = useState<Board | null>(null);

  if (uid === null) {
    return (
      <div>
        You need to be signed into an account to record games and access replays
      </div>
    );
  }

  if (selected !== null) {
    return <ReplayGame board={selected} />;
  }

  const handleReplay = (_id: string) => {
    API.getReplay(_id)
      .then((res) => {
        const board: Board = res.data.board;
        const player: number = uid === board.playerCreate ? 1 : 2;
        dispatch({ type: "SET_PLAYER", payload: { player } });
        setSelected(board);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1> Replays </h1>
      </div>

      {boards.map((e: string) => {
        return <MenuButton key={e} text={e} action={() => handleReplay(e)} />;
      })}
    </div>
  );
};

export default ReplayPage;
