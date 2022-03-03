import React, {useState, useEffect} from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert ,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from "../Components/Card";
import Inputs from "../Components/Inputs";
import NumberContainer from "../Components/NumberContainer";
import BodyText from "../Components/BodyText";
import MainButton from "../Components/MainButton";


const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [Confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const[ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 4);


    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const ResetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    useEffect( () => {

    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width/4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
        Dimensions.removeEventListener('change' , updateLayout);
    };
    });

    const confirmInputHandle = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber> 99){
            Alert.alert(
            'Enter a Valid Number', 
            '2 digit number only', 
            [{text: 'okay', style: 'destructive' , onPress: ResetInputHandler}]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss;
    };
    let confirmedOutput;

    if(Confirmed){
        confirmedOutput = (
         <Card style={styles.summary}>
            <BodyText>Your Selection</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton  onPress={() => props.onStartGame(selectedNumber) }>
                Start Game
            </MainButton>
        </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                 onPress={() => {
                Keyboard.dismiss();
                }}>
            <View style = {styles.screen}>
                <Text style = {styles.title}>Start Fresh</Text>
                    <Card style={styles.input}> 
                        <BodyText>Select a Number of your Choice</BodyText>
                        <Inputs 
                        style={styles.input0} 
                        blurOnSubmit 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        keyboardType="number-pad" 
                        maxLenght={2}
                        onChangeText = {numberInputHandler}
                        value = {enteredValue}
                    />
                    <View style = {styles.button}>
                        <View style={{width: buttonWidth}}>
                            <Button 
                            title="Reset" 
                            onPress={(ResetInputHandler)}
                            color="red" />   
                        </View>
                        <View style={{width: buttonWidth}}>
                            <Button title="Confirm" 
                            onPress={(confirmInputHandle)} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems:'center',
//      justifyContent: 'flex-start'
    },
    title: {
        fontSize: 18,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    button: {
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-between',
        paddingHorizontal: 10
    },
    input: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
        fontFamily: 'open-sans'
    },
    button0: {
        //width: 100
        width: Dimensions.get('window').width / 4
    },
    input0:{
        width: 50,
        textAlign: 'center',
        fontFamily: 'open-sans'
    },
    summary: {
        margin: 20
    },
    text:{
        fontFamily: 'open-sans'
    }
});
export default StartGameScreen;