import React from 'react';
import {
    View, Text, TouchableOpacity, Dimensions, Image
} from 'react-native';
import {styles} from '../../Components/Style'

const list = [
  {
    id: 1,
    day: 1,
    locatioName: '체육관',
    address: '충남 천안',
    url: 'https://t1.daumcdn.net/cfile/tistory/99128B3E5AD978AF20',
  },
  {
    id: 2,
    day: 2,
    locatioName: '체육관2',
    address: '충남 천안2',
    url: 'https://t1.daumcdn.net/cfile/tistory/99128B3E5AD978AF20',
  },
  {
    id: 3,
    day: 3,
    locatioName: '체육관3',
    address: '충남 천안3',
    url: 'https://t1.daumcdn.net/cfile/tistory/99128B3E5AD978AF20',
  }
]

const Item = ({item}) => {
  return (
    <View style={styles.planList}>
      <View>
        <Text style={{ fontSize: 10, color: '#DEE4EE'}}>{item.day}일차</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom:2}}>{item.locatioName}</Text>
        <Text style={{ fontSize: 8, color: '#AFBAD0'}}>{item.address}</Text>
      </View>
      <View style={{ width: '23%', height: '80%', marginRight: 13}}>
        <Image source={{ uri: 'https://t1.daumcdn.net/cfile/tistory/99128B3E5AD978AF20'}} alt="이미지" style={{ width: '100%', height: '100%', borderRadius: '50%'}} />
      </View>
    </View>
  );
}
const MyPage = (props) => {
    return (
        <View style={styles.container}>
            {/* <Text>mypage</Text>
            <TouchableOpacity
                style={{backgroundColor:'yellow', }}
                onPress={() => {
                    props.navigation.navigate('Login')
                }}
            >
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{backgroundColor:'orange'}}
                onPress={() => {
                    props.navigation.navigate('SignUp')
                }}
            >
                <Text>SignUp</Text>
            </TouchableOpacity> */}
            <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'space-around'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ width: '28%', height: '80%'}}>
                  <Image source={require('../../assets/icon.png')} alt="이미지" style={{ width: '100%', height: '100%', borderRadius: '50%'}} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 600, marginLeft: 10}}>닉네임</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                    props.navigation.reset({routes:[{name:'Login'}]})
                }}
              >
                <Text style={{ color: '#DD83E0', fontSize: 15, fontWeight: 600, marginLeft: 50}}>로그아웃</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 60}}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#464951', marginLeft: -30}}>
                내 별자리 모아보기
              </Text>
              <View>
                <Text style={{ color: '#AFBAD0', fontSize: 14, marginBottom: 10, marginTop: 15, marginLeft: -15}}>
                  2022.02.02
                </Text>
                <View>
                  {
                    list.map((item) => {
                      return <Item key={item.id} item={item}/>
                    })
                  }
                </View>
              </View>
            </View>

        </View>
    );
};

export default MyPage;