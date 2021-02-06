
type iS = {
  board: Board | null,
  target: number,
  hintsStyle: 'default' | 'inverse',
  focus: number,
  score: {
    1: number,
    2: number
  }
}

const initialState: iS = {
  board: null,
  target: 0,
  hintsStyle: 'default',
  focus: 0,
  score: {1: 0, 2: 0}
}

const reducer = (state = initialState, action: any) => {
  switch(action.type){
    case('SET_BOARD'): {
      const {board} = action.payload;
      return {
        ...state,
        board: board
      };
    }

    case('SET_FOCUS'): {
      const {focus} = action.payload;
      return {
        ...state,
        focus: focus
      }
    }

    default: {
      return {...state};
    }
  }
}

export default reducer;