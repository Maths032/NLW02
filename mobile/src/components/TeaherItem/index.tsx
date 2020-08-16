import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';



import styles from './styles';
import api from '../../services/api';

export interface Teacher {
    avatar: string
    bio: string
    cost: number
    id: number
    name: string
    subject: string
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher
    favorited: boolean
}


const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorite, setIsFavorite] = useState(favorited)
 
 
    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = []

        if (favorites) {
            favoritesArray = JSON.parse(favorites)
        }   


        if(isFavorite){
            //remover dos favoritos
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) =>{
                return (
                    teacherItem.id === teacher.id
                )
            })

            favoritesArray.splice(favoriteIndex, 1)
            setIsFavorite(false)
        }else{
            //adicionar aos favoritos

            favoritesArray.push(teacher)
            setIsFavorite(true)
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }


    function openWhatsappLink(){
        api.post('/connections', {
            user_id: teacher.id,
        })

        Linking.openURL(`https://wa.me/${teacher.whatsapp}?text=Olá,%20vi%20sobre%20sua%20aula%20no%20Proffy%20e%20gostaria%20de%20entrar%20em%20contato`)
    }

    return( 
    <View style={styles.container}>
        <View style={styles.profile}>
            <Image 
               style={styles.avatar}
               source={{ uri: teacher.avatar }}
            />

            <View style={styles.profileinfo}>

                <Text style={styles.name}>{teacher.name}</Text>
                <Text style={styles.subject}>{teacher.subject}</Text>
                
            </View>
        </View>


        <Text style={styles.bio}>
                {teacher.bio}
        </Text>

        <View style={styles.footer}>

            <Text style={styles.price}>
                Preço/Hora {'     '}
                <Text style={styles.priceValue}>
                   R$ {teacher.cost}
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>

                <RectButton onPress={handleToggleFavorite} style={[styles.favoriteButton, isFavorite ? styles.favorited : {}, ]}>
                    {isFavorite ?  <Image source={unfavoriteIcon}/> : <Image source={heartOutlineIcon}/>}
                    
                </RectButton>

                <RectButton onPress={openWhatsappLink}style={styles.contactButton}>
                    <Image source={whatsappIcon}/>
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
        </View>
    </View>
    )
}

export default TeacherItem;