import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';

const MenuHeader = ({ onPress }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressLogout = () => {
    dispatch(setUser({
      userId: '',
      nickName: '',
      phoneNumber: ''
    }));
    navigation.reset({routes: [{name: "Login"}]})
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPressLogout}>
        <Icon name='logout' type='material-icons' size={24} style={styles.headerIcon} />
      </TouchableOpacity>
      <View style={styles.headerRight}>
        <Icon name='setting' type='ant-design' size={24} style={styles.headerIcon} />
        <TouchableOpacity onPress={onPress}>
          <Icon name='close' type='ant-design' size={24} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginHorizontal: 10,
  }
});

export default MenuHeader;