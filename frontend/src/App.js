import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/* Pages importeds */

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;