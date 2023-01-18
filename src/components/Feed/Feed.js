import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import FeedItem from './FeedItem';

const { width, heigth } = Dimensions.get('window')
let flatList

const Feed = ({ data }) => {
  return (
    <View style={styles.newContainer}>
      <Text style={styles.newText}>최신 영상을 확인해보세요!</Text>
      <View style={styles.center}>
        <FlatList data={data}
          ref = {(flatList) => {this.flatList = flatList}}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => {
                return <FeedItem item={item} />
            }}
        />
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