import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {styles} from '../../Components/Style'
import {Image,Dimensions} from 'react-native';

const list = [
  {
    id: 1,
    nickname: '닉네임',
    profileImg: require('../../Components/Style'),
    img: require('../../Components/Style'),
  },
  {
    id: 2,
    nickname: '닉네임',
    profileImg: require('../../Components/Style'),
    img: require('../../Components/Style'),
  }
  ];

  const Item = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
            props.navigation.navigate("PlanList") 
        }}
        style={styles.mainBody}
    >
      <View style={{ width: Dimensions.get('window').width* 0.9, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ width: 24, height: 24, marginRight: '5%'}}> 
            <Image source={require('../../assets/icon.png')} alt="이미지" style={{ width: '100%', height: '100%', borderRadius: '50%'}} />
          </View>
          <Text style={{ fontSize: 16 }}>닉네임</Text>
        </View>
        <View style={{ width: 28, height: 28}}> 
          <Image source={require('../../assets/map.png')} alt="이미지" style={{ width: '100%', height: '100%'}} />
        </View>
      </View>
      <View style={{ width: '100%', height: 328}}> 
        <Image source={require('../../assets/icon.png')} alt="이미지" style={{ width: '100%', height: '100%', borderRadius: 8}} />
      </View>
    </TouchableOpacity>
    )
  }

  const Main = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
            <TouchableOpacity
              onPress={() => {
                  props.navigation.navigate("Main") 
              }}
            >
              <Text style={styles.logo}>Logo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("PinMap") 
                }}
                style={styles.mainHeader}
            >
              <View style={{ flexDirection: 'row'}}>
                <View style={{ height: '100%', width: '23%'}}>
                  <Image style={styles.mainHeadImg} source={require('../../assets/icon.png')} alt="이미지" />
                  {/* <Image style={{width, height}} source={{ url: ""}} source = {require('../../assec')} /> */}
                </View>
                <View style={{ marginLeft: 10}}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', }}>장소이름</Text>
                  <Text style={{ fontSize: 10}}>주소</Text>
                </View>
              </View>

              <View style={{ height: '50%', width: '10%', }}>
                <Image source={require('../../assets/writeIcon.png')} alt="이미지" />
              </View>
            </TouchableOpacity>
            <ScrollView>
            {
              list.map((item) => {
                return <Item key={item.id}/>
              })
            }
            </ScrollView>
        </View>
    );
};

export default Main;