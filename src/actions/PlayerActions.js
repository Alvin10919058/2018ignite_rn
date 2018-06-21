import { AsyncStorage } from 'react-native';
import data from '../Setting.json';

import {
    GET_TEAM_DATA,
    GET_TEAM_DATA_JUNIOR_SUCCESS,
    GET_TEAM_DATA_COLLEGE_SUCCESS,
    CAREER_CODE_CHANGED,
    ERROR_MODAL_TYPE,
    CAREER_GROW_UP,
    CAREER_GROW_UP_FINISHED,
    CAREER_GROW_UP_SUCCESS,
    MISSION_CODE_CHANGED,
    MISSION_CODING,
    MISSION_CODE_FINISHED,
    MISSION_CODE_FAILED,
    RESET_CODE_CHANGED,
    SKILL_JUNIOR,
    SKILL_JUNIOR_FAILED,
    SKILL_JUNIOR_SUCCESS,
    SKILL_COLLEGE,
    SKILL_COLLEGE_FAILED,
    SKILL_COLLEGE_SUCCESS
  } from './types';

export const errorModalType = (type, text) => {
    return {
        type: ERROR_MODAL_TYPE,
        payload: { type, text }
    };
};

export const resetCodeChanged = (text) => {
    return {
        type: RESET_CODE_CHANGED,
        payload: text
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
        },
        {
          id: 10,
          missionName: '特務急急棒',
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
            careerGrowUpFinished(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
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
        careerGrowUpFinished(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
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
        careerGrowUpFinished(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
    });
};

const careerGrowUpSuccess = (dispatch, text, responseData) => {
    console.log(responseData);
    dispatch({
      type: CAREER_GROW_UP_SUCCESS,
      payload: { text, responseData }
    });
};

export const missionCoding = (code, missionId, missionName, mission, submission) => {
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
                //將UI mission改成已通過
                const temp = mission;
                temp[missionId - 1].finished = true;
                changeTeamSubmission(dispatch, missionId, submission, temp);
            } else {
                missionCodeFailed(dispatch, '序號輸入錯誤或已被使用！');
            }
        })
        .catch((error) => {
            console.log(error);
            missionCodeFailed(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
        });
    };
};

//至Team Class更改done_submission資料
const changeTeamSubmission = async (dispatch, missionId, submission, mission) => {
    const teamID = await AsyncStorage.getItem('teamID');  

    //將完成的支線任務塞入原本的array中
    const tempArr = submission;
    tempArr.push(missionId);
    tempArr.sort((a, b) => { return a - b; });
    //過濾掉重複的數字以防萬一有多重裝置輸入
    const result = tempArr.filter((element, index, arr) => {
        return arr.indexOf(element) === index;
    });
    console.log(tempArr);
    console.log(result);

    const params = {
        done_submission: result
    };

    //如果10個任務都完成
    if (tempArr.length === 10) {
        params.completed = true;
        console.log('mission completed');
    }
    
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
       missionCodeFinished(dispatch, '恭喜完成任務！', mission);
    })
    .catch((err) => {
      console.log(err);// error handling ..
      missionCodeFailed(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
    });
};

const missionCodeFinished = (dispatch, text, mission) => {
    dispatch({
      type: MISSION_CODE_FINISHED,
      payload: { text, mission }
    });
};

const missionCodeFailed = (dispatch, text) => {
    dispatch({
      type: MISSION_CODE_FAILED,
      payload: text
    });
};

//Skills

export const skillJunior = (
    freePoint,
    strength, wisdom, vitality, faith, agility,
    career,
    temp1, temp2, temp3, temp4, temp5
) => {
    return async (dispatch) => {
        dispatch({ type: SKILL_JUNIOR });
        const teamID = await AsyncStorage.getItem('teamID'); 

        fetch(`${data.parseServerURL}/classes/Team/${teamID}`, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': data.parseAppId,
            'X-Parse-REST-API-Key': data.paresApiKey
        }
        })
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData);
           //判斷資料是不是一樣
           if (
            responseData.free_point === freePoint &&
            responseData.strength === strength &&
            responseData.wisdom === wisdom &&
            responseData.vitality === vitality &&
            responseData.faith === faith &&
            responseData.agility === agility
           ) {
               //一樣就去加分數
               console.log('success');
               countScoreJunior(
                   dispatch,
                   freePoint,
                   strength, wisdom, vitality, faith, agility,
                   career,
                   temp1, temp2, temp3, temp4, temp5
                );
           } else {
            skillJuniorFailed(dispatch, '傳送時發生錯誤！\n點擊下方配點選單鍵重新整理再嘗試輸入');
           }
        })
        .catch((error) => {
            console.log(error);
            skillJuniorFailed(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
        });
    };
};

