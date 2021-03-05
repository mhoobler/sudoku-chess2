import { setBoard } from "./gameActions";

export const newGame = (num: 81 | 256, uid: string) => {
  return (dispatch: any, getState: () => any) => {
    const { conn } = getState().user;
    console.log(conn);

    conn.emit("NEW_GAME", { size: num, uid: uid }, async (message: Board) => {
      let x = await message;
      dispatch(setBoard(x, 1));
    });
  };
};

export const joinGame = (_id: string, uid: string) => {
  return (dispatch: any, getState: () => any) => {
    const { conn } = getState().user;

    conn.emit(
      "JOIN_GAME",
      { _id, uid }, //CallBack
      async (message: Board) => {
        let x = await message;
        dispatch(setBoard(x, 2));
      }
    );
  };
};

export const signInSomeAuth = (uid: string) => ({
  type: "SET_UID",
  payload: {
    uid: uid,
  },
});
