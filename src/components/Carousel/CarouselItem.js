import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item, index }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.cardView} onPress={() => navigation.navigate('FeedDetail', item)}>
      <Text style={styles.contentTitle}>인기 급상승 영상 Top { item.index }</Text>
      <Image style={styles.image} source={{ uri: item.thumbnail }} />
      <View style={styles.hotBottomText}>
        <Text style={styles.hashTag}>{ item.tags }</Text>
        <View style={styles.heartBox}>
          <Icon name='heart' type='font-awesome' color='#FE646F' size={16}></Icon>
          <Text style={styles.heartText}>{ item.heart }</Text>
        </View>
      </View>
      <Text style={styles.hotTitle}>{ item.title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    marginHorizontal: (width - 330) / 2,
    marginVertical: 10,
    marginTop: 20,
    padding: 5,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 300,
    height: 200,
    backgroundColor: '#F1F4F9',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#F1F4F9',
    margin: 10
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 0
  },
  hotBottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 5,
    alignItems: 'center'
  },
  heartBox: {
    flexDirection: 'row'
  },
  heartText: {
    color: '#FE646F',
    marginLeft: 5
  },
  hotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 5
  }
})

export default CarouselItem