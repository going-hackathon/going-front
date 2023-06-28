import { createStackNavigator } from '@react-navigation/stack'

import Main from '../Pages/Main/Main'
import PinMap from '../Pages/Main/PinMap'
import PlanList from '../Pages/Main/PlanList'
import Plan from '../Pages/Plan/CreatePlan'
import MyPage from '../Pages/MyPage/MyPage'

const Stack = createStackNavigator();

const screenOptionStyle = ({route}) => 
  ({
      tabBarLabel: route.name,
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
      headerShown: false
    });


const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="PinMap" component={PinMap} />
      <Stack.Screen name="PlanList" component={PlanList} />
    </Stack.Navigator>
  );
}

const PlanStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Plan" component={Plan} />
    </Stack.Navigator>
  );
}


const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='MyPage' component={MyPage} />
    </Stack.Navigator>
  )
}

export { HomeStackNavigator, PlanStackNavigator, MyPageStackNavigator };