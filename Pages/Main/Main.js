import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {styles} from '../../Components/Style'

const Main = (props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("PinMap") 
                }}
            >
                <Text>PinMap</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("PlanList") 
                }}
            >
                <Text>PlanList</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Main;