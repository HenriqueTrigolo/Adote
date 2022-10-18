import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/* Components importeds */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'

/* Pages importeds */
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;