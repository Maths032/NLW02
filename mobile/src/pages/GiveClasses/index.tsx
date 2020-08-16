import React from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, Linking } from "react-native";
import styles from './styles';

import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
function GiveClasses() {
    const navigation = useNavigation();

    function handleNavigateBack(){
        navigation.goBack()
    }

    function openExternalLink(){
        Linking.openURL('http://192.168.2.4:3000/give-classes')
    }

    return (
        <View style={styles.container}>
         <ImageBackground 
          resizeMode="contain" 
          source={giveClassesBgImage} 
          style={styles.content}
          >
            <Text style={styles.title}>Quer ser um Proffy?</Text>
            <Text style={styles.description}>Para começar, você deve se cadastrar como professor na nossa plataforma web.</Text>


         </ImageBackground>         
           <View style={styles.containerButtons}>
            <RectButton onPress={openExternalLink}style={styles.okButton}>
                <Text style={styles.okButtonText}>Ir para página web</Text>
            </RectButton>

            <RectButton onPress={handleNavigateBack} style={styles.returnButton}>
                <Text  style={styles.returnButtonText}>Voltar</Text>
            </RectButton>
            </View>        
        </View>
    )
}

export default GiveClasses