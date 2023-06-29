import { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Dimensions,
    ScrollView, TextInput, Keyboard,
    KeyboardAvoidingView, Alert,
    Image, TouchableOpacity,
    NativeModules, Button, Platform,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

// 키보드가 가리는 문제 때문에 아마 아이폰에만 있을 듯?
const { StatusBarManager } = NativeModules


const SignUp = (props) => {

    // 입력 내용
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");

    //회원가입 버튼 활설화
    const [okId, setOkId] = useState(false);
    const [okPw, setOkPw] = useState(false);
    const [okName, setOkName] = useState(false);
    const [okBirth, setOkBirth] = useState(false);

    const [statusBarHeight, setStatusBarHeight] = useState(0);


    useEffect(() => {
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
        }) : null
    }, []);


    // 버튼 활성화 Sign Up
    const regiButton = () => {
        if (okId & okPw & okName & okBirth == true) {
            return false;
        }
        return true;
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
        const regex = /^[a-zA-Zㄱ-힣]{1,20}$/;
        return regex.test(name);
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
        // setErrorMessageID(
        //   validateId(changeID) ? "올바른 ID 형식입니다." : "영문로 시작하는 영문자 또는 숫자 4~12자리"
        // );

    };

    //비밀번호 핸들러
    const handlePwChange = (pw) => {
        const changedPw = removespace(pw);
        setPassword(changedPw);
        // setErrorMessagePw(
        //   validatePw(changedPw) ? "올바른 비밀번호 형식입니다." : "영문, 숫자 조합 8~16자리"
        // );
        setOkPw(validatePw(changedPw));
    }

    //이름 핸들러
    const handleNameChange = (name) => {
        const changedName = removespace(name);
        setName(changedName);
        // setErrorMessageName(
        //   validateName(changedName) ? "올바른 이름 형식입니다." : "이름을 올바르게 입력해주세요."
        // );
        setOkName(validateName(changedName));
    }


    // 생년월일 핸들러
    const handleBirthChange = (birth) => {
        const changeDate = autoHyphenBirth(birth)
        setBirth(changeDate)
        // setErrorMessageBirth(
        //   validateBirth(changeDate) ? '올바른 생년월일 형식입니다.' : '올바른 생년월일 형식이 아닙니다.'
        // )
        setOkBirth(validateBirth(changeDate))
    }



    const SignUpButton = () => {
        Alert.alert('회원가입 완료')
            // 회원가입 DB 넣기
            (async () => {
                // 가입 날짜
                let todayData = new Date();
                let today = todayData.toLocaleDateString()

                // DB 넣기
                const docRef = await setDoc(doc(db, "User", id), {
                    u_date: today,
                    u_donation: 0,
                    u_id: id,
                    u_name: name,
                    u_pw: password,
                    u_rent: false,
                });

                console.log("Document written with ID: ", docRef.id);
                props.navigation.navigate("Main") // 회원가입 완료 후 로그인 화면으로 이동
            })();


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
                                style={validateId(id) ? styles.overlapButton : [styles.overlapButton, { opacity: 0.4 }]}
                                disabled={!validateId(id)}
                                onPress={() => { checkID(id) }}
                            >
                                <Text style={{ fontSize: 15 }}>
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
                                    value={password}
                                    placeholder="비밀번호 확인"
                                    onChangeText={handlePwChange}
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
                        </TouchableWithoutFeedback>
                    </View>
                </View>


                <View style={{ backgroundColor: 'orange', }}>
                    <TouchableOpacity
                        style={styles.loginBTN}
                        disabled={regiButton()}
                        onPress={() => {
                            console.log('sign up')
                            SignUpButton()
                        }}
                    >
                        <Text style={regiButton() ? [styles.loginText, { opacity: 0.3 }] : styles.loginText}>Sign Up</Text>
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
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    title: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.15,
    },
    importInfo: { // 회원가입 필수정보
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitbutton: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.1,
    },
    //로그인 화면 인풋텍스트
    idloginputText: {
        width: '73%',
        height: 35,
        fontSize: 18,
        color: 'black',
        backgroundColor: '#EDEDED',
        borderRadius: 3,
        alignItems: 'center',
        padding: 5,
    },
    loginputText: {
        width: '100%',
        height: 35,
        fontSize: 18,
        color: 'black',
        backgroundColor: '#EDEDED',
        borderRadius: 3,
        alignItems: 'center',
        padding: 5,
    },
    titleText: {
        marginTop: 8,
        marginLeft: 8,
        color: '#6699FF',
        fontWeight: 'bold',
    },
    overlapButton: {
        backgroundColor: '#6699FF',
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: '25%',
        borderRadius: 5,
        marginLeft: 5,
    },
    loginBTN: {
        backgroundColor: '#D9E5FF',
        width: 100,
        height: 30,
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //로그인 화면 버튼 텍스트
    loginText: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
});