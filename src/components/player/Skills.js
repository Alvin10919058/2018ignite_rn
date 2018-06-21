import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component';
import { 
  resetCodeChanged,
  skillJunior,
  skillCollege,
  resetCodeJunior,
  resetCodeCollege,
  errorModalType
} from '../../actions';
import { Button, SkillRow, InputModal, Spinner } from '../common';

const { height, width } = Dimensions.get('window');
class Skills extends Component {
  state = { 
    showSureModal: false,
    showResetModal: false,
    temp1: 0,
    temp2: 0,
    temp3: 0,
    temp4: 0,
    temp5: 0
  }

  //重loading資料時暫存點數歸零
  componentWillReceiveProps() {
    console.log('HIHIH');
    this.setState({
      temp1: 0,
      temp2: 0,
      temp3: 0,
      temp4: 0,
      temp5: 0
    });
  }

  onResetCodeChange(text) {
    this.props.resetCodeChanged(text);
  }

  renderSkill() {
    return this.props.skillTable.map(
      skills => (
        <SkillRow
          key={skills.id}
          chineseName={skills.chineseName}
          value={this.state[skills.valueName]}
          subOnPress={() => {
            if (this.state[skills.valueName] > 0) {
              this.setState((previousState) => {
                return {
                  [skills.valueName]: previousState[skills.valueName] - 1
                };
              });
            }
          }}
          addOnPress={() => {
            if (
              this.props.free_point -
              this.state.temp1 -
              this.state.temp2 -
              this.state.temp3 -
              this.state.temp4 -
              this.state.temp5    
              > 0
            ) {
              this.setState((previousState) => {
                return {
                  [skills.valueName]: previousState[skills.valueName] + 1
                };
              });
            }
          }}
        />
      )
    );
  }

  renderButton() {
    const { btnAreaStyle } = styles;

    return (
      <View style={btnAreaStyle}>
        <Button 
          btnCustomStyle={{ 
            backgroundColor: '#ED2A67', 
            marginRight: width * 0.12, 
            borderColor: '#ED2A67' 
          }}
          onPress={() => {
            this.setState({ showResetModal: true });
          }}
        >
          重置
        </Button>
        <Button 
          btnCustomStyle={{ 
            marginLeft: width * 0.12,
          }}
          onPress={() => {
            this.setState({ showSureModal: true });
          }}
        >
          送出
        </Button>
      </View>
    );
  }

  render() {
    const { 
      container,
      freePointContainer,
      freePointTextStyle,
      freePointNumTextStyle,
      tableHead,
      tableHeadText,
      tableRow,
      tableRowText
    } = styles;

    if (this.props.loading) {
      return (
        <Spinner />
      );
    } 

    return (
      <View style={container}>
         <InputModal
           titleText={'請輸入序號來重置所有能力值:'}
           visible={this.state.showResetModal}
           cancelButton
           scrollable={false}
           cancel={() => { 
            this.setState({ showResetModal: false }); 
          }}
           onPress={() => { 
             if (this.props.batch === '國高') {
                this.props.resetCodeJunior(
                  this.props.resetCode,
                  this.props.free_point,
                  this.props.strength,
                  this.props.wisdom,
                  this.props.vitality,
                  this.props.faith,
                  this.props.agility,
                );
                this.setState({ showResetModal: false }); 
             } else {
              this.props.resetCodeCollege(
                  this.props.resetCode,
                  this.props.free_point,
                  this.props.passion,
                  this.props.creativity,
                  this.props.intelligence,
                  this.props.love,
                  this.props.patience,
              );
              this.setState({ showResetModal: false }); 
             }
           }}
           inputText
           value={this.props.resetCode}
           onChangeText={(text) => { this.onResetCodeChange(text); }}
         />
        <InputModal
           titleText={'請確認您配置的能力值點數\n送出後將無法回復!'}
           visible={this.state.showSureModal}
           cancelButton
           scrollable={false}
           cancel={() => { 
            this.setState({ showSureModal: false }); 
           }}
           onPress={() => { 
            if (this.props.batch === '國高') {
              this.props.skillJunior(
                this.props.free_point,
                this.props.strength,
                this.props.wisdom,
                this.props.vitality,
                this.props.faith,
                this.props.agility,
                this.props.career,
                this.state.temp1,
                this.state.temp2,
                this.state.temp3,
                this.state.temp4,
                this.state.temp5,
              );
              this.setState({ showSureModal: false });
            } else {
             this.props.skillCollege(
                this.props.free_point,
                this.props.passion,
                this.props.creativity,
                this.props.intelligence,
                this.props.love,
                this.props.patience,
                this.props.career,
                this.state.temp1,
                this.state.temp2,
                this.state.temp3,
                this.state.temp4,
                this.state.temp5,
             );
             this.setState({ showSureModal: false });
            }
           }}
        />
        <InputModal
          titleText={this.props.errorText}
          scrollable={false}
          visible={this.props.showErrorModal}
          onPress={() => { this.props.errorModalType(false, ''); }}
        />
        <View style={freePointContainer}>
          <Text style={freePointTextStyle}>自由點數</Text>
          <Text style={freePointNumTextStyle}>{
            this.props.free_point -
            this.state.temp1 -
            this.state.temp2 -
            this.state.temp3 -
            this.state.temp4 -
            this.state.temp5    
          }</Text>        
        </View>

        <Table 
          borderStyle={{ borderWidth: 2, borderColor: '#fff' }}
          style={{ flex: 2 }}
        >
            <Row 
              data={this.props.tableHead} 
              style={tableHead} 
              textStyle={tableHeadText} 
            />
            <Rows
                data={this.props.tableData}
                style={tableRow}
                textStyle={tableRowText}
            />
        </Table>
        {this.renderSkill()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  freePointContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  freePointNumTextStyle: {
    fontWeight: 'bold', 
    fontSize: 25
  },
  freePointTextStyle: {
    fontWeight: 'bold', 
    fontSize: 22, 
    marginBottom: height * 0.01
  },
  tableHead: { 
    height: 40,
    backgroundColor: '#AAAAAA'
  },
  tableRowText: { 
    margin: 6,
    textAlign: 'center', 
    fontWeight: '400' 
  },
  tableHeadText: {
    fontSize: 16,
    margin: 6,
    textAlign: 'center', 
    fontWeight: '600',
    color: 'white'
  },
  tableRow: { 
    height: 40, 
    backgroundColor: '#BBC3DC' 
  },
  btnAreaStyle: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const mapStateToProps = ({ player }) => {
  const {  
    batch,
    career,
    skillTable,
    tableHead,
    tableData,
    resetCode,
    showErrorModal,
    errorText,
    loading,

    free_point, //自由點數

    //國高能力值
    strength, //力量
    wisdom, //智慧
    vitality, //體力
    faith, //信心
    agility, //敏捷

    //大專能力值
    passion, //熱情
    creativity, //創意
    intelligence, //智慧
    love, //愛心
    patience, //耐力
   } = player;

  return { 
    batch,
    career,
    skillTable,
    tableHead,
    tableData,
    resetCode,
    showErrorModal,
    errorText,
    loading,

    free_point, //自由點數

    //國高能力值
    strength, //力量
    wisdom, //智慧
    vitality, //體力
    faith, //信心
    agility, //敏捷

    //大專能力值
    passion, //熱情
    creativity, //創意
    intelligence, //智慧
    love, //愛心
    patience, //耐力
  };
};

export default connect(mapStateToProps, {
  resetCodeChanged,
  skillJunior,
  skillCollege,
  resetCodeJunior,
  resetCodeCollege,
  errorModalType
})(Skills);
