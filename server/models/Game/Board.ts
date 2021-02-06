import {Schema, model} from 'mongoose';
import Turn from './Turn';

const boardSchema = new Schema({
  playerCreate: {
    type: String,
    required: true
  },
  playerJoin: {
    type: String
  },
  size: {
    type: Number,
    required: [true, 'Invalid Grid Size'],
    validate: {
      validator: (num: number) => {
        return ( num === 81 || num === 256 );
      }
    }
  },
  turnArr: {
    type: [Turn],
    required: false
  }
})

const Board = model('Board', boardSchema);

export default Board;