
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
    showErrorModal: false,
    errorText: '',
    loading: true,
    mission: [], //紀錄支線任務內容
    missionCode: '',
    resetCode: '',

    //技能
    skillTable: [],
    tableHead: [],
    tableData: [],
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_TEAM_DATA:
        return { ...state };
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
            mission: action.payload.mission,
            //技能
            tableHead: ['力量', '智慧', '體力', '信心', '敏捷'],
            tableData: [[
              action.payload.responseData.strength,
              action.payload.responseData.wisdom,
              action.payload.responseData.vitality,
              action.payload.responseData.faith,
              action.payload.responseData.agility
              ]
            ],
            skillTable: [
              { 
                id: 1,
                chineseName: '力量',
                value: action.payload.responseData.strength,
                valueName: 'temp1'
              },
              { 
                id: 2,
                chineseName: '智慧',
                value: action.payload.responseData.wisdom,
                valueName: 'temp2'
              },
              {
                id: 3,
                chineseName: '體力',
                value: action.payload.responseData.vitality,
                valueName: 'temp3'
              },
              {
                id: 4,
                chineseName: '信心',
                value: action.payload.responseData.faith,
                valueName: 'temp4'
              },
              {
                id: 5,
                chineseName: '敏捷',
                value: action.payload.responseData.agility,
                valueName: 'temp5'
              }
            ] 
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
            mission: action.payload.mission,
             //技能
             tableHead: ['熱情', '創意', '智慧', '愛心', '耐力'],
             tableData: [[
                action.payload.responseData.passion,
                action.payload.responseData.creativity,
                action.payload.responseData.intelligence,
                action.payload.responseData.love,
                action.payload.responseData.patience
              ]
             ],
             skillTable: [
              { 
                id: 1,
                chineseName: '熱情',
                value: action.payload.responseData.passion,
                valueName: 'temp1'
              },
              { 
                id: 2,
                chineseName: '創意',
                value: action.payload.responseData.creativity,
                valueName: 'temp2'
              },
              {
                id: 3,
                chineseName: '智慧',
                value: action.payload.responseData.intelligence,
                valueName: 'temp3'
              },
              {
                id: 4,
                chineseName: '愛心',
                value: action.payload.responseData.love,
                valueName: 'temp4'
              },
              {
                id: 5,
                chineseName: '耐力',
                value: action.payload.responseData.patience,
                valueName: 'temp5'
              }
            ] 
        };
      case ERROR_MODAL_TYPE:
        return { 
          ...state, 
          showErrorModal: action.payload.type, 
          errorText: action.payload.text
        };
      case CAREER_CODE_CHANGED:
        return { ...state, careerCode: action.payload };
      case CAREER_GROW_UP:
        return { ...state, loading: true };
      case CAREER_GROW_UP_FINISHED:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload, 
          careerCode: '', 
          missionCode: '', 
          loading: false 
        };
      case CAREER_GROW_UP_SUCCESS:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload.text, 
          career: action.payload.responseData,
          careerCode: '', 
          missionCode: '', 
          loading: false 
        };
      case MISSION_CODE_CHANGED: 
        return { ...state, missionCode: action.payload };
      case MISSION_CODING:
        return { ...state, loading: true };
      case MISSION_CODE_FINISHED:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload.text, 
          mission: action.payload.mission,
          careerCode: '',
          missionCode: '', 
          loading: false 
        };
      case MISSION_CODE_FAILED:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload, 
          careerCode: '',
          missionCode: '', 
          loading: false 
        };
      case RESET_CODE_CHANGED: 
        return { ...state, resetCode: action.payload };
      case SKILL_JUNIOR:
        return { ...state, loading: true };
      case SKILL_JUNIOR_FAILED:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload, 
          loading: false 
        };
      case SKILL_JUNIOR_SUCCESS:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload.text, 
          loading: false,
          //能力值
          team_total_score: action.payload.score,
          free_point: action.payload.freePoint,
          strength: action.payload.strength,
          wisdom: action.payload.wisdom,
          vitality: action.payload.vitality,
          faith: action.payload.faith,
          agility: action.payload.agility,
          tableData: [[
            action.payload.strength,
            action.payload.wisdom,
            action.payload.vitality,
            action.payload.faith,
            action.payload.agility
            ]
          ],
        };
      case SKILL_COLLEGE:
       return { ...state, loading: true };
      case SKILL_COLLEGE_FAILED:
        return { 
          ...state, 
          showErrorModal: true, 
          errorText: action.payload, 
          loading: false 
        };
      case SKILL_COLLEGE_SUCCESS:
      return { 
        ...state, 
        showErrorModal: true, 
        errorText: action.payload.text, 
        loading: false,
        //能力值
        team_total_score: action.payload.score,
        free_point: action.payload.freePoint,
        passion: action.payload.passion,
        creativity: action.payload.creativity,
        intelligence: action.payload.intelligence,
        love: action.payload.love,
        patience: action.payload.patience,
        tableData: [[
          action.payload.passion,
          action.payload.creativity,
          action.payload.intelligence,
          action.payload.love,
          action.payload.patience
          ]
        ],
      };
      default:
        return state;
    }
  };
  
