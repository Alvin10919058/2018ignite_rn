import { AsyncStorage } from 'react-native';
import data from '../Setting.json';

import {
    GET_TEAM_DATA,
    GET_TEAM_DATA_JUNIOR_SUCCESS,
    GET_TEAM_DATA_COLLEGE_SUCCESS,
    CODE_MODAL_TYPE,
    CAREER_CODE_CHANGED,
    ERROR_MODAL_TYPE,
    CAREER_GROW_UP,
    CAREER_GROW_UP_FINISHED,
    CAREER_GROW_UP_SUCCESS,
    MISSION_CODE_CHANGED,
    MISSION_CODING,
    MISSION_CODE_FINISHED  
  } from './types';

export const errorModalType = (type, text) => {
    return {
        type: ERROR_MODAL_TYPE,
        payload: { type, text }
    };
};

export const codeModalType = (type) => {
    return {
        type: CODE_MODAL_TYPE,
        payload: type
    };
};

export const careerCodeChanged = (text) => {
    return {
        type: CAREER_CODE_CHANGED,
        payload: text
    };
};

export const missionCodeChanged = (text) => {
    return {
        type: MISSION_CODE_CHANGED,
        payload: text
    };
};

export const getTeamData = () => {
    //支線任務內容
    const mission = [
        {
          id: 1,
          missionName: '遺落檔案(1)',
          finished: false
        },
        {
          id: 2,
          missionName: '遺落檔案(2)',
          finished: false
        },
        {
          id: 3,
          missionName: '遺落檔案(3)',
          finished: false
        },
        {
          id: 4,
          missionName: '隔空聽耳',
          finished: false
        },
        {
          id: 5,
          missionName: '銷毀的檔案',
          finished: false
        },
        {
          id: 6,
          missionName: '解碼檔案',
          finished: false
        },
        {
          id: 7,
          missionName: '鷹眼',
          finished: false
        },
        {
          id: 8,
          missionName: '迷彩特務',
          finished: false
        },
        {
          id: 9,
          missionName: '風聲',
          finished: false
        }
    ];

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

            //判斷已完成哪些支線任務
            const temp = responseData.results[0].done_submission;
            for (let i = 0; i < temp.length; i++) {
            mission[temp[i] - 1].finished = true;
            }

            if (responseData.results[0].batch === '國高') {
                console.log('國高');
                getTeamDataJuniorSuccess(dispatch, responseData.results[0], mission);
            } else if (responseData.results[0].batch === '大專') {
                console.log('大專');
                getTeamDataCollegeSuccess(dispatch, responseData.results[0], mission);
            } else {
                console.log('no batch show up');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

const getTeamDataJuniorSuccess = (dispatch, responseData, mission) => {
    dispatch({
      type: GET_TEAM_DATA_JUNIOR_SUCCESS,
      payload: { responseData, mission }
    });
};

const getTeamDataCollegeSuccess = (dispatch, responseData, mission) => {
    dispatch({
      type: GET_TEAM_DATA_COLLEGE_SUCCESS,
      payload: { responseData, mission }
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
        'X-Parse-REST-API-Key': data.paresApiKey
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

export const missionCoding = (code, missionId, missionName, mission) => {
    return async (dispatch) => {
        dispatch({ type: MISSION_CODING });

        const params = {
            where: {
                name: missionName,
                code_number: code
            }
        };
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => `${esc(k)}=${esc(JSON.stringify(params[k]))}`)
            .join('&');
        fetch(`${data.parseServerURL}/classes/Submission?${query}`, {
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
                const temp = mission;
                temp[missionId - 1].finished = true;
                missionCodeFinished(dispatch, '恭喜完成任務！', temp);
            } else {
                //careerGrowUpFinished(dispatch, '序號輸入錯誤或已被使用！');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

const missionCodeFinished = (dispatch, text, mission) => {
    dispatch({
      type: MISSION_CODE_FINISHED,
      payload: { text, mission }
    });
};