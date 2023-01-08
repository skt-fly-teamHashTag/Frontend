import React, { useEffect } from 'react';
import { View,} from 'react-native';
import MenuHeader from '../components/Header/MenuHeader';
import MenuScrollView from '../components/ScrollView/MenuScrollView';
import { setNavigation } from '../slices/menuSlice';

const Menu = ({ navigation }) => {
  return (
    <View>
      <MenuHeader onPress={() => navigation.closeDrawer()} />
      <MenuScrollView navigation={navigation} />
    </View>
  );
};

export default Menu;