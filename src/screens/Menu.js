import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { Icon } from '@rneui/themed';

const Menu = (props) => {
  return (
    <View>
      <View style={styles.headerRight}>
      <Icon name="setting" size={24} style={styles.headerIcon} type='ant-design' />
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
      <Icon name="close" size={24} style={styles.headerIcon} type='ant-design' />
      </TouchableOpacity>
    </View>
    <ScrollView 
      style={styles.menu}
      showsVerticalScrollIndicator = {false}>
      <View style={styles.menuContents}>
        <Image 
          source={require("../assets/profile.jpeg")}
          style={styles.profile} />
        <Text style={styles.hello}>안녕하세요! <Text style={styles.name}>해시태그님</Text></Text>
        <View style={styles.threeButton}>
          <View style={styles.three}>
            <Icon name="flag" color='#384BF5' type='ionicons'></Icon>
            <Text>퀘스트</Text>
          </View>
          <View style={styles.three}>
            <Icon name="gift" color='#EC6A66' type='font-awesome'></Icon>
            <Text>리워드</Text>
          </View>
          <View style={styles.three}>
            <Icon name="magic" color='#3D4664' type='font-awesome'></Icon>
            <Text>캐릭터 꾸미기</Text>
          </View>
        </View>
        <View style={styles.menuBox}>
          <Text style={styles.menuTitle}>편하닷</Text>
          <View style={styles.detailMenuBox}>
            <View style={styles.detailMenu}>
              <Icon name="clockcircle" color='#75A8F6' type='ant-design' size={20}></Icon>
              <Text style={styles.menuText}>루틴</Text>
            </View>
            <View style={styles.detailMenu}>
              <Icon name="calendar-alt" color='#4274DA' type='font-awesome-5' size={20}></Icon>
              <Text style={styles.menuText}>캘린더</Text>
            </View>
            <View style={styles.detailMenu}>
              <Icon name="map-marked-alt" color='#5CBDC5' type='font-awesome-5' size={20}></Icon>
              <Text style={styles.menuText}>TMAP</Text>
            </View>
            <TouchableOpacity style={styles.detailMenu} activeOpacity={0.8}>
              <Icon name="folder-video" color='#7378FF' type='entypo' size={20}></Icon>
              <Text style={styles.menuText}>비디오닷</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
          <Text style={styles.menuTitle}>궁금하닷</Text>
          <View style={styles.detailMenuBox}>
            <View style={styles.detailMenu}>
              <Icon name="checksquare" color='#61C991' type='ant-design' size={20}></Icon>
              <Text style={styles.menuText}>큐피드</Text>
            </View>
            <View style={styles.detailMenu}>
              <Icon name="questioncircle" color='#5061F5' type='ant-design' size={20}></Icon>
              <Text style={styles.menuText}>튜토리얼</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <Text style={styles.menuTitle}>재미있닷</Text>
          <View style={styles.detailMenuBox}>
            <View style={styles.detailMenu}>
              <Icon name="tv" color='#5E55F6' type='feather' size={20}></Icon>
              <Text style={styles.menuText}>TV</Text>
            </View>
            <View style={styles.detailMenu}>
              <Icon name="gamepad" color='#F3B444' type='font-awesome-5' size={20}></Icon>
              <Text style={styles.menuText}>게임</Text>
            </View>
            <View style={styles.detailMenu}>
              <Icon name="magic" color='#4E75F6' type='font-awesome' size={20}></Icon>
              <Text style={styles.menuText}>포토</Text>
            </View>
            <View style={styles.detailMenu}>
              <Icon name="library-music" color='#3A3BF5' type='materialIcons' size={20}></Icon>
              <Text style={styles.menuText}>음악추천</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
        <Text style={styles.bottomText}>공지사항</Text>
        <Text style={{color: 'lightgray'}}>  |  </Text>
        <Text style={styles.bottomText}>이벤트</Text>
      </View>
      </View>
      
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 50,
    paddingBottom: 10
  },
  menu: {
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: 5,
  },
  headerIcon: {
    marginRight: 20
  },
  menuContents:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  profile: {
    width: 350,
    height: 230,
  }, 
  hello: {
    width: '100%',
    margin: 10,
  },
  name: {
    fontWeight: 'bold'
  },
  threeButton: {
    flexDirection: 'row',
  },
  three: {
    backgroundColor: '#F4F6F9',
    width: 110,
    height: 70,
    borderRadius: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBox: {
    width: '100%',
    paddingTop: 15,
  },
  detailMenuBox: {
    flexDirection: 'row',
    marginTop:10,
    flexWrap: 'wrap',
    width: '100%'
    
  },
  detailMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    marginTop: 20,
    width: '40%',
  },
  menuTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuText: {
    marginLeft: 5,
  },
  line: {
    marginTop: 20,
    marginBottom: 20,
    borderTopWidth: 1 ,
    borderColor: 'lightgray'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 200,
  },
  bottomText: {
    color: 'gray'
  }
});

export default Menu;