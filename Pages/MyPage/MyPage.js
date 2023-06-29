import React from 'react';
import {
    View, Text, TouchableOpacity, Dimensions


} from 'react-native';
import {styles} from '../../Components/Style'


const MyPage = (props) => {
    return (
        <View style={styles.container}>
            <Text>mypage</Text>
            <TouchableOpacity
                style={{backgroundColor:'yellow', }}
                onPress={() => {
                    props.navigation.navigate('Login')
                }}
            >
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{backgroundColor:'orange'}}
                onPress={() => {
                    props.navigation.navigate('SignUp')
                }}
            >
                <Text>SignUp</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MyPage;