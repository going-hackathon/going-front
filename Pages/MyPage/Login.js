import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Keyboard, Image } from 'react-native'
import { styles } from '../../Components/Style'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'axios'
// device에 데이터 저장
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
    const [id, setID] = useState();
    const [pw, setPW] = useState();
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    const regist = () => {
        if (id != null && pw != null) {
            return false
        } else {
            return true
        }
    }

    const login = () => {
        (async () => {
            try {
                var id =""
                const temp = {
                    userAccountId: id,
                    password: pw
                }
                
                axios.post('http://13.125.131.18:8080/api/users/login', temp)
                    .then((res) => {
                        console.log(res.data);
                        props.navigation.navigate("Main")
                        // id = await AsyncStorage.setItem('token', res.data.token)
                    })
                    .catch((err) => {
                        console.log(err);
                    })


                if (id != null && pw != null) {
                    return false
                } else {
                    return true
                }

            } catch (error) {
                console.log(error)
            }
        })()
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={statusBarHeight + 44}
            onPress={()=> Keyboard.dismiss()}
        >
            <View style={{ width: '80%', height: '50%', }} >
                <TouchableWithoutFeedback
                    style={{ width: '100%', height: '25%', }}
                    onPress={() => Keyboard.dismiss()}

                >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: '#AFBAD0' }}>함께 만들어 가는 여행의 즐거움,</Text>
                        <Image style={{ width: 114, height: 64 }} source={require('../../assets/logo.png')} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.loginView}>
                    <View style={{ width: '80%', height: '30%', marginBottom: 10 }}>
                        <TextInput
                            style={styles.loginInput}
                            value={id}
                            onChangeText={setID}
                            placeholder='아이디'
                        />
                        <TextInput
                            style={styles.loginInput}
                            value={pw}
                            onChangeText={setPW}
                            placeholder='패스워드'
                        />
                    </View>
                    <View style={{ width: '80%', height: '20%', }}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            disabled={regist()}
                            onPress={()=> login()}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>로그인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'flex-end', width: '80%', alignItems: 'flex-end', }}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("SignUp")}
                        >
                            <Text style={{ color: '#AFBAD0', marginTop: 3 }}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </KeyboardAvoidingView>
    );
};

export default Login;