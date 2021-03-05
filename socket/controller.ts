import * as Lib from "./lib";

import db from "../models";

// This function handles any actions taken on the DB
const Controller = async (action: Lib.Action) => {
  console.log(action.type);

  switch (action.type) {
    case "GET_BOARD": {
      try {
        if (!action.payload._id) {
          let board: Lib.Board = await db.Game.Board.find({});
          console.log(board);
          return board;
        } else {
          let board: Lib.Board = await db.Game.Board.findOne({
            _id: action.payload._id,
          });
          return board;
        }
      } catch (err) {
        console.log(err);
      }
      break;
    }

    case "POST_BOARD": {
      try {
        console.log(action.payload);
        let board: any = await db.Game.Board.create(action.payload);

        return board;
      } catch (err) {
        console.log(err);
      }
      break;
    }

    case "ADD_PLAYER": {
      try {
        let board: Lib.Board = await db.Game.Board.findOneAndUpdate(
          { _id: action.payload._id },
          { playerJoin: action.payload.uid },
          { new: true }
        );

        return board;
      } catch (err) {
        console.log(err);
      }
      break;
    }

    case "ADD_TURN": {
      try {
        console.log(action.payload);
        const turn = action.payload;
        let board: Lib.Board = await db.Game.Board.findOneAndUpdate(
          { _id: turn.gameID },
          { $push: { turnArr: turn } },
          { new: true }
        );

        return board;
      } catch (err) {
        console.log(err);
      }
      break;
    }

    default: {
      return "DEFAULT";
    }
  }
};

export default Controller;
