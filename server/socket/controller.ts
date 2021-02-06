import * as C from './lib';

import db from '../models';

const Controller = async (action: C.Action ) => {
  console.log(action.type);

  switch(action.type) {
    case('GET_BOARD'): {
      try
      {
        if(!action.payload.id){
          let x = await db.Game.Board.find({});
          console.log(x);
        }
      }
      catch(err) { console.log(err); };
      break;
    }

    case('POST_BOARD'): {
      try
      {
        console.log(action.payload);
        let x = await db.Game.Board.create(action.payload)

        return x;
      }
      catch(err) { console.log(err); }
      break;
    }

    default:{
      return 'DEFAULT'
    }

    case('ADD_TURN'): {
      try
      {
        console.log(action.payload);
        const turn = action.payload;
        let x = await db.Game.Board.findOneAndUpdate(
        {_id: turn.gameID},
        { $push: { turnArr: turn } },
        {new: true}
        );

        return x;
      }
      catch(err) { console.log(err); };
      break;
    }
  }

}

export default Controller