import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import styles from './styles'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeaherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";
import api from '../../services/api';
import AsyncStorage from "@react-native-community/async-storage";


// import { ScrollView } from 'react-native-gesture-handler';


function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [teachers, setTeachers] = useState([])
    const [favorite, setFavorite] = useState<Number[]>([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
        //se vier algo de dentro do response vai estar em texto, entao sera covertido para formato json
        if (response){
            // console.log(response);
            // console.log(JSON.parse(response));
            const favoritedTeachers = JSON.parse(response);
            const favoritedTeachersIds = favoritedTeachers.map((favoritedTeacher: Teacher) => {
                return favoritedTeacher.id
            })
            
            setFavorite(favoritedTeachersIds)
        }
    })
    }
    
    useEffect(() => {
        loadFavorites()
    }, [])

    

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit(){ 
        loadFavorites()
        console.log({subject, week_day, time})

        const response = await api.get('/classes',{
            params: {
                week_day,
                subject,
                time
            }
        })  
        console.log('oi',response.data)

        setTeachers(response.data)
        setIsFiltersVisible(false)

    }


    return(

        <View style={styles.container}>
            <PageHeader 
              title="Proffys disponiveis" 
              headerRight={(

              <BorderlessButton onPress={handleToggleFiltersVisible}>
                  <Feather name="filter" size={20} color="#fff"/>
              </BorderlessButton>
              
              )}>
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text  style={styles.label}>Materia</Text>

                        <TextInput 
                            placeholderTextColor="#c1bccc" 
                            style={styles.input} 
                            placeholder="Qual é a matéria?"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                
                                <Text  style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    placeholderTextColor="#c1bccc" 
                                    style={styles.input} 
                                    placeholder="Qual o dia?"
                                    value={week_day}
                                    onChangeText={text => setWeek_day(text)}
                                />
                            </View>


                            <View style={styles.inputBlock}>
                                
                                <Text  style={styles.label}>Horario</Text>
                                <TextInput 
                                    placeholderTextColor="#c1bccc" 
                                    style={styles.input} 
                                    placeholder="Qual o Horario?"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                            
                            
                        </View>
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
         
         <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 24
            }}
         >
            {teachers.map((teacher: Teacher) => {
                return (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited={favorite.includes(teacher.id)}
                    />
                )
            })}
            
        </ScrollView>

        </View>
    )
}

export default TeacherList;