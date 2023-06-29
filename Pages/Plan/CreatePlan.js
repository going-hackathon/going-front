import React, { useEffect, useState, useRef, } from 'react';
import { View, Dimensions, Text, TextInput, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
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
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [memo, setMemo] = useState("");
  const [searchdate, setSearchDate] = useState();
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
  // 자동 하이픈 생성 생년월일
  const autoHyphenBirth = (target) => {
    return target.replace(/[^0-9]/g, '').replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  }


  //서버에 검색어 보냄
  const search = () => {
    // 검색 보냄
    axios.post(`${IP}/review/surrounding`, null, {
      params: {
        searchText: searchText, // 검색한 내용
      }
    })
      .then(function (res) {
        console.log("resgister", res.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  //원하는 지역을 선택함
  const selectPlace=()=>{
    setCheck(false)
  }

  // bottomsheet
  const renderContent = () => (

    <View
      style={{ width: '100%', height: '100%', backgroundColor: '#5F7193', padding: 20, alignItems: 'center' }}
    >
      <View style={{width:'100%', alignItems:'flex-end', marginBottom:10}}>
        <TouchableOpacity
          style={{ width: 80, height: 30, backgroundColor: '#AFBAD0', marginBottom:5, justifyContent:'center', alignItems:'center', borderRadius:10}}
          onPress={() => {
            setCheck(false)
          }}
        >
          <Text style={{color:'white'}}>저장</Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '75%', }}>
            <TextInput
              style={{color:'white'}}
              value={setSearchDate}
              placeholder='날짜 입력'
              placeholderTextColor={'white'}
              
            />
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>장소 이름</Text>
            <Text style={{ fontSize: 15, color: '#AFBAD0' }}>주소</Text>
          </View>
          <View style={{ width: '25%', backgroundColor: 'yellow' }}>
            <Image style={{ width: 86, height: 86 }} source={require('../../assets/logo.png')} />
          </View>

        </View>
      </TouchableWithoutFeedback>
      <TextInput
        style={{ width: '100%', height: '10%', color:'white', padding: 10, borderRadius: 10, marginTop: 10 }}
        value={memo}
        onChangeText={setMemo}
        placeholder='한줄 메모'
        placeholderTextColor={'white'}
      />
    </View>

  );




  return (
    <>
      {
        check ?
          <TouchableWithoutFeedback
            style={{
              flex: 1,
              backgroundColor: 'white',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={statusBarHeight + 44}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={{ alignItems: 'center', width:'100%', height:'100%', backgroundColor:'white'}}>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={styles.searchBar}>

                  <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={(e) => { setSearchText(e) }}
                    placeholder='장소 입력'
                  />

                  <View style={styles.searchicon}>
                    <TouchableOpacity
                      onPress={() => {
                        search()
                      }}
                    >
                      <Image style={{ width: 20, height: 20 }} source={require('../../assets/Search.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>



              <TouchableOpacity
                style={{ width: 350, height: 70, flexDirection: 'row', alignItems: 'center', padding: 10 }}
                onPress={() => { selectPlace() }}

              >
                <View>
                  <Image style={{ width: 48, height: 48, marginRight: 8 }} source={require('../../assets/SearchPin.png')} />
                </View>
                <View>
                  <Text style={{ fontSize: 18, color: '#7C869C', fontWeight: 'bold', marginBottom: 5 }}>장소명</Text>
                  <Text style={{ fontSize: 12, color: '#7C869C', }}>주소주소주소</Text>
                </View>

              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>




          :




          <View style={styles.container} >
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
                    sheetRef.current.snapTo(0)
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


              <BottomSheet
              // onOpenStart={false}
                ref={sheetRef}
                snapPoints={[Dimensions.get('window').height * 0.6, Dimensions.get('window').width, 0]}
                // snapPoints={[450, 300, 0]}
                borderRadius={30}
                renderContent={renderContent}
              />


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


              

            </View>
          </View>
      }
    </>
  );
}

export default CreatePlan;