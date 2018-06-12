
import {
    GET_TEAM_DATA,
    GET_TEAM_DATA_SUCCESS
  } from '../actions/types';
  
  const INITIAL_STATE = {
    batch: '', //國高or大專
    camp: '', //陣營
    name: '', //第幾小隊
    done_submission: [], //完成幾個支線任務
    completed: false, //是否完成支線任務
    team_total_score: 0, //總分
    free_point: 0, //自由點數

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
    patience: 0//耐力
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_TEAM_DATA:
        return { ...state };
      case GET_TEAM_DATA_SUCCESS:
        return { ...state };
      default:
        return state;
    }
  };
  
