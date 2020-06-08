import React from 'react';
import { StyleSheet, View, ImageBackground, Platform} from 'react-native';

const Background = props => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/loginbackgroundtest2.png')}
                style={styles.image}>
                {props.children}
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
    image: {
        flex :1,
        resizeMode:'cover',
        bottom: Platform.OS === 'android' ? 40 : null
    }
})
export default Background;