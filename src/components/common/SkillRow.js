import React from 'react';
import { 
  Text, 
  Image, 
  View, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { Add, Sub } from '../../images';

const { width } = Dimensions.get('window');

const SkillRow = ({
    chineseName,
    subOnPress,
    value,
    addOnPress
}) => {
const { 
    skillRowStyle,
    skillTextStyle,
    iconStyle,
    skillValueStyle,
} = styles;

  return (
    <View style={skillRowStyle}>
        <Text style={skillTextStyle}>
        {chineseName} 
        </Text>
        <TouchableOpacity onPress={subOnPress}>
            <Image style={iconStyle} source={Sub} />
        </TouchableOpacity>

        <View style={skillValueStyle}>
        <Text style={skillTextStyle}>
            {value}
        </Text>
        </View>

        <TouchableOpacity onPress={addOnPress}>
            <Image style={iconStyle} source={Add} />
        </TouchableOpacity>
    </View>
  );
};

const styles = {
    skillRowStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    skillTextStyle: {
        fontSize: 20
    },
    skillValueStyle: {
        width: width * 0.15, 
        alignItems: 'center'
    },
        iconStyle: {
        width: 30, 
        height: 30
    },
};

export { SkillRow };
