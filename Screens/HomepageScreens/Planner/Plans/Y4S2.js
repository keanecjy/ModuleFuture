import React from 'react'
import {Text, View, StyleSheet} from 'react-native';

const Y4S2 = () => {
    return (
        <View style={styles.container}>
            <Text>
                hello world
            </Text>
        </View>
    )
}

export default Y4S2;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})