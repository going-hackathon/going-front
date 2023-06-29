import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Keyboard, Text } from 'react-native';
import { styles } from '../../Components/Style'
import { TouchableWithoutFeedback } from 'react-native';

const SearchKeyWord = (props) => {
    const [searchText, setSearchText] = useState("")
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const search = () => {
        console.log('search')
    }





    return (
        <TouchableWithoutFeedback
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={statusBarHeight + 44}
            onPress={() => Keyboard.dismiss()}
        >
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{ flexDirection: 'row',padding:10}}>
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
                    onPress={() => props.navigation.navigate("Plan")}
                >
                    <View>
                        <Image style={{width:48, height:48, marginRight:8}} source={require('../../assets/SearchPin.png')} />
                    </View>
                    <View>
                        <Text style={{fontSize:18, color:'#7C869C', fontWeight:'bold', marginBottom:5}}>장소명</Text>
                        <Text style={{fontSize:12, color:'#7C869C', }}>주소주소주소</Text>
                    </View>
                    
                </TouchableOpacity>
                

            </View>

        </TouchableWithoutFeedback>
    );
};

export default SearchKeyWord;