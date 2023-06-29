import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {HomeStackNavigator, PlanStackNavigator, MyPageStackNavigator} from './StackNavigator'
import TabBarIcon from './TabBarIcon'
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                style: {
                    radiuswidth:10,
                },
                showLabel: false,
                labelPosition: 'beside-icon'
            }}
            
            screenOptions={({ route }) => ({
                showLabel: false,
                headerShown:false,
                tabBarIcon: ({ focused }) => (
                    TabBarIcon(focused, route.name)
                ),
                tabBarStyle: {
                    height: 100,
                    backgroundColor:'#424242',
                    opacity: 0.5,
                    paddingTop: 10,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    borderLeftWidth: 0.2,
                    borderRightWidth: 0.2,
                    position: 'absolute',
                    overflow: 'hidden',
                },
            })}

        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Plan" component={PlanStackNavigator} />
            <Tab.Screen name="Mypage" component={MyPageStackNavigator} />
        </Tab.Navigator>
    );
};

export default TabNavigator;