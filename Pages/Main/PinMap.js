import React, {useState, useEffect} from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity,TextInput, TouchableWithoutFeedback } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import {styles} from '../../Components/Style'
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import questionMarkImg from '../../assets/questionmark.png';

const PinMap = (props) => {
  const sheetRef = React.useRef(null);
  const [memo, setMemo] = useState();
  const renderContent = () => (
  
    <View
      style={{ width: '100%', height: '100%', backgroundColor: '#5F7193', padding: 20, alignItems: 'center' }}
    >
      <View style={{width:'100%', alignItems:'flex-end', marginBottom:10}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('PlanList')
          }}
        >
          <Image source={questionMarkImg} />
        </TouchableOpacity>
      </View>
      <View onPress={() => Keyboard.dismiss()}>
        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '75%', }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>장소 이름</Text>
            <Text style={{ fontSize: 15, color: '#AFBAD0' }}>주소</Text>
          </View>
          <View style={{ width: '25%' }}>
            <Image style={{ width: 86, height: 86, borderRadius: '50%' }} source={require('../../assets/icon.png')} />
          </View>

        </View>
      </View>
      <TextInput
        style={{ width: '100%', height: '10%', color:'white', padding: 10, borderRadius: 10, marginTop: 10 }}
        value={memo}
        onChangeText={setMemo}
        placeholder='한줄 메모'
        placeholderTextColor={'white'}
      />
    </View>

  );
  // mapRegion[0].latitude
  const [mapRegion, setmapRegion] = useState([
    {
      latitude: 36.7992587626175,
      longitude: 127.07589223496811,
      isClick: false,
    },
    {
      latitude: 36.7962587626175,
      longitude: 127.17529223496811,
      isClick: false,
    },
    {
      latitude: 36.7922587626175,
      longitude: 127.07189223496811,
      isClick: false,
    },
  ]);
  const [myRegion, setMyRegion] = useState({ //나의 위치 usestate
    latitude: 36.7992587626175, //위도
    longitude: 127.07589223496811, //경도
  });

  //에니메이션으로 이동
  const mapRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); //현재 위치 가져오기

      setMyRegion({ //현재 위치 set
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      })
    })();
  }, []);
  console.log(mapRegion);

  return (
      <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height}}>

        <BottomSheet
          ref={sheetRef}
          snapPoints={[Dimensions.get('window').height * 0.4, Dimensions.get('window').width, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />
        <View style={styles.container} >
      <View style={styles.containerMap} >
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: myRegion ? myRegion.latitude : 0,
            longitude: myRegion ? myRegion.longitude : 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          ref={mapRef}
          //사용자 위치에 맞게 마커가 표시된다.
          showsUserLocation={true}
          onUserLocationChange={(e) => {
            // setmapRegion({
            //   latitude: e.nativeEvent.coordinate.latitude,
            //   longitude: e.nativeEvent.coordinate.longitude
            // });
          }}
        >
          <Polyline
            coordinates={mapRegion}
            strokeColor="#5F7193"
            strokeWidth={2}
          />
          {
            mapRegion.map((item, index)=>{
              console.log(item)
              if (item.isClick === false) {
                return (
                  <Marker
                    coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                    onPress={() => 
                      { 
                        sheetRef.current.snapTo(0); 
                        setmapRegion(mapRegion.map((item, idx) => {
                          if (index === idx) {
                            return { ...item, isClick: true };
                          } else {
                            return { ...item, isClick: false };
                          }
                        }));

                    }}
                    image={require('../../assets/path1.png')}
                  >
                    <Callout style={{ width: Dimensions.get('screen').width * 0.1 }}>
                      <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                        {/* <Text style={{ fontSize: 13, fontWeight: 'bold', }}>나의 현재 위치</Text> */}
                        <Image source={require('../../assets/icon.png')} style={{ width: Dimensions.get('screen').width * 0.1, height: Dimensions.get('screen').width * 0.1}} />
                      </View>
                    </Callout>
                  </Marker>
                )
              } else if (item.isClick===true) {
                return (
                  <Marker
                    coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                    onPress={() => { sheetRef.current.snapTo(0) }}
                    image={require('../../assets/path2.png')}
                  >
                    <Callout style={{ width: Dimensions.get('screen').width * 0.1 }}>
                      <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                        {/* <Text style={{ fontSize: 13, fontWeight: 'bold', }}>나의 현재 위치</Text> */}
                        <Image source={require('../../assets/icon.png')} style={{ width: Dimensions.get('screen').width * 0.1, height: Dimensions.get('screen').width * 0.1}} />
                      </View>
                    </Callout>
                  </Marker>
                )
              }

            })
          }

               
        </MapView>
      </View>
    </View>
      </View>
    );
};

export default PinMap;