import React from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity} from "react-native";

const MainButton = props => {
    return <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View style = {styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
};




const styles = StyleSheet.create({
    button: {
        backgroundColor:'yellow',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20
    },
    buttonText: {
        color: 'black',
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }

});
export default MainButton;