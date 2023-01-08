import React from "react";
import { StyleSheet, View, Image } from 'react-native';
import { Icon } from '@rneui/themed';

const InputBottom = () => {
  return (
    <View style={styles.bottomBtn}>
      <View style={[styles.centerIcons, styles.shadow]}>
        <Icon 
          name='microphone'
          type='material-community' 
          size={28} color='white' style={styles.mic} />
        <Icon 
          name='keyboard-outline'
          type='material-community' 
          size={28} color='#081EF4' style={styles.keyboard} />
      </View>
      <View style={styles.rightIcon}>
        <Icon 
          name='refresh'
          type='material-community' 
          size={28} color='#081EF4' style={[styles.refresh, styles.shadow]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBtn: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIcons: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    width: 110,
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
  rightIcon: {
    position: 'absolute', 
    right: 0
  },
  refresh: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    height: 45,
    width: 45,
    margin: 20,
  },
  shadow: {
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
});

export default InputBottom;