import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  containerMap: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttons: {
    padding: 5,
    height: "10%",
    flexDirection: 'row',
    widh: "100%",
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  weathertab: {
    width: '100%',
    height: Dimensions.get('window').height * 0.08,
    backgroundColor: 'white',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  closemap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    width: '40%'
  },
  qrscanner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#5775D9',
    width: '40%',
    flexDirection: 'row'
  },
  mylocation: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
  },

  // CreatePlan
  searchBar: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.06,
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
  },
  searchInput: {
    width: '85%',
    height: '100%',
    backgroundColor: '#EFEFF0',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  searchicon: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#EFEFF0',
  },




  // Login
  loginView: {
    width: '100%',
    height: '70%',
    backgroundColor: '#5F7193',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  loginInput: {
    backgroundColor: 'white',
    width: '100%',
    height: '40%',
    borderRadius: 7,
    marginBottom: 10,
    padding: 5
  },
  loginButton: {
    backgroundColor: '#F3BEF5',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // signUp
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
  textstyle: {
    fontSize: 20,
    color: 'orange'
  },
  mainHeader: {
    backgroundColor: '#5F7193',
    width: Dimensions.get('window').width * 0.9,
    // marginVertical: 10,
    // marginHorizontal: 10,
    height: Dimensions.get('window').height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    padding: '5%',
    borderRadius: 15,
  },
  logo: {
    fontSize: 24,
    textAlign: 'center',
  },
  mainHeadImg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  mainBody: {
    // backgroundColor: 'blue',
    width: Dimensions.get('window').width * 0.9,
    // height: Dimensions.get('window').height*0.68, // 이거 수정
    height: 300,
    marginTop: '6%',
    marginBottom: '20%',
    flexDirection: 'column'
  },
  planList: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: '#5F7193',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
    marginBottom: '15%',
  }
})