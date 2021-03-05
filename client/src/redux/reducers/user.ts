import socketIOClient, { Socket } from "socket.io-client";

interface Action {
  type: string;
  payload: any;
}

type IS = {
  string: string;
  conn: typeof Socket;
  uid: string | null;
};

const initialState: IS = {
  string: "",
  conn: socketIOClient(
    process.env.NODE_ENV === "production"
      ? "wss://sudoku-chess2.herokuapp.com/"
      : "http://localhost:3001",
    {
      transports: ["websocket"],
    }
  ),
  uid: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "TEST": {
      const { string } = action.payload;

      return {
        ...state,
        string: string,
      };
    }

    case "SET_UID": {
      const { uid } = action.payload;

      return {
        ...state,
        uid: uid,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
