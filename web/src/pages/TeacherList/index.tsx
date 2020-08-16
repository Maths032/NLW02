import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem'


import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';


function TeacherList(){

    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')

    

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();
        console.log({subject, week_day, time})

        const response = await api.get('/classes',{
            params: {
                week_day,
                subject,
                time
            }
        })  
        console.log(response)

        setTeachers(response.data)

    }

    return(
        <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os proffys disponiveis.">
               <form id="search-teachers" onSubmit={searchTeachers}>
               <Select 
                label="Matéria" 
                defaultOption="Matéria"
                name="subject" 
                value={subject}
                onChange={(e) => { setSubject(e.target.value)} }
                options={[
                       {value: 'Artes', label: 'Artes' },
                       {value: 'Biologia', label: 'Biologia' },
                       {value: 'Ciências', label: 'Ciências' },
                       {value: 'Educação Fisica', label: 'Educação Fisica' },
                       {value: 'Geografia', label: 'Geografia'},
                       {value: 'Historia', label: 'Historia'},
                       {value: 'Português', label: 'Português'},
                       {value: 'Matématica', label: 'Matématica'},
                       {value: 'Química', label: 'Química'}       
                   ]}/>

                    <Select 
                        label="Dia da semana" 
                        name="week_day" 
                        defaultOption="Dia da semana"
                        value={week_day}
                        onChange={(e) => { setWeek_day(e.target.value)} }
                        options={[
                            {value: '0', label: 'Domingo' },
                            {value: '1', label: 'Segunda-feira' },
                            {value: '2', label: 'Terça-feira' },
                            {value: '3', label: 'Quarta-feira' },
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sábado'},
                   ]}/>
                    <Input 
                        type="time" 
                        name="time" 
                        label="Horario" 

                        value={time}
                        onChange={(e) => { 
                            setTime(e.target.value)
                        }}
                    />
                    <button type="submit">
                        Buscar
                    </button>
               </form>
           </PageHeader>

           <main>

               {teachers.map((teacher: Teacher) =>  {
                   return <TeacherItem key={teacher.id} teacher={teacher} />
                   
               })}
              
           </main>
        </div>
    )
}

export default TeacherList