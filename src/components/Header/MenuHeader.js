import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const MenuHeader = ({ onPress }) => {
  return (
    <View style={styles.headerRight}>
      <Icon name='setting' type='ant-design' size={24} style={styles.headerIcon} />
      <TouchableOpacity onPress={onPress}>
        <Icon  name='close' type='ant-design' size={24} style={styles.headerIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerIcon: {
    marginRight: 20,
  }
});

export default MenuHeader;