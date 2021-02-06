import {combineReducers} from 'redux';

import test from './test';
import game from './game';

export default combineReducers({
  test,
  game
})