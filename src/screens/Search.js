import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from '../slices/searchSlice';
import SummaryText from "../components/Text/SummaryText";
import axios from "axios";
import { URL } from "../api";
import { setFeedData } from "../slices/feedSlice";

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const summarizing = useSelector((state) => state.summary.summary);

  const onPressBack = () => {
    dispatch(setSearch({inputText: ''}));
    axios.get(URL.getAllFeeds)
    .then(response => {
      dispatch(setFeedData({...response.data.body}));
      navigation.navigate('FeedHome', response.data.body);
    })
    .catch(error => console.log(error));
  };

  const onSubmit = async() => {
    const correct = /[가-힣a-zA-Z]{2,}/.test(search.inputText);
    if (correct) {
      const response = await axios.get(URL.getSearchFeeds, {params: { keyword: search.inputText }});
      navigation.navigate('SearchResult', response.data.body.data);
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
      { summarizing && <SummaryText /> }
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={onPressBack}>
          <Icon name='arrow-back-ios' type='material-icons' size={20}></Icon>
        </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F4F6F9'
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  inputBox: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
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
  }
});

export default Search;