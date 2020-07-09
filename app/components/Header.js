import React from 'react';
import {View, Text} from 'react-native';
import Styles from './Styles';
const Header = ({title}) => {
  return (
    <View style={Styles.header}>
      <Text style={Styles.title}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: 'Tazweed App',
};
export default Header;
