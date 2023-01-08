import React from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon } from '@rneui/themed';
import RoundIconText from "../Text/RoundIconText";

const IconHorizontalScrollView = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator = {false}
      style={styles.horizontalScrollView}>
      <RoundIconText 
        iconName='game-controller-sharp'
        iconType='ionicon' 
        iconColor='#F3B444' 
        text='고민 들어줘' />
      <RoundIconText 
        iconName='rabbit'
        iconType='material-community' 
        iconColor='#FFA2C1' 
        text='95년생은 몇 살이야?' />
      <RoundIconText 
        iconName='calculate'
        iconType='material'
        iconColor='#61C991' 
        text='102 빼기 45는?' />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScrollView: {
    maxHeight: 60,
    marginLeft: 15, 
    marginTop: 10,
    marginBottom: 20
  },
});

export default IconHorizontalScrollView;