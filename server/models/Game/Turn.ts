import {Schema, model} from 'mongoose';

const turnSchema = new Schema({
  gameID: {
    type: String,
    required: true,
    index: true
  },
  player: {
    type: Number,
    required: true,
    validate: {
      validator: (num: number) => {
        return ( num === 1 || num === 2 )
      }
    }
  },
  index:{
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  }

})

export default turnSchema;