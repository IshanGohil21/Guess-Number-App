import { StyleSheet,  View, SafeAreaView } from 'react-native';
import React , {useState} from 'react';
import Header from './Components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOver from './Screens/GameOver';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; 

const fetchFonts = () => {
  return  Font.loadAsync({
    'open-sans' : require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/Fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber,setUserNumber] = useState();
  const [guessRounds, setguessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return (
    <AppLoading 
    startAsync={fetchFonts} 
    onFinish={() => setDataLoaded(true)}
    onError ={(err) => console.log(err)}
      />
    );
  }
  
  const configureNewGameHandler = () => {
    setguessRounds(0);
    setUserNumber(null);
  };
  const StartGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };
  const GameOverHandler = numOfRounds => {
    setguessRounds(numOfRounds);
  };
  let content = <StartGameScreen onStartGame = {StartGameHandler} />

  if(userNumber && guessRounds <= 0) {
    content= (
    <GameScreen userChoice={userNumber} onGameOver={GameOverHandler}/>
    );
  } else if(guessRounds > 0){
    content = (
    <GameOver 
      roundsNumber={guessRounds} 
      userNumber={userNumber} 
      onRestart={configureNewGameHandler}
     />
    );
  }

  return (
    <SafeAreaView  style={styles.screen}>
      <Header title="Guess Any Number of Your Will" />
      {content}  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    }
});
