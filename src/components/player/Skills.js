import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component';
import { Button, SkillRow } from '../common';

const { height, width } = Dimensions.get('window');
class Skills extends Component {
  state = { 
    tableHead: ['信心', '敏捷', '力量', '智慧', '體力'],
    tableData: [
      [17, 36, 42, 12, 28]
    ],

    temp1: 0,
    temp2: 0,
    temp3: 0,
    temp4: 0,
    temp5: 0
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
            if (this.props.free_point > 0) {
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

  render() {
    const { 
      container,
      freePointContainer,
      freePointTextStyle,
      freePointNumTextStyle,
      tableHead,
      tableHeadText,
      tableRow,
      tableRowText,
      btnAreaStyle
    } = styles;
    return (
      <View style={container}>

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
        <View style={btnAreaStyle}>
          <Button 
          btnCustomStyle={{ 
            backgroundColor: '#E63F00', 
            marginRight: width * 0.12, 
            borderColor: '#E63F00' }}
          >
            重置
          </Button>
          <Button 
            btnCustomStyle={{ 
              marginLeft: width * 0.12,
            }}
          >
            確定
          </Button>
        </View>
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
    batch, //國高or大專
    skillTable,
    tableHead,
    tableData,

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
    batch, //國高or大專
    skillTable,
    tableHead,
    tableData,

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

export default connect(mapStateToProps, {})(Skills);

