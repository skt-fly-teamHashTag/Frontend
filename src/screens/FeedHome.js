import React from "react";
import axios from "axios";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Icon } from "@rneui/themed";

const FeedHome = () => {
  return (
    <View style={styles.container}>
      <Text>나만의 Vlog</Text>
      <Text>이번주 Hot 랭킹을 확인해보세요!!</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        style={styles.horizontalScrollView}>
        <View style={styles.hotBox}>
          <Text>인기 급상승 영상</Text>
        </View>
        <View style={styles.hotBox}>
          <Text>인기 급하락 영상</Text>
        </View>
      </ScrollView>
      <View style={styles.scrollCircle}>
        <Icon name='circle' type="font-awesome" color='#384BF5' size={9} style={styles.circle} />
        <Icon name='circle' type="font-awesome" color='#D9D9D9' size={9} style={styles.circle} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator = {false}
        style={styles.verticalScrollView}>
        <View style={styles.center}>
          <View style={styles.newBox}>
            <Text>최신 영상</Text>
          </View>
          <View style={styles.newBox}>
            <Text>덜 최신 영상</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFBFD',
    alignItems: 'center'
  },
  hotBox: {
    margin: 37.5,
    width: 300,
    height: 200,
    backgroundColor: '#F4F6F9',
    borderRadius: 10,
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
  scrollCircle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  circle: {
    marginLeft: 5,
    marginRight: 5
  },
  verticalScrollView: {
    backgroundColor: '#E5F0FF',
    width: '100%',
  },
  newBox: {
    width: 300,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#FFFBFD',
    marginTop: 30,
  },
  center: {
    alignItems: 'center'
  }
});

export default FeedHome;