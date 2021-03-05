type iS = {
  board: Board | null;
  target: number;
  hintStyle: "default" | "inverse";
  focus: number;
  isPlayer: undefined | 1 | 2;
};

const initialState: iS = {
  board: null,
  target: 0,
  hintStyle: "default",
  focus: 0,
  isPlayer: undefined,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_BOARD": {
      const { board, isPlayer } = action.payload;
      return {
        ...state,
        board: board,
        isPlayer: isPlayer,
      };
    }

    case "SET_PLAYER": {
      const { player } = action.payload;

      return {
        ...state,
        isPlayer: player,
      };
    }

    case "SET_FOCUS": {
      const { focus } = action.payload;
      return {
        ...state,
        focus: focus,
      };
    }

    case "SET_TURNS": {
      const { turnArr } = action.payload;
      return {
        ...state,
        board: {
          ...state.board,
          turnArr,
        },
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
