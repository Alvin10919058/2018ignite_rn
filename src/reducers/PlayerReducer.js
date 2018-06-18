
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
    MISSION_CODE_FINISHED,
    MISSION_CODE_FAILED
  } from '../actions/types';
  
  const INITIAL_STATE = {
    batch: '', //國高or大專
    camp: '', //陣營
    name: '', //第幾小隊
    done_submission: [], //完成幾個支線任務
    completed: false, //是否完成支線任務
    team_total_score: 0, //總分
    free_point: 0, //自由點數
    career: [], //職業

    //國高能力值
    strength: 0, //力量
    wisdom: 0, //智慧
    vitality: 0, //體力
    faith: 0, //信心
    agility: 0, //敏捷

    //大專能力值
    passion: 0, //熱情
    creativity: 0, //創意
    intelligence: 0, //智慧
    love: 0, //愛心
    patience: 0, //耐力

    //
    careerCode: '',
    showCodeModal: false,
    showErrorModal: false,
    errorText: '',
    loading: false,
    mission: [], //紀錄支線任務內容
    missionCode: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_TEAM_DATA:
        return { ...state, loading: true };
      case GET_TEAM_DATA_JUNIOR_SUCCESS:
        return { 
            ...state,
            batch: action.payload.responseData.batch,
            camp: action.payload.responseData.camp,
            name: action.payload.responseData.name,
            done_submission: action.payload.responseData.done_submission,
            completed: action.payload.responseData.completed,
            team_total_score: action.payload.responseData.team_total_score,
            free_point: action.payload.responseData.free_point,
            career: action.payload.responseData.career,
            //能力值
            strength: action.payload.responseData.strength,
            wisdom: action.payload.responseData.wisdom,
            vitality: action.payload.responseData.vitality,
            faith: action.payload.responseData.faith,
            agility: action.payload.responseData.agility,
            //
            loading: false,
            mission: action.payload.mission
        };
      case GET_TEAM_DATA_COLLEGE_SUCCESS:
        return { 
            ...state,
            batch: action.payload.responseData.batch,
            camp: action.payload.responseData.camp,
            name: action.payload.responseData.name,
            done_submission: action.payload.responseData.done_submission,
            completed: action.payload.responseData.completed,
            team_total_score: action.payload.responseData.team_total_score,
            free_point: action.payload.responseData.free_point,
            career: action.payload.responseData.career,
            //能力值
            passion: action.payload.responseData.passion,
            creativity: action.payload.responseData.creativity,
            intelligence: action.payload.responseData.intelligence,
            love: action.payload.responseData.love,
            patience: action.payload.responseData.patience,
            //
            loading: false,
            mission: action.payload.mission
        };
      case CODE_MODAL_TYPE:
        return { ...state, showCodeModal: action.payload };
      case ERROR_MODAL_TYPE:
        return { 
          ...state, 
          showErrorModal: action.payload.type, 
          errorText: action.payload.text
        };
      case CAREER_CODE_CHANGED:
        return { ...state, careerCode: action.payload };
      case CAREER_GROW_UP:
        return { ...state, showCodeModal: false, loading: true };
      case CAREER_GROW_UP_FINISHED:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload, 
          careerCode: '', 
          loading: false 
        };
      case CAREER_GROW_UP_SUCCESS:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload.text, 
          career: action.payload.responseData,
          careerCode: '', 
          loading: false 
        };
      case MISSION_CODE_CHANGED: 
        return { ...state, missionCode: action.payload };
      case MISSION_CODING:
        return { ...state, showCodeModal: false, loading: true };
      case MISSION_CODE_FINISHED:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload.text, 
          mission: action.payload.mission,
          missionCode: '', 
          loading: false 
        };
      case MISSION_CODE_FAILED:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload, 
          missionCode: '', 
          loading: false 
        };
      default:
        return state;
    }
  };
  
