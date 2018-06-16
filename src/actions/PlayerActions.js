import { AsyncStorage } from 'react-native';
import data from '../Setting.json';

import {
    GET_TEAM_DATA,
    GET_TEAM_DATA_JUNIOR_SUCCESS,
    GET_TEAM_DATA_COLLEGE_SUCCESS,
    CODE_MODAL_TYPE,
    CAREER_CODE_CHANGED,
    CAREER_GROW_UP,
    CAREER_GROW_UP_FINISHED,
    CLOSE_ERROR_MODAL,
    CAREER_GROW_UP_SUCCESS    
  } from './types';

export const codeModalType = (type) => {
    return {
        type: CODE_MODAL_TYPE,
        payload: type
    };
};

export const closeErrorModal = () => {
    return {
        type: CLOSE_ERROR_MODAL,
        payload: null
    };
};

export const careerCodeChanged = (text) => {
    return {
        type: CAREER_CODE_CHANGED,
        payload: text
    };
};

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
        .then(async (responseData) => {
            console.log(responseData);
            await AsyncStorage.setItem('teamID', responseData.results[0].objectId);
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

export const careerGrowUp = (code) => {
    return async (dispatch) => {
        dispatch({ type: CAREER_GROW_UP });

        const params = {
            where: {
              code_number: code,
              used: false
            }
        };
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => `${esc(k)}=${esc(JSON.stringify(params[k]))}`)
            .join('&');
        fetch(`${data.parseServerURL}/classes/Career?${query}`, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': data.parseAppId,
            'X-Parse-REST-API-Key': data.paresApiKey
        }
        })
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData);
           if (responseData.results[0] !== undefined) {
               console.log('yes');
               changeTeamCareer(dispatch, responseData);
           } else {
               careerGrowUpFinished(dispatch, '序號輸入錯誤或已被使用！');
           }
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

const careerGrowUpFinished = (dispatch, text) => {
    dispatch({
      type: CAREER_GROW_UP_FINISHED,
      payload: text
    });
};

//至Team Class更改職業的pointer
const changeTeamCareer = async (dispatch, responseData) => {
    const sessionToken = await AsyncStorage.getItem('sessionToken');
    const teamID = await AsyncStorage.getItem('teamID');  

    const params = {
        career: {
            __type: 'Pointer',
            className: 'Career',
            objectId: responseData.results[0].objectId
        },
    };
    
    fetch(`${data.parseServerURL}/classes/Team/${teamID}`, {
    method: 'PUT',
    headers: {
        'X-Parse-Application-Id': data.parseAppId,
        'X-Parse-REST-API-Key': data.paresApiKey,
        'X-Parse-Session-Token': sessionToken
    },
    body: JSON.stringify(params)
    })
    .then((success) => {
    console.log(success);
    changeCareerType(dispatch, responseData);
    })
    .catch((err) => {
    console.log(err);// error handling ..
    });
};

//再將Career的used改成true代表已使用過
const changeCareerType = (dispatch, responseData) => {
    const params = {
        used: true
    };
    
    fetch(`${data.parseServerURL}/classes/Career/${responseData.results[0].objectId}`, {
    method: 'PUT',
    headers: {
        'X-Parse-Application-Id': data.parseAppId,
        'X-Parse-REST-API-Key': data.paresApiKey
    },
    body: JSON.stringify(params)
    })
    .then((success) => {
    console.log(success);
    careerGrowUpSuccess(dispatch, '恭喜您成功轉職！', responseData.results[0]);
    })
    .catch((err) => {
    console.log(err);// error handling ..
    });
};

const careerGrowUpSuccess = (dispatch, text, responseData) => {
    console.log(responseData);
    dispatch({
      type: CAREER_GROW_UP_SUCCESS,
      payload: { text, responseData }
    });
};
