import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {HomeStackNavigator, PlanStackNavigator, MyPageStackNavigator} from './StackNavigator'

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeBackgroundColor: 'skyblue',
                activeTintColor: 'blue',
                inactiveBackgroundColor: 'yellow',
                style: {
                    backgroundColor: '#c6cbef',
                    opacity: 0.5
                },
                labelPosition: 'beside-icon'
            }}
            screenOptions={({ route }) => ({
                tabBarLabel: route.name,
            })}

        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Plan" component={PlanStackNavigator} />
            <Tab.Screen name="Mypage" component={MyPageStackNavigator} />
        </Tab.Navigator>
    );
};

export default TabNavigator;