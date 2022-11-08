import api from '../../../utils/api'

import stylus from './AddPet.module.css'

import {useState} from 'react'

import {useHostory} from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

import PetForm from '../../form/PetForm'

function AddPet(){
    return(
        <section className={stylus.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficara disponível para adoção</p>
            </div>
            <PetForm btnText="Cadastrar Pet"/>

        </section>
    )
}

export default AddPet