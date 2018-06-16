
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
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_TEAM_DATA:
        return { ...state, loading: true };
      case GET_TEAM_DATA_JUNIOR_SUCCESS:
        return { 
            ...state,
            batch: action.payload.batch,
            camp: action.payload.camp,
            name: action.payload.name,
            done_submission: action.payload.done_submission,
            completed: action.payload.completed,
            team_total_score: action.payload.team_total_score,
            free_point: action.payload.free_point,
            career: action.payload.career,
            //能力值
            strength: action.payload.strength,
            wisdom: action.payload.wisdom,
            vitality: action.payload.vitality,
            faith: action.payload.faith,
            agility: action.payload.agility,

            //
            loading: false
        };
      case GET_TEAM_DATA_COLLEGE_SUCCESS:
        return { 
            ...state,
            batch: action.payload.batch,
            camp: action.payload.camp,
            name: action.payload.name,
            done_submission: action.payload.done_submission,
            completed: action.payload.completed,
            team_total_score: action.payload.team_total_score,
            free_point: action.payload.free_point,
            career: action.payload.career,
            //能力值
            passion: action.payload.passion,
            creativity: action.payload.creativity,
            intelligence: action.payload.intelligence,
            love: action.payload.love,
            patience: action.payload.patience,

            //
            loading: false
        };
      case CODE_MODAL_TYPE:
      return { ...state, showCodeModal: action.payload };
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
      case CLOSE_ERROR_MODAL:
        return { ...state, showErrorModal: false, errorText: '' };
      case CAREER_GROW_UP_SUCCESS:
         return { 
           ...state, 
           showErrorModal: true, 
           errorText: action.payload.text, 
           career: action.payload.responseData,
           careerCode: '', 
           loading: false 
          };
      default:
        return state;
    }
  };
  
