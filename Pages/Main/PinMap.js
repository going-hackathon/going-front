import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
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
  const sheetRef = React.useRef(null);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );
    return (
        <View>
            <TouchableOpacity
              onPress={() => sheetRef.current.snapTo(0)}
            >
              <Text>
              click
              </Text>
            </TouchableOpacity>
            <Text>여행별자리</Text>
            <BottomSheet
              ref={sheetRef}
              snapPoints={[Dimensions.get('window').height * 0.69, Dimensions.get('window').width, 0]}
              // snapPoints={[450, 300, 0]}
              borderRadius={10}
              renderContent={renderContent}
          />
        </View>
    );
};

export default PinMap;