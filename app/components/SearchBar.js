import React, {useState} from 'react';
import {View, Button, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Styles from './Styles';
const SearchBar = ({searchHandler}) => {
  const [key, setKey] = useState('');

  return (
    <View style={Styles.searchBarView}>
      <Icon name="search" size={20} color={'grey'} style={Styles.searchIcon} />
      <TextInput
        placeholder="search seller..."
        onChangeText={(text) => {
          setKey(text);
          searchHandler(text);
        }}
        value={key}
        style={Styles.searchText}></TextInput>
    </View>
  );
};

export default SearchBar;
