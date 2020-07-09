import React from 'react';
import {FlatList, View, Text, TouchableOpacity, Button} from 'react-native';
import {baseUrl} from '../config/api';
import {userId} from '../config/user';
import Styles from './Styles';
const ScheduleItem = ({schedule}) => {
  const scheduleHandler = async () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    try {
      let result = await fetch(baseUrl + '/appointments/', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          schedule: schedule.title,
          buyer: userId,
          seller: schedule.seller,
        }),
      });

      if (result.status === 200)
        alert('your request has been added succesfully');
    } catch (err) {
      console.log(err);
    }
    console.log('scheduleHandler', schedule.id);
  };
  return (
    <View style={Styles.sellerItemView} style={{padding: 15}}>
      <Text
        style={Styles.sellerItemText}
        style={{
          flex: 1,
          color: '#2296F3',
          fontSize: 20,
          marginBottom: 5,
        }}>
        {schedule.title}
      </Text>
      <Button
        title="Request Appointment"
        onPress={() => {
          scheduleHandler();
        }}
        style={{flex: 1}}
      />
    </View>
  );
};

const Schedules = ({schedules}) => {
  return (
    <>
      <Text style={{fontSize: 18, padding: 10}}>Schedules:</Text>
      <FlatList
        data={schedules}
        renderItem={({item}) => <ScheduleItem schedule={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default Schedules;
