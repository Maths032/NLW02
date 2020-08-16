import React, {useState, FormEvent } from 'react';
import { useHistory } from "react-router-dom";
import './styles.css'

import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm(){

    const history = useHistory()


    //informaões do professor
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    //informações aula  
    const [subject, setSubject] =  useState('')
    const [cost, setCost] =  useState('')



    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: ''}
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
        { week_day: 0, from: '',  to: '' }
        ])
    }

    function setScheduleItemValue(position:number, field: string, value: string) {
     const updateScheduleItems = scheduleItems.map((scheduleItem, index) =>{
         if(index === position) {
            return {...scheduleItem, [field]: value}            
         }
         return scheduleItem;
     })   
     setScheduleItems(updateScheduleItems)
    }

    async function handleCreateClass(e: FormEvent) {
        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro!')
        })

        e.preventDefault()
     console.log({
         name,
         avatar,
         whatsapp,
         bio,
         type: 'Informações aula',
         subject,
         cost
     })   
    }

    return(
        <div id="page-teacher-form" className="container">
           <PageHeader title="Que incrivel que você quer dar aulas." 
           description="O primeiro passo é preencher esse formulario de inscrição."
           />
           <main>
               <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input 
                        label="Nome completo" 
                        name="name"

                        value={name}
                        onChange={(e) => { setName(e.target.value)}}
                    />

                    <Input 
                        label="Avatar" 
                        name="avatar"

                        value={avatar}
                        onChange={(e) => { setAvatar(e.target.value)}}
                        />

                    <Input 
                        label="WhatsApp" 
                        name="whatsapp"

                        value={whatsapp}
                        onChange={(e) => { setWhatsapp(e.target.value)}}
                        />

                    <TextArea 
                        label="Biografia" 
                        name="bio" 
                        
                        value={bio}
                        onChange={(e) => { setBio(e.target.value)}}
                        />
                </fieldset>


                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select label="Materia" 
                    value={subject}
                    onChange={
                        (e) => {setSubject(e.target.value)}
                    }
                    name="subject" 
                    defaultOption="Matéria"
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
                    <Input 
                    label="Custo da sua hora de aula(R$)" 
                    name="cost"
                    value={cost}
                    onChange={
                        (e) => {setCost(e.target.value)}
                    }
                    /> 
                </fieldset>


                <fieldset>
                    <legend>Horários disponíveis <button type="button" onClick={addNewScheduleItem}> + Novo Horario</button></legend>
                    
                    {scheduleItems.map((scheduleItem, index) => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">

                            <Select 
                                label="Dia da semana" 
                                name="week_day" 
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                defaultOption="Dia da semana"
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
                                name="from" 
                                label="Das" 
                                type="time"
                                value={scheduleItem.from}
                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                            />
                            <Input 
                                name="to" 
                                label="Até" 
                                type="time"
                                value={scheduleItem.to}                           
                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                            />
                            
                        </div>
                        )
                    })}
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Icone de aviso"/>
                        Importante!<br/> 
                        Preencha todos os dados
                    </p>

                    <button type="submit">
                        Salvar cadastro
                    </button>
                </footer>
                </form>
           </main>
        </div>
    )
}

export default TeacherForm