import { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Dimensions,
    ScrollView, TextInput, Keyboard,
    KeyboardAvoidingView, Alert,
    Image, TouchableOpacity,
    NativeModules, Button, Platform,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import axios from 'axios';

// 키보드가 가리는 문제 때문에 아마 아이폰에만 있을 듯?
const { StatusBarManager } = NativeModules

const IP = "http://13.125.131.18:8080"

const SignUp = (props) => {

    // 입력 내용
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");

    //회원가입 버튼 활설화
    const [okId, setOkId] = useState(false);
    const [okPw, setOkPw] = useState(false);
    const [okName, setOkName] = useState(false);
    const [okBirth, setOkBirth] = useState(false);
    const [okGender, setOKGender] = useState(false);

    const [statusBarHeight, setStatusBarHeight] = useState(0);


    useEffect(() => {
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
        }) : null
    }, []);


    // 버튼 활성화 Sign Up
    const regiButton = () => {
        console.log('regibutton')
        if (okId & okPw & okName & okBirth & okGender == true) {
            return false;
        } else {
            return true;
        }
    }


    //아이디 정규식
    const validateId = id => {
        const regex = /^[a-zA-Z]+[a-zA-Z0-9]{3,12}$/;
        return regex.test(id) && id.length >= 4;
    }

    // 패스워드 정규식
    const validatePw = pw => {
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/;
        return regex.test(pw);
    }

    //이름 정규식
    const validateName = name => {
        const regex = /^[a-zA-Zㄱ-힣]{1,10}$/;
        return regex.test(name);
    }
    
    // 성별 정규식
    const validateGender = gender =>{
        if (gender=="남" || gender=="여"){
            console.log('gender check')
            return true;
        }else{
            return false;
        }
    }


    // 생년월일 정규식
    const validateBirth = birth => {
        const regex = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
        return regex.test(birth) && birth.length == 10;
    }

    // 띄어쓰기 고로시
    const removespace = text => {
        const regex = /\s/g;
        return text.replace(regex, '');
    }

    // 자동 하이픈 생성 생년월일
    const autoHyphenBirth = (target) => {
        return target.replace(/[^0-9]/g, '').replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }


    //아이디 핸들러
    const handleIdChange = (id) => {
        const changeID = removespace(id)
        setId(changeID)
    };

    //비밀번호 핸들러
    const handlePwChange = (pw) => {
        const changedPw = removespace(pw);
        setPassword(changedPw);
        setOkPw(validatePw(changedPw));
    }

    //비밀번호 동일 확인 핸들러
    const handlePwCheckChange = (pwcheck) => {
        setPasswordcheck(pwcheck);
        if(pwcheck==password){
            setOkPw(true);
        }
        else{
            setOkPw(false);
        }
    }

    //이름 핸들러
    const handleNameChange = (name) => {
        const changedName = removespace(name);
        setName(changedName);
        setOkName(validateName(changedName));
    }


    // 생년월일 핸들러
    const handleBirthChange = (birth) => {
        const changeDate = autoHyphenBirth(birth)
        setBirth(changeDate)
        setOkBirth(validateBirth(changeDate))
    }

    // 성별 핸들러
    const handleGenderChange = (gender) => {
        const changeGender = removespace(gender);
        setGender(changeGender)
        setOKGender(validateGender(changeGender))
    }

    // 아이디 중복 확인
    const checkID = (id) => {
        console.log('checkID', id)
        setOkId(true)

        const temp={
            userAccountId: id
        }

        axios.post("http://13.125.131.18:8080/api/users/join", null, {
            params: {
                userAccountId: id
            }
        })
          .then(res =>{
            console.log('res', res.data)
          })

    }



    const SignUpButton = () => {
       
        var g =""
        // 회원가입 DB 넣기
        if (gender === "남") {
            g ="MALE"
        }else if (gender ==="여"){
            g="FEMALE"
        }


        const temp = {
            userAccountId: id,
            password: password,
            nickname:name,
            birth: birth,
            gender:g,
        }
        

        axios.post('http://13.125.131.18:8080/api/users/join', temp)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })



    }


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={"padding"}
                keyboardVerticalOffset={statusBarHeight + 44}
            >
                {/* 사용자 필수정보 */}
                <View style={styles.importInfo}>
                    <View style={{ width: '100%' }}>
                        <Text style={styles.titleText}>ID</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                            <View style={{ borderBottomColor: 'gray', width: '75%', borderBottomWidth: 1, marginBottom: 10, padding: 10 }}>
                                <TextInput
                                    value={id}
                                    placeholder="ID 입력"
                                    onChangeText={handleIdChange}
                                    maxLength={15}
                                ></TextInput>
                            </View>
                            <TouchableOpacity
                                style={validateId(id) ? styles.overlapButton : [styles.overlapButton, { backgroundColor: "#F3BEF5" }]}
                                disabled={!validateId(id)}
                                onPress={() => { checkID(id) }}
                            >
                                <Text style={{ fontSize: 15, color:'white' }}>
                                    중복확인
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                            <Text style={styles.titleText}>비밀번호</Text>
                            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginBottom: 10, padding: 10 }}>
                                <TextInput

                                    secureTextEntry={true}
                                    value={password}
                                    placeholder="비밀번호"
                                    onChangeText={handlePwChange}
                                />
                            </View>

                            <Text style={styles.titleText}>비밀번호 확인</Text>
                            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginBottom: 10, padding: 10 }}>
                                <TextInput

                                    secureTextEntry={true}
                                    value={passwordcheck}
                                    placeholder="비밀번호 확인"
                                    onChangeText={handlePwCheckChange}
                                />
                            </View>

                            <Text style={styles.titleText}>닉네임</Text>
                            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginBottom: 10, padding: 10 }}>
                                <TextInput

                                    value={name}
                                    placeholder="닉네임"
                                    onChangeText={handleNameChange}
                                ></TextInput>
                            </View>


                            <Text style={styles.titleText}>생년월일</Text>
                            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginBottom: 10, padding: 10 }}>
                                <TextInput
                                    value={birth}
                                    placeholder="8자리 입력 ex)19991215"
                                    maxLength={10}
                                    keyboardType={'numeric'}
                                    onChangeText={handleBirthChange}
                                ></TextInput>
                            </View>


                            <Text style={styles.titleText}>성별</Text>
                            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginBottom: 10, padding: 10 }}>
                                <TextInput
                                    value={gender}
                                    placeholder="남/여"
                                    maxLength={10}
                                    onChangeText={handleGenderChange}
                                ></TextInput>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>


                <View style={{ width:'80%', alignItems:'center' }}>
                    <TouchableOpacity
                        style={styles.loginBTN}
                        disabled={regiButton()}
                        onPress={() => {
                            console.log('sign up')
                            SignUpButton()
                        }}
                    >
                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ width: 260, height: 48, justifyContent:'center', alignItems:'center', opacity:0.5}}
                        onPress={() => {
                            props.navigation.navigate("Login")
                        }}
                    >
                        <Text style={{color:'#393D46', fontWeight:'bold', fontSize:18}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>            
        </View>
    );
};

export default SignUp;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    importInfo: { // 회원가입 필수정보
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        marginTop: 8,
        marginLeft: 8,
        color: '#393D46',
        fontWeight: 'bold',
    },
    overlapButton: {
        backgroundColor:'#DD83E0',
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: '25%',
        borderRadius: 5,
        marginLeft: 5,
    },
    loginBTN: {
        backgroundColor: '#F3BEF5',
        width: 260,
        height: 48,
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});