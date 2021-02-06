import socketIOClient, { Socket } from 'socket.io-client';

interface Action {
  type: string,
  payload: any
}

type IS = {
  string: string
  conn: typeof Socket
}

const initialState: IS = {
  string: '',
  conn: socketIOClient('http://localhost:3002', {transports: ['websocket']})
}

const reducer = (state = initialState, action: Action) => {
  switch(action.type) {
    
    case('TEST'): {
      const {string} = action.payload;

      return {
        ...state,
        string: string
      }
    };

    default: {
      return {...state}
    };

  };
}

export default reducer;