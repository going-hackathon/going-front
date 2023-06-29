import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {HomeStackNavigator, PlanStackNavigator, MyPageStackNavigator} from './StackNavigator'

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                // activeBackgroundColor: 'skyblue',
                // activeTintColor: 'blue',
                // inactiveBackgroundColor: 'yellow',
                style: {
                    backgroundColor: '#gray',
                    opacity: 0.5,
                    radiuswidth:10,
                },
                labelPosition: 'beside-icon'
            }}
            
            screenOptions={({ route }) => ({
                tabBarLabel: route.name,
                tabBarStyle: {
                    backgroundColor:'#424242',
                    opacity: 0.5,
                    paddingTop: 7,
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