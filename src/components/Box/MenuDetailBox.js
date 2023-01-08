import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import IconTextButton from "../Button/IconTextButton";

const MenuDetailBox = ({ title, navigation }) => {
  return (
    title === '편하닷' && (
    <View>
      <Text style={styles.menuTitle}>{title}</Text>
      <View style={styles.detailMenuBox}>
        <IconTextButton
          iconName='clockcircle'
          iconType='ant-design'
          iconColor='#75A8F6'
          text='루틴' />
        <IconTextButton
          iconName='calendar-alt'
          iconType='font-awesome-5'
          iconColor='#4274DA'
          text='캘린더' />
        <IconTextButton
          iconName='map-marked-alt'
          iconType='font-awesome-5'
          iconColor='#5CBDC5'
          text='TMAP' />
        <IconTextButton
          iconName='folder-video'
          iconType='entypo'
          iconColor='#7378FF'
          text='비디오닷'
          onPress={()=>{navigation.navigate('Main')}} />
      </View>
    </View>) ||
    title === '궁금하닷' &&  (
    <View>
      <Text style={styles.menuTitle}>{title}</Text>
      <View style={styles.detailMenuBox}>
        <IconTextButton
          iconName='checksquare'
          iconType='ant-design'
          iconColor='#61C991'
          text='큐피드' />
        <IconTextButton
          iconName='questioncircle'
          iconType='ant-design'
          iconColor='#5061F5'
          text='튜토리얼' />
      </View>
    </View>) ||
    title === '재미있닷' && (
    <View>
      <Text style={styles.menuTitle}>{title}</Text>
      <View style={styles.detailMenuBox}>
        <IconTextButton
          iconName='tv'
          iconType='feather'
          iconColor='#5E55F6'
          text='TV' />
        <IconTextButton
          iconName='gamepad'
          iconType='font-awesome-5'
          iconColor='#F3B444'
          text='게임' />
        <IconTextButton
          iconName='magic'
          iconType='font-awesome'
          iconColor='#4E75F6'
          text='포토' />
        <IconTextButton
          iconName='library-music'
          iconType='materialIcons'
          iconColor='#3A3BF5'
          text='음악추천' />
      </View>
    </View>)
  );
};

const styles = StyleSheet.create({
  menuTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailMenuBox: {
    flexDirection: 'row',
    marginTop:10,
    flexWrap: 'wrap',
    width: '100%'
  }
});

export default MenuDetailBox;