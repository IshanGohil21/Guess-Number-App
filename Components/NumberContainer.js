import React from 'react';
import {View ,Text, StyleSheet} from 'react-native';




const NumberContainer = props => {
    return (
        <View style={Styles.container}>
        <Text style= {Styles.number}>{props.children}</Text>
    </View>
    );

}

const Styles = StyleSheet.create({
    container:{
        borderWidth: 2,
        borderColor:'orange',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: 'green',
        fontSize: 22
    }
}); 
export default NumberContainer;