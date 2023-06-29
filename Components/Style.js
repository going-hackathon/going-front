import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    textstyle:{
        fontSize:20,
        color:'orange'
    },
    mainHeader: {
      backgroundColor: '#5F7193',
      width:Dimensions.get('window').width* 0.9,
      // marginVertical: 10,
      // marginHorizontal: 10,
      height: Dimensions.get('window').height*0.1,
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
      width: Dimensions.get('window').width* 0.9,
      // height: Dimensions.get('window').height*0.68, // 이거 수정
      height: 300,
      marginTop: '6%',
      marginBottom: '20%',
      flexDirection: 'column'
    }
})