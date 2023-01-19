import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeedItem from './FeedItem';

const Feed = ({ data, showToast }) => {
  return (
    <View style={styles.newContainer}>
      <Text style={styles.newText}>최신 영상을 확인해보세요!</Text>
      <View style={styles.center}>
        {data.map((item, index) => <FeedItem key={'key' + index} item={item} showToast={showToast} />)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  newContainer: {
    backgroundColor: '#E5F0FF',
    paddingBottom: 30,
  },
  newBox: {
    borderRadius: 10,
    backgroundColor: '#FFFBFD',
    marginBottom: 20,
    padding: 5
  },
  newText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3A4563',
    margin: 25,
    marginBottom: 15
  },
  center: {
    alignItems: 'center'
  },
})

export default Feed;