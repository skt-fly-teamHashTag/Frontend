import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const MenuHeader = ({ onPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.reset({routes: [{name: "Login"}]})}>
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