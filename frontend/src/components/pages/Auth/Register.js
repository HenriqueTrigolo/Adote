import Input from '../../form/Input'
import styles from '../../form/Form.module.css'

import {Link} from 'react-router-dom'

function Register(){
    function handleChange(e){

    }

    return(
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form>
                <Input type="text" text="Nome" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange}/>
                <Input type="text" text="Telefone" name="phone" placeholder="Digite o seu telefone" handleOnChange={handleChange}/>
                <Input type="email" text="E-mail" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange}/>
                <Input type="password" text="Senha" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange}/>
                <Input type="password" text="Confirmação de senha" name="confirmPassword" placeholder="Confirme a sua senha" handleOnChange={handleChange}/>
                <input type="submit" value="Cadastrar"/>
            </form>
            <p>Já tem conta, <Link to="/login">Clique aqui</Link>.</p>
        </section>
    )
}

export default Register