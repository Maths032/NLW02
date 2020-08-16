// eslint-disable-next-line 
import React from 'react';

import wppIcon from '../../assets/images/icons/whatsapp.svg'


import './styles.css'
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

interface TeacheritemsProps {
    teacher: Teacher
}

const  TeacherItem: React.FC<TeacheritemsProps> = ({teacher}) => {

    function createNewConnection(){
        api.post('/connections', {
            user_id: teacher.id
        })
    }

   return(
         <article className="teacher-item">
                <header>
                    <img src={teacher.avatar} alt="Foto Perfil"/>
                    <div>
                        <strong>{teacher.name}</strong>
                        <span>{teacher.subject}</span>
                    </div>
                </header>
                <p>
                {teacher.bio}
                </p>
                <footer>
                    <p>
                        Preço/hora 
                        <strong>R$ {teacher.cost}</strong>
                    </p>
                    <a target="_blank" rel="noopener noreferrer"  onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}?text=Olá,%20vi%20sobre%20sua%20aula%20no%20Proffy%20e%20gostaria%20de%20entrar%20em%20contato`} type="button">
                    <img src={wppIcon} alt="WhatsApp Icon"/>
                    Entrar em contato
                    </a>
                </footer>
            </article>
        )
}


export default TeacherItem