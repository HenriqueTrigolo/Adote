import {Link} from 'react-router-dom'

import Logo from '../../assets/img/logo.png'

function Navbar(){
    return(

        <nav>
            <div>
                <img src={Logo} alt="Adote" />
                <h2>Adote</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                <li>
                    <Link to="/Login">Entrar</Link>
                </li>
                <li>
                    <Link to="/register">Cadastrar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar