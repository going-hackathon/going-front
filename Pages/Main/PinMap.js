import React from 'react';
import { View, Text, Image } from 'react-native'

// const list = [
//   [
//     {
//       date: '2023.02.02',
//       locationName: '재능교육연수원',
//       address: '충남 천안',
//       img: require('../../Components/Styl'),
//     },
//     {
//       date: '2023.02.02',
//       locationName: '재능교육연수원',
//       address: '충남 천안',
//       img: require('../../Components/Styl'),
//     }
//   ]
// ];
const PinMap = (props) => {
    return (
        <View>
            <Text>여행별자리</Text>
            {/* <View>
              <Text>N일차</Text>
            </View>
            <View>
              <Text>날짜</Text>
              <Text>장소이름</Text>
              <Text>주소</Text>
              <View>
                <Image source={require('../../assets/map.png')} alt="이미지" />
              </View>
            </View> */}
        </View>
    );
};

export default PinMap;