
import {
    GET_TEAM_DATA,
    GET_TEAM_DATA_JUNIOR_SUCCESS,
    GET_TEAM_DATA_COLLEGE_SUCCESS,
    CAREER_CODE_CHANGED
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
    careerCode: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_TEAM_DATA:
        return { ...state };
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
            agility: action.payload.agility
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
            patience: action.payload.patience
        };
      case CAREER_CODE_CHANGED:
        return { ...state, careerCode: action.payload  }
      default:
        return state;
    }
  };
  
