import { View, Image } from 'react-native'

const TabBarIcon = (focused, name) => {
    let iconImagePath;
    let iconNomalImagePath;

    if (name === 'Home') {
        iconImagePath = require('../assets/Home_d.png')
    } else if (name === 'Plan') {
        iconImagePath = require('../assets/Plan_d.png')
    } else if (name === 'Mypage') {
        iconImagePath = require('../assets/MyPage_d.png')
    }

    if (name === 'Home') {
        iconNomalImagePath = require('../assets/Home_w.png')
    } else if (name === 'Plan') {
        iconNomalImagePath = require('../assets/Plan_w.png')
    } else if (name === 'Mypage') {
        iconNomalImagePath = require('../assets/MyPage_w.png')
    }

    return (
        <Image
            style={{
                width: focused ? 54 : 52,
                height: focused ? 54 : 52,
            }}
            source={focused ? iconImagePath : iconNomalImagePath}
        />
    )
}
export default TabBarIcon;