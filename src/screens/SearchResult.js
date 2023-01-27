import React from "react";
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from '../slices/searchSlice';
import SearchItem from "../components/Search/SearchItem";
import Toast from 'react-native-toast-message';
import { dummyData } from "../datas/Data";
import SummaryText from "../components/Text/SummaryText";
import { URL } from "../api";
import axios from "axios";

const SearchResult = ({ navigation }) => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const summarizing = useSelector((state) => state.summary.summary);

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
            style={styles.searchInput} 
            onChangeText={(text) => dispatch(setSearch({inputText: text}))} 
            value={search.inputText}
            onSubmitEditing={()=>navigation.navigate('SearchResult')}
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

      <ScrollView 
        style={styles.resultContainer}
        showsVerticalScrollIndicator = {false}
        bounces={false}>
        {dummyData.map((item, index) => <SearchItem key={'key' + index} item={item} showToast={showToast} />)}
      </ScrollView>
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
  resultContainer: {
    backgroundColor: '#FFFBFD',
    height: '80%',
    marginBottom: 10
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