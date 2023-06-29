import React, { useEffect, useState, useRef, } from 'react';
import { View, Dimensions, Text, TextInput, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// npm i react-native-maps
import * as Location from 'expo-location';
import { styles } from '../../Components/Style'
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';



const CreatePlan = (props) => {
  const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
    latitude: 36.7992587626175, //위도
    longitude: 127.07589223496811, //경도
  });
  //에니메이션으로 이동
  const mapRef = React.useRef(null);
  const [region, setRegion] = React.useState();

  // 드래그 해서 위치의 위도경도 가져오기
  const mapRegionChangehandle = (region) => {
    setRegion(region)
  };
  const [data, setData] = useState([]); // 검색한 데이터 저장
  // bottomsheet
  const sheetRef = React.useRef(null);

  const [check, setCheck] = useState(false)

  useEffect(() => {
    // 장소 입력했을 navigation 에서 데이터 가져오기

    const unsubscribe = props.navigation.addListener('focus', () => {
      if (props.route.params != null) {
        var data = props.route.params.data; // navigation으로 검색 내용을 params로 가져온다.
        setData(data) // 검색한 내용을 저장
        console.log('data', data);
      }
    });
  }, [])


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
      {
        check ?
          <searchPage />
          
          :

          <View style={styles.containerMap} >
            <MapView
              style={styles.map}
              // region={mapRegion}
              // initialRegion={{mapRegion}}
              initialRegion={{
                latitude: mapRegion ? mapRegion.latitude : 0,
                longitude: mapRegion ? mapRegion.longitude : 0,
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
                coordinate={{ latitude: mapRegion ? mapRegion.latitude : 0, longitude: mapRegion ? mapRegion.longitude : 0, }}
                onPress={() => {
                  onDetail(mapRegion.latitude, mapRegion.longitude)
                }}
              >
                <Callout style={{ width: Dimensions.get('screen').width * 0.4, }}>

                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', }}>나의 현재 위치</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView>


            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.searchBar}
                onPress={() => { setCheck(true) }}
              >
                <View style={styles.searchInput}>
                  <Text style={{ color: '#7C869C' }}>장소 검색</Text>
                </View>
                <View style={styles.searchicon}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('search')
                    }}
                  >
                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/Search.png')} />
                  </TouchableOpacity>
                </View>

              </TouchableOpacity>


            </View>


            <BottomSheet
              ref={sheetRef}
              snapPoints={[Dimensions.get('window').height * 0.69, Dimensions.get('window').width, 0]}
              // snapPoints={[450, 300, 0]}
              borderRadius={10}
              renderContent={renderContent}
            />



          </View>

      }
    </View>
  );
}

export default CreatePlan;