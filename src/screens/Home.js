import React, { useState } from 'react';
import { StyleSheet, View, Image, Modal, Text, TouchableOpacity, CheckBox } from 'react-native';
import IconHorizontalScrollView from '../components/ScrollView/IconHorizontalScrollView';
import BottomIconBox from '../components/Box/BottomIconBox';
import { Icon } from '@rneui/themed';

const Home = () => {
  const [visibility, setVisibility] = useState(true);
  const [isAllSelected, setAllSelection] = useState(true);
  const [isFriendSelected, setFriendSelection] = useState(false);
  const [selection, setSelection] = useState({
    all: true,
    one: false
  })

  const OptionModal = ({ visibility }) => {
    return (
      <Modal
        visible={visibility}
        transparent={true}>
        <View style={styles.modalBack}>
          <View style={styles.modalBox}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalMainTitle}>친구 목록을 설정 해주세요.</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkboxBlock}
              onPress={()=>{setSelection({all: !selection.all, one: !selection.one})}}>
              <Icon 
                name={selection.all? 'check-box':'check-box-outline-blank'} 
                type='material-community-icons' 
                size={22} style={styles.checkIcon} color={selection.all? '#384BF5': 'gray'} />
              <Text style={styles.checkText}>전체 연락처 불러오기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxBlock}
              onPress={()=>{setSelection({all: !selection.all, one: !selection.one})}}>
              <Icon 
                name={selection.one? 'check-box':'check-box-outline-blank'} 
                type='material-icons' 
                size={22} style={styles.checkIcon} color={selection.one? '#384BF5': 'gray'} />
              <Text style={styles.checkText}>친한 친구 직접 추가하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={()=>setVisibility(false)}
              style={styles.modalButton}>
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.main}>
      <Image source={require("../assets/mainGif.gif")} style={styles.mainGif} />
      <IconHorizontalScrollView />
      <BottomIconBox />
      <OptionModal visibility={visibility} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%', 
    height: '100%',
    backgroundColor: '#FFFBFD'
  },
  mainGif: {
    width: '100%',
    height: 500,
    marginTop: '5%'
  },
  modalBack: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    alignItems: 'center',
    backgroundColor: '#F4F6F9',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 20
  },
  modalTitle: {
    marginBottom: 10,
    width: '70%'
  },
  modalMainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5
  },
  modalItem: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white'
  },
  selectedItem: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#384BF5'
  },
  modaItemText: {
    color: 'black'
  },
  selectedText: {
    color: '#384BF5',
    fontWeight: 'bold'
  },
  modalButton: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#384BF5',
    borderRadius: 10,
    marginTop: 25
  },
  modalButtonText: {
    color: 'white', 
    margin: 15,
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkboxBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
    marginVertical: 5
  },
  checkText: {
    fontSize: 16,
    marginLeft: 5
  },
});

export default Home;