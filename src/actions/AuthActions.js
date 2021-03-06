import { AsyncStorage } from 'react-native';
import Parse from 'parse/react-native';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    Parse.User.logIn(username, password)
      .then(async user => {
        console.log(user);
        const sessionToken = user.getSessionToken();
        await AsyncStorage.setItem('sessionToken', sessionToken);
        await AsyncStorage.setItem('userID', user.id);

        loginUserSuccess(dispatch, user);
        //installation(user.id, sessionToken);
      })
      .catch((error) => {
          console.log(error);
          loginUserFail(dispatch);
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = async (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  if (user.attributes.character === 'gm') {
    await AsyncStorage.setItem('gm_batch', user.attributes.gm_batch);
    Actions.gm();
  } else {
    Actions.main();
  }
};
