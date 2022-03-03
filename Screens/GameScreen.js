import React, {useState, useRef, useEffect} from "react";
import {View, StyleSheet, Text, Alert, ScrollView, Dimensions} from 'react-native';
import NumberContainer from "../Components/NumberContainer";
import Card from "../Components/Card";
import MainButton from "../Components/MainButton";
import BodyText from "../Components/BodyText";
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from  'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min= Math.ceil(min);
    max=Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min,max,exclude);
    }
    else {
        return rndNum;
    }
};
const renderListItem = (value, numofRound) => (
    <View key={value} style={styles.listItems}>
    <BodyText>#{numofRound}</BodyText>
    <BodyText>{value}</BodyText>
    </View>
);





const gameScreen = props => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [currentGuess,setCurrentGuess] = useState(initialGuess);
    const[pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess,userChoice,onGameOver]);

        const nextGuessHandler = direction => {
            if(
            (direction === 'Lower' && currentGuess < props.userChoice) || 
            (direction === 'Greater' && currentGuess > props.userChoice)
            ){
                Alert.alert("Don't lie", "This is Incorrect",[
                    {text: 'sorry', style: 'cancel'}
            ]);
            return;
        }   

        if(direction === 'Lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1 ;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
       // setRounds(currentRounds => currentRounds + 1);
        setPastGuesses(currPastGuesses => [nextNumber,...currPastGuesses]);
        };
    let listContainerStyle = styles.listContainer;

    if(Dimensions.get('window').width < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.button0} >
                <MainButton onPress ={nextGuessHandler.bind(this, 'Lower')}>
                    <Ionicons name="md-remove"  size={24} color ="black"/>
                </MainButton>
                <MainButton onPress ={nextGuessHandler.bind(this, 'Greater')}> 
                <Ionicons name="md-add"  size={24} color ="black"/>
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
            <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    button0: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Dimensions.get('window').height > 800 ? 20 : 5,
        width: 500,
        maxWidth: '90%',
        width: '60%'
        
    },
    text:{
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: 'red'
    },
    listItems: {
        borderColor: 'grey',
        marginVertical: 10,
        backgroundColor: 'white',
        borderColor : '#ccc',
        padding: 15,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
        
    },
    listContainerBig: {
        flex : 1,
        width: '80%'
    }
});
 export default gameScreen;