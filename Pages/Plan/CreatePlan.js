import React, { useEffect, useState,  useRef,} from 'react';
import { View, StyleSheet, Dimensions, Pressable, Image, Text,  } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// npm i react-native-maps
import * as Location from 'expo-location';
import {styles} from '../../Components/Style'


const CreatePlan = ({navigation}) => {
  const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
    latitude: 36.7992587626175, //위도
    longitude: 127.07589223496811, //경도
  });
  //firestor 연동
  const [stations, setStations] = useState();
  //에니메이션으로 이동
  const mapRef = React.useRef(null);
  const [region, setRegion] = React.useState();

  // 드래그 해서 위치의 위도경도 가져오기
  const mapRegionChangehandle = (region) => {
      setRegion(region)
  };





  useEffect(() => {
    (async () => {

      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); //현재 위치 가져오기

      setmapRegion({ //현재 위치 set
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      })
    })();
  }, []);








  //이동하기
  const onDetail = (lat, lon) => { // 반납 가능 우산 개수, 대여 가능 우산 개수 계산
    setmapRegion({ //현재 위치
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    })
    mapRef.current.animateToRegion({ //해당 위치로 지도 이동
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }, 1000);
  }

  return (
    <View style={styles.container} >
      <View style={styles.containerMap} >
        <MapView
          style={styles.map}
          // region={mapRegion}
          // initialRegion={{mapRegion}}
          initialRegion={{
            latitude: mapRegion ? mapRegion.latitude:0,
            longitude: mapRegion ? mapRegion.longitude:0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          ref={mapRef}
          //사용자 위치에 맞게 마커가 표시된다.
          showsUserLocation={true}
          // userLocationUpdateInterval = 
          onUserLocationChange={(e) => {
            setmapRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
          }}
          onRegionChange={mapRegionChangehandle}
        >
          <Marker
            coordinate={{ latitude: mapRegion ? mapRegion.latitude:0, longitude: mapRegion ? mapRegion.longitude:0, }}
            onPress={() => {
              onDetail( mapRegion.latitude, mapRegion.longitude)
            }}
          >
            <Callout style={{ width: Dimensions.get('screen').width * 0.6, }}>

              <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', }}>대여 </Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold', }}>반납 </Text>
              </View>

              <View>


              </View>
            </Callout>
          </Marker>     
        </MapView>


        <View>
          

        </View>

        <View style={styles.buttons}>
          {/* 버튼 */}
          {/* 화면비율 맞추기 */}

          <Pressable style={styles.closemap} onPress={() => navigation.navigate('Main')} >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>지도 닫기</Text>
          </Pressable>
          <Text>              </Text>
          <Pressable style={styles.closemap} onPress={() => navigation.navigate('Main')} >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>지도 닫기</Text>
          </Pressable>

        </View>

      </View>
    </View>
  );
}

export default CreatePlan;