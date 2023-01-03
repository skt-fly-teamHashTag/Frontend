import React from 'react';
import {
  StyleSheet, 
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

const Home = () => {
  return (
    <View style={styles.main}>
      <Image 
        source={require("../images/mainGif.gif")}
        style={styles.mainGif} />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        style={styles.contents}>
        <View style={styles.contentBtn}>
          <Image source={require("../images/game.png")} style={styles.iconStyle}/>
          <Text style = {styles.textStyle}>
              고민 들어줘
          </Text>
        </View>
        <View style={styles.contentBtn}>
          <Image source={require("../images/rabbit.png")} style={styles.iconStyle}/>
          <Text style = {styles.textStyle}>
              95년생은 몇 살이야?
          </Text>
        </View>
        <View style={styles.contentBtn}>
          <Image source={require("../images/calculator.png")} style={styles.iconStyle}/>
          <Text style = {styles.textStyle}>
              102 빼기 45는?
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%', 
    height: '100%',
    backgroundColor: '#FFFBFD'
  },
  mainGif: {
    width: '100%',
    height: 500,
    marginTop: '5%'
  },
  contents: {
    maxHeight: 60,
    marginLeft: 15, 
    marginTop: 10,
    marginBottom: 20
  },
  iconStyle: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  textStyle: {
    fontSize: 16
  },
  contentBtn: {
    height: 50,
    backgroundColor: '#F4F6F9',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E9EAF3',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    margin: 5
  },
});

export default Home;