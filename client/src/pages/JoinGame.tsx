import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Socket } from "socket.io-client";

import MenuButton from "./components/MenuButton";

import { joinGame } from "../redux/actions/userActions";

type Props = {
  conn: typeof Socket;
  joinGame: (_id: string, uid: string) => void;
  uid: string
};

const JoinGame: React.FC<Props> = (P) => {
  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    P.conn.emit("GET_GAMES", null, (x: string[]) => {
      setRooms(x);
    });
  }, [P.conn]);

  const handleJoin = (_id: string) => {
    P.joinGame(_id, (P.uid ? P.uid : 'Anon'));
  }

  return (
    <div className="menu-container">
      <h1>JoinGame</h1>

      {rooms.map((_id: string, i: number) => {
        return <MenuButton key={i} text={_id} action={() => handleJoin(_id)} />;
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    conn: state.user.conn,
    uid: state.user.uid
  };
};

export default connect(mapStateToProps, { joinGame })(JoinGame);
