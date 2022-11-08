import {useState} from 'react'

import formStyle from './Form.module.css'

import Input from './Input'

import Select from './Select'

function PetForm({handleSubmit, petData, btnText}){

    const [pet, setPet] = useState( petData || {} )
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Caramelo', 'Cinza', 'Mesclado', 'Pintado', 'Outra']

    function onFileChange(e){}

    function handleChange(e){}

    function handleColor(e){

    }

    return(
        <form className={formStyle.form_container}>
            <Input text="Imagens do Pet" type="file" name="images" handleOnChange={onFileChange} multiple={true} />
            <Input text="Nome do Pet" type="text" name="name" placeholder="Digite o nome" handleOnChange={handleChange} value={pet.name || ''} />
            <Input text="Idade do Pet" type="text" name="age" placeholder="Digite a idade" handleOnChange={handleChange} value={pet.age || ''} />
            <Input text="Peso do Pet" type="number" name="weight" placeholder="Digite o peso" handleOnChange={handleChange} value={pet.weight || ''} />
            <Select text="Selecione a cor" name="color" options={colors} handleOnChange={handleColor} value={pet.color || ''} />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default PetForm