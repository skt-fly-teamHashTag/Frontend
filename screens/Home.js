import React from 'react';
import {
  StyleSheet, 
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { Icon } from '@rneui/themed';

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
      <View style={styles.bottomBtn}>
        <View style={styles.inputs}>
          <Icon name="microphone" size={28} color='white' style={styles.mic} type='material-community' />
          <Icon name="keyboard-outline" size={28} color='#081EF4' style={styles.keyboard} type='material-community' />
        </View>
        <View style={{position: 'absolute', right: 0}}>
          <Icon name="refresh" size={28} color='#081EF4' style={styles.refresh} type='material-community' />
        </View>
      </View>
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
  bottomBtn: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    width: 110, 
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },  
  mic: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081EF4',
    borderRadius: 50,
    width: 55,
    height: 55,
  },
  keyboard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  refresh: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    height: 45,
    width: 45,
    margin: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  }
});

export default Home;