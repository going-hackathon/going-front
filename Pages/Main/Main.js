import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {styles} from '../../Components/Style'
import {Image} from 'react-native';

const Main = (props) => {
    return (
        <View style={{ margin: 'auto'}}>
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

            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("PlanList") 
                }}
                style={styles.mainBody}
            >
                <Text>PlanList</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Main;