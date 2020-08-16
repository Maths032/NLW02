import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import styles from './styles'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeaherItem';

function Favorites() {
    const [favorite, setFavorite] = useState([])

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            //se vier algo de dentro do response vai estar em texto, entao sera covertido para formato json
            if (response){
                // console.log(response)
                // console.log(JSON.parse(response))
                const favoritedTeachers = JSON.parse(response);
                setFavorite(favoritedTeachers)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

    return(
        

        <View style={styles.container}>
          <PageHeader title="Meus proffys favoritos"/>

          <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 24
            }}
         >
            {favorite.map((teacher: Teacher) => {
                return (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited
                    />
                )
            })}
        </ScrollView>

        </View>
    )
}

export default Favorites;