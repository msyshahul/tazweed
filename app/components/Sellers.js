import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Schedules from './Schedules';
const SellerItem = ({seller}) => {
  const [selected, setSelected] = useState(false);
  const collapseHandler = () => {
    setSelected(!selected);
  };
  return (
    <TouchableOpacity
      style={Styles.sellerItem}
      onPress={() => {
        collapseHandler();
      }}>
      <View style={Styles.sellerItemView}>
        <Text style={Styles.sellerItemText}>{seller.name}</Text>
        <Icon name="chevron-down" size={20} color={'grey'} />
      </View>
      {selected && <Schedules schedules={seller.schedules} />}
    </TouchableOpacity>
  );
};

const Sellers = ({sellers}) => {
  return (
    <FlatList
      data={sellers}
      renderItem={({item}) => <SellerItem seller={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
export default Sellers;
