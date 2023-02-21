import React from "react";
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import HelloText from "../Text/HelloText";
import ThreeSquareButton from "../Button/ThreeSquareButton";
import MenuBox from "../Box/MenuBox";
import MenuBottomTextBox from "../Box/MenuBottomTextBox";
import { useSelector } from "react-redux";

const MenuScrollView = () => {
  const { nickName } = useSelector((state) => state.user);

  return (
    <ScrollView style={styles.menu} showsVerticalScrollIndicator = {false}>
      <View style={styles.menuContents}>
        <Image source={require("../../assets/profile.png")} style={styles.profile} />
        <HelloText userName={nickName} />
        <ThreeSquareButton />
        <MenuBox />
        <MenuBottomTextBox />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: 5,
  },
  headerIcon: {
    marginRight: 20
  },
  menuContents:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  profile: {
    width: 350,
    height: 230,
  }
});

export default MenuScrollView;