const countScoreJunior = async (
    dispatch,
    freePoint,
    strength, wisdom, vitality, faith, agility,
    career,
    temp1, temp2, temp3, temp4, temp5
) => {
    const teamID = await AsyncStorage.getItem('teamID');  
 
    let score = 0;

    if (career.name === '戰士') {
       score = freePoint + strength + wisdom + vitality + faith + agility;
    } else if (career.name === '特勤部隊') {
       score = (strength + temp1) * 2 + (wisdom + temp2) + (vitality + temp3) + 
       (faith + temp4) + (agility + temp5) * 1.5 + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } else if (career.name === '急襲部隊') {
       score = (strength + temp1) * 1.5 + (wisdom + temp2) + (vitality + temp3) + 
       (faith + temp4) + (agility + temp5) * 2 + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } else if (career.name === '狙擊部隊') {
       score = (strength + temp1) + (wisdom + temp2) + (vitality + temp3) * 1.5 + 
       (faith + temp4) * 2 + (agility + temp5) + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } else if (career.name === '防禦部隊') {
       score = (strength + temp1) + (wisdom + temp2) * 1.5 + (vitality + temp3) * 2 + 
       (faith + temp4) + (agility + temp5) + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } else if (career.name === '生化小組') {
       score = (strength + temp1) + (wisdom + temp2) * 2 + (vitality + temp3) + 
       (faith + temp4) * 1.5 + (agility + temp5) + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } 
   

    const params = {
      free_point: freePoint - temp1 - temp2 - temp3 - temp4 - temp5,
      strength: strength + temp1,
      wisdom: wisdom + temp2,
      vitality: vitality + temp3,
      faith: faith + temp4,
      agility: agility + temp5,
      team_total_score: score
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
       skillJuniorSuccess(
           dispatch, '配點成功！',
           freePoint - temp1 - temp2 - temp3 - temp4 - temp5,
           strength + temp1,
           wisdom + temp2,
           vitality + temp3,
           faith + temp4,
           agility + temp5,
           score
       );
    })
    .catch((err) => {
      console.log(err);// error handling ..
      skillJuniorFailed(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
    });
};

const skillJuniorFailed = (dispatch, text) => {
    dispatch({
      type: SKILL_JUNIOR_FAILED,
      payload: text
    });
};


const skillJuniorSuccess = (
    dispatch, text, 
    freePoint, strength, wisdom, vitality, faith, agility, score
) => {
    dispatch({
      type: SKILL_JUNIOR_SUCCESS,
      payload: { text, freePoint, strength, wisdom, vitality, faith, agility, score }
    });
};

export const skillCollege = (
    freePoint,
    passion, creativity, intelligence, love, patience,
    career,
    temp1, temp2, temp3, temp4, temp5
) => {
    return async (dispatch) => {
        dispatch({ type: SKILL_COLLEGE });
        const teamID = await AsyncStorage.getItem('teamID'); 

        fetch(`${data.parseServerURL}/classes/Team/${teamID}`, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': data.parseAppId,
            'X-Parse-REST-API-Key': data.paresApiKey
        }
        })
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData);
           //判斷資料是不是一樣
           if (
            responseData.free_point === freePoint &&
            responseData.passion === passion &&
            responseData.creativity === creativity &&
            responseData.intelligence === intelligence &&
            responseData.love === love &&
            responseData.patience === patience
           ) {
               //一樣就去加分數
               console.log('success');
               countScoreCollege(
                   dispatch,
                   freePoint,
                   passion, creativity, intelligence, love, patience,
                   career,
                   temp1, temp2, temp3, temp4, temp5
                );
           } else {
            skillCollegeFailed(dispatch, '傳送時發生錯誤！\n點擊下方配點選單鍵重新整理再嘗試輸入');
           }
        })
        .catch((error) => {
            console.log(error);
            skillCollegeFailed(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
        });
    };
};

const countScoreCollege = async (
    dispatch,
    freePoint,
    passion, creativity, intelligence, love, patience,
    career,
    temp1, temp2, temp3, temp4, temp5
) => {
    const teamID = await AsyncStorage.getItem('teamID');  
 
    let score = 0;

    if (career.name === '戰士') {
       score = freePoint + passion + creativity + intelligence + love + patience;
    } else if (career.name === '特勤部隊') {
       score = (passion + temp1) * 2 + (creativity + temp2) * 1.5 + (intelligence + temp3) + 
       (love + temp4) + (patience + temp5) + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } else if (career.name === '急襲部隊') {
       score = (passion + temp1) * 1.5 + (creativity + temp2) * 2 + (intelligence + temp3) + 
       (love + temp4) + (patience + temp5) + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } else if (career.name === '狙擊部隊') {
        score = (passion + temp1) + (creativity + temp2) + (intelligence + temp3) * 2 + 
        (love + temp4) + (patience + temp5) * 1.5 + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } else if (career.name === '防禦部隊') {
        score = (passion + temp1) + (creativity + temp2) + (intelligence + temp3) + 
        (love + temp4) * 1.5 + (patience + temp5) * 2 + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } else if (career.name === '生化小組') {
        score = (passion + temp1) + (creativity + temp2) + (intelligence + temp3) * 1.5 + 
        (love + temp4) * 2 + (patience + temp5) + (freePoint - temp1 - temp2 - temp3 - temp4 - temp5);
       console.log(score);
    } 
   

    const params = {
      free_point: freePoint - temp1 - temp2 - temp3 - temp4 - temp5,
      passion: passion + temp1,
      creativity: creativity + temp2,
      intelligence: intelligence + temp3,
      love: love + temp4,
      patience: patience + temp5,
      team_total_score: score
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
       skillCollegeSuccess(
           dispatch, '配點成功！',
           freePoint - temp1 - temp2 - temp3 - temp4 - temp5,
           passion + temp1,
           creativity + temp2,
           intelligence + temp3,
           love + temp4,
           patience + temp5,
           score
       );
    })
    .catch((err) => {
      console.log(err);// error handling ..
      skillCollegeFailed(dispatch, '發生不可預期的錯誤！\n請截圖至群組並重試');
    });
};


const skillCollegeFailed = (dispatch, text) => {
    dispatch({
      type: SKILL_COLLEGE_FAILED,
      payload: text
    });
};


const skillCollegeSuccess = (
    dispatch, text, 
    freePoint, passion, creativity, intelligence, love, patience, score
) => {
    dispatch({
      type: SKILL_COLLEGE_SUCCESS,
      payload: { text, freePoint, passion, creativity, intelligence, love, patience, score }
    });
};
