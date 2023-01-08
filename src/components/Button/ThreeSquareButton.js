import React from "react";
import { StyleSheet, View } from 'react-native';
import SquareIconText from "../Text/SquareIconText";

const ThreeSquareButton = () => {
  return (
    <View style={styles.threeButton}>
      <SquareIconText
        iconName='flag'
        iconType='ionicons'
        iconColor='#384BF5'
        text='퀘스트' />
      <SquareIconText
        iconName='gift'
        iconType='font-awesome'
        iconColor='#EC6A66'
        text='리워드' />
      <SquareIconText
        iconName='magic'
        iconType='font-awesome'
        iconColor='#3D4664'
        text='캐릭터 꾸미기' />
    </View>
  );
};

const styles = StyleSheet.create({
  threeButton: {
    flexDirection: 'row',
  }
});

export default ThreeSquareButton;