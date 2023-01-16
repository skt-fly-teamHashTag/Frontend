import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from '../slices/searchSlice';

const Search = ({ navigation }) => {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Icon name='arrow-back-ios' type='material-icons' size={20}></Icon>
        </TouchableOpacity>
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