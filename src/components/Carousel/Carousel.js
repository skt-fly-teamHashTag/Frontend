import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItem from './CarouselItem'


const { width, heigth } = Dimensions.get('window')
let flatList

function infiniteScroll(dataList){
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(() => {
        scrolled ++
        if(scrolled < numberOfData)
        scrollValue = scrollValue + width

        else{
            scrollValue = 0
            scrolled = 0
        }

        this.flatList.scrollToOffset({ animated: true, offset: scrollValue})
        
    }, 3000)
}


const Carousel = ({ data }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)

    useEffect(()=> {
      setDataList(data)
      infiniteScroll(dataList)
    })


    if (data && data.length) {
      return (
        <View>
          <FlatList data={data}
            ref = {(flatList) => {this.flatList = flatList}}
              keyExtractor={(item, index) => 'key' + index}
              horizontal
              pagingEnabled
              scrollEnabled
              snapToAlignment="center"
              decelerationRate={"fast"}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                  return <CarouselItem item={item} index={index} />
              }}
              onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }, 
              )}
          />

          <View style={styles.dotView}>
            {data.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              })
              return (
                <Animated.View
                    key={i}
                    style={{ opacity, height: 9, width: 9, backgroundColor: '#384BF5', margin: 8, borderRadius: 5 }}
                />
              )
            })}

          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    dotView: { 
      flexDirection: 'row', 
      justifyContent: 'center',
      marginBottom: 15
    }
})

export default Carousel