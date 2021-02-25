import { setBoard } from "./gameActions";

export const newGame = (num: 81 | 256) => {
  return (dispatch: any, getState: () => any) => {
    const { conn } = getState().user;
    console.log(conn);

    conn.emit(
      "NEW_GAME",
      { size: num }, //Callback
      async (message: Board) => {
        let x = await message;
        dispatch(setBoard(x, 1));
      }
    );
  };
};

export const joinGame = (_id: string) => {
  return (dispatch: any, getState: () => any) => {
    const { conn } = getState().user;

    conn.emit(
      "JOIN_GAME",
      { _id }, //CallBack
      async (message: Board) => {
        let x = await message;
        dispatch(setBoard(x, 2));
      }
    );
  };
};
