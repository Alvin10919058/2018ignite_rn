import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlayerReducer from './PlayerReducer';

export default combineReducers({
  auth: AuthReducer,
  player: PlayerReducer
});
