import React from "react";
import { View, StyleSheet, Button, Image, Text, Dimensions ,ScrollView, SafeAreaView} from "react-native";
import BodyText from "../Components/BodyText";
import MainButton from "../Components/MainButton";

const GameOver = props => {
    return (
        <ScrollView>
        <View style = {styles.screen}>    
            <BodyText>The Game Came to an end !!!</BodyText>
            <View style={styles.imageContainer}>
            <Image 
            source = {require('../assets/Sergio-Ramos.jpeg')} 
            style ={styles.image} 
            resizeMode='contain'
        />
            </View>
            <BodyText style = {styles.resultText}>
                Your device guess number<Text style = {styles.highlights}>{props.userNumber} </Text> 
                in 
                <Text style= {styles.highlights}>{props.roundsNumber}</Text>
                rounds
                </BodyText>
            <MainButton onPress={props.onRestart}> New Game !!! </MainButton>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.396,
        height: Dimensions.get('window').width * 0.75,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'orange',
        overflow:'hidden',
        marginVertical: Dimensions.get('window').height / 20
    },
    image: {
    width: '107%',
    height: '104%'
    },
    highlights: {
        color: 'red',
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
        padding: 20
    }
});

export default GameOver;