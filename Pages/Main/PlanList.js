import React from 'react';
import { View, Text, Image } from 'react-native'
import {styles} from '../../Components/Style'

const list = [
  {
    id: 1,
    date: '2023.02.02',
    locationName: '재능교육연수원',
    address: '충남 천안',
    img: require('../../Components/Style'),
  },
  {
    id: 2,
    date: '2023.02.02',
    locationName: '재능교육연수원',
    address: '충남 천안',
    img: require('../../Components/Style'),
  }
];
const Item = ({date, locationName, address, img}) => {
  return (
    <View style={styles.planList}>
      <View>
        <Text style={{ fontSize: 10, color: '#DEE4EE'}}>{date}</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>{locationName}</Text>
        <Text style={{ fontSize: 8, color: '#AFBAD0'}}>{address}</Text>
      </View>
      <View style={{ width: '20%', height: '65s%'}}>
        <Image source={require('../../assets/icon.png')} alt="이미지" style={{ width: '100%', height: '100%', borderRadius: '50%'}} />
      </View>
    </View>
  );
}
const PlanList = (props) => {
    return (
        <View style={{marginTop: '20%', marginLeft: '10%'}}>
            <Text style={{ color : '#393D46', fontSize: 30, fontWeight: 'bold'}}>여행별자리</Text>
            <View style={{ borderLeftWidth: 1.5, borderLeftColor: '#DD83E0', paddingLeft: '7%', marginLeft: '20%', marginTop: '5%' }}>
              {
                list.map((item) => {
                  return <Item key={item.id} date={item.date} locationName={item.locationName} address={item.address} img={item.img} />
                })
              }
            </View>
        </View>
    );
};

export default PlanList;