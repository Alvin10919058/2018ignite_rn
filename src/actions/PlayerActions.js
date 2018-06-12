import { AsyncStorage } from 'react-native';
import data from '../Setting.json';

import {
    GET_TEAM_DATA,
    GET_TEAM_DATA_SUCCESS
  } from './types';

export const getTeamData = () => {
    return async (dispatch) => {
        dispatch({ type: GET_TEAM_DATA });
        const sessionToken = await AsyncStorage.getItem('sessionToken');
        const userID = await AsyncStorage.getItem('userID');

        const params = {
            include: 'career',
            //limit: 1000,
            where: {
            user: {
                __type: 'Pointer',
                className: '_User',
                objectId: userID
            },
            }
        };
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => `${esc(k)}=${esc(JSON.stringify(params[k]))}`)
            .join('&');
        fetch(`${data.parseServerURL}/classes/Team?${query}`, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': data.parseAppId,
            'X-Parse-REST-API-Key': data.paresApiKey,
            'X-Parse-Session-Token': sessionToken
        }
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            getTeamDataSuccess(dispatch, responseData);
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

const getTeamDataSuccess = (dispatch, responseData) => {
    dispatch({
      type: GET_TEAM_DATA_SUCCESS,
      payload: responseData
    });
};

