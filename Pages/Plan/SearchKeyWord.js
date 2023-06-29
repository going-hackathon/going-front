import React,{ useState} from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../Components/Style'

const SearchKeyWord = () => {
    const [searchText, setSearchText] = useState("")

    const search =() =>{
        console.log('search')
    }





    return (
        <View style={styles.container}>
            <View style={styles.containerMap} >

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.searchBar}>

                        <TextInput
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={(e) => { setSearchText(e) }}
                        />

                        <View style={styles.searchicon}>
                            <TouchableOpacity
                                onPress={() => {
                                    search()
                                }}
                            >
                                <Image style={{ width: 20, height: 20 }} source={require('../../assets/Search.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>
            </View>
        </View>
    );
};

export default SearchKeyWord;