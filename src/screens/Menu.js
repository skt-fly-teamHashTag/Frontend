import React, { useEffect } from 'react';
import { View,} from 'react-native';
import MenuHeader from '../components/Header/MenuHeader';
import MenuScrollView from '../components/ScrollView/MenuScrollView';

const Menu = ({ navigation }) => {
  return (
    <View>
      <MenuHeader onPress={() => navigation.closeDrawer()} />
      <MenuScrollView />
    </View>
  );
};

export default Menu;