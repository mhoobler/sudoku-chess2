import {setBoard} from './gameActions';

export const newGame = (num: 81 | 256) => {
  return ( dispatch: any, getState: () => any) => {
    const {conn} = getState().test;
    console.log(conn);



    conn.emit('NEW_GAME', {size: num}, //Callback
      async (message: Board) => {
        let x = await message;
        dispatch( setBoard(x) )
      }
    );
  }
}