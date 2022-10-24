import {Link} from 'react-router-dom'

import { useContext } from 'react'

import Logo from '../../assets/img/logo.png'

import styles from './Navbar.module.css'

import {Context} from '../../context/UserContext'

function Navbar(){

    const {authenticated, logout} = useContext(Context)

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Adote" />
                <h2>Adote</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                {
                    authenticated ? (
                    <>
                        <li onClick={logout}>Sair</li>
                    </>
                    ) : (
                    <>
                        <li>
                            <Link to="/Login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>)
                }
                
            </ul>
        </nav>
    )
}

export default Navbar