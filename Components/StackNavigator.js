import { createStackNavigator } from '@react-navigation/stack'

import Main from '../Pages/Main/Main'
import PinMap from '../Pages/Main/PinMap'
import PlanList from '../Pages/Main/PlanList'
import MyPinMap from '../Pages/Main/MyPinMap'
import Plan from '../Pages/Plan/CreatePlan'
import Search from '../Pages/Plan/SearchKeyWord'
import MyPage from '../Pages/MyPage/MyPage'
import SignUp from '../Pages/MyPage/SignUp'
import Login from '../Pages/MyPage/Login'


const Stack = createStackNavigator();

const screenOptionStyle = ({route}) => 
  ({
      tabBarLabel: route.name,
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
    });


const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="PinMap" component={PinMap} />
      <Stack.Screen name="PlanList" component={PlanList} />
      <Stack.Screen name="MyPinMap" component={MyPinMap} />
    </Stack.Navigator>
  );
}

const PlanStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Plan" component={Plan} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}


const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='MyPage' component={MyPage} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />      
    </Stack.Navigator>
  )
}

export { HomeStackNavigator, PlanStackNavigator, MyPageStackNavigator };