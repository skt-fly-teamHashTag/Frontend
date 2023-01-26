import React from 'react';
import { StyleSheet, View, Text, Image } from "react-native";

const SummaryText = () => {
  return (
    <View style={styles.summaryBox}>
      <Text style={styles.summaryText}>비디오 요약중입니다</Text>
      <Image source={require('../../assets/videoLoadingGif.gif')} style={styles.summaryGif} />
    </View>
  )
}

const styles = StyleSheet.create({
  summaryBox: {
    backgroundColor: '#384BF5', 
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    width: '100%',
    opacity: 0.9
  },
  summaryText: {
    fontSize: 14,
    color: 'white'
  },
  summaryGif: {
    width: 14,
    height: 14,
    marginLeft: 5
  }
})

export default SummaryText;