import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItem from './CarouselItem'


const { width, heigth } = Dimensions.get('window')
let flatList

const Carousel = ({ data, showToast }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)

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
                return <CarouselItem item={item} index={index} showToast={showToast} />
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
    } else {
      return (<></>)
    }
}

const styles = StyleSheet.create({
    dotView: { 
      flexDirection: 'row', 
      justifyContent: 'center',
      marginBottom: 15
    }
})

export default Carousel;