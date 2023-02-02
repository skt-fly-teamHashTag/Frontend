import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, FlatList, Alert } from "react-native";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from '../slices/searchSlice';
import SearchItem from "../components/Search/SearchItem";
import Toast from 'react-native-toast-message';
import { dummyData } from "../datas/Data";
import SummaryText from "../components/Text/SummaryText";
import { URL } from "../api";
import axios from "axios";

const SearchResult = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const data = route.params
  const search = useSelector((state) => state.search);
  const summarizing = useSelector((state) => state.summary.summary);
  const correct = /[가-힣a-zA-Z]{2,}/.test(search.inputText);

  const toastConfig = {
    likeToast: ({ text1, props }) => (
      <View style={styles.toastBox}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    )
  };

  const showToast = (isLiked) => {
    Toast.show({
      type: "likeToast",
      text1: isLiked ? "좋아요를 취소했습니다." : "좋아요를 눌렀습니다.",
      position: "bottom",
      visibilityTime: 2000
    })
  }

  const onPressBack = () => {
    dispatch(setSearch({inputText: ''}));
    axios.get(URL.getAllFeeds)
    .then(response => navigation.navigate('FeedHome', response.data.body))
    .catch(error => console.log(error));
  };

  const onSubmit = async() => {
    if (correct) {
      const response = await axios.get(URL.getSearchFeeds, {params: { keyword: search.inputText }});
      navigation.navigate('SearchResult', response.data);
    } else {
      Alert.alert(
        "검색 실패",
        "검색어를 확인해주세요.",
        [{text: "확인"}]
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressBack} style={styles.back}>
          <Icon name='arrow-back-ios' type='material-icons' size={20}></Icon>
        </TouchableOpacity>
        <Text style={styles.headerText}>최신 영상</Text>
      </View>
      { summarizing && <SummaryText /> }
      <View style={styles.searchContainer}>
        <View style={styles.inputBox}>
          <Icon name='search' type='feather' size={20} style={styles.searchIcon}></Icon>
          <TextInput 
            placeholder="검색어를 입력해주세요." 
            placeholderTextColor='#C8CACD'
            style={styles.searchInput} 
            onChangeText={(text) => dispatch(setSearch({inputText: text}))} 
            value={search.inputText}
            onSubmitEditing={onSubmit}
            returnKeyType="search" />
          <TouchableOpacity onPress={() => dispatch(setSearch({inputText: ''}))}>
            <Icon 
              name='cancel' 
              type='material-icons' 
              size={18} 
              style={(search.inputText === '')? styles.hidden: styles.removeIcon} 
              color='lightgray'></Icon>
          </TouchableOpacity>
        </View>
      </View>
      
      { data.length !== 0
        ? <FlatList 
          style={styles.resultContainer}
          showsVerticalScrollIndicator = {false}
          bounces={false}
          data={data}
          keyExtractor={(item)=>item._id}
          renderItem={({item}) => <SearchItem item={item} showToast={showToast} />}
        />
        : <View style={styles.result}>
            <Text style={styles.emptyResult}>검색 결과가 없습니다.</Text>
        </View>
      }
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBFD'
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 15,
    top: 17
  },
  headerText: {
    fontSize: 20,
    color: '#111'
  },
  searchContainer: {
    backgroundColor: '#F4F6F9',
    height: 90
  },
  inputBox: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center'
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    margin: 15,
  },
  removeIcon: {
    margin: 15,
  },
  hidden: {
    display: 'none'
  },
  result: {
    backgroundColor: '#F4F6F9',
    height: '100%'
  },
  resultContainer: {
    backgroundColor: '#F4F6F9',
    height: '80%',
    marginBottom: 10
  },
  emptyResult: {
    textAlign: 'center',
    fontSize: 15,
    paddingTop: 10
  },
  toastBox: { 
    height: 45, 
    width: '85%', 
    backgroundColor: '#384BF5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9
  },
  toastText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default SearchResult;