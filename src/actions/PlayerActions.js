import { AsyncStorage } from 'react-native';
import data from '../Setting.json';

import {
    GET_TEAM_DATA,
    GET_TEAM_DATA_JUNIOR_SUCCESS,
    GET_TEAM_DATA_COLLEGE_SUCCESS
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
            if (responseData.results[0].batch === '國高') {
                console.log('國高');
                getTeamDataJuniorSuccess(dispatch, responseData.results[0]);
            } else if (responseData.results[0].batch === '大專') {
                console.log('大專');
                getTeamDataCollegeSuccess(dispatch, responseData.results[0]);
            } else {
                console.log('no batch show up');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

const getTeamDataJuniorSuccess = (dispatch, responseData) => {
    dispatch({
      type: GET_TEAM_DATA_JUNIOR_SUCCESS,
      payload: responseData
    });
};

const getTeamDataCollegeSuccess = (dispatch, responseData) => {
    dispatch({
      type: GET_TEAM_DATA_COLLEGE_SUCCESS,
      payload: responseData
    });
};

