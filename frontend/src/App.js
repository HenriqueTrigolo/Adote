import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/* Components importeds */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'

/* Pages importeds */
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Profile from './components/pages/Users/Profile'
import MyPets from './components/pages/Pets/MyPets'
import AddPet from './components/pages/Pets/AddPet'

/* Context */
import {UserProvider} from './context/UserContext'

function App() {
    return (
        <Router>
            <UserProvider>
                <Navbar/>
                <Message/>
                <Container>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/user/profile" element={<Profile/>}/>
                        <Route path="/pet/mypets" element={<MyPets/>}/>
                        <Route path="/pet/add" element={<AddPet/>}/>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </Container>
                <Footer/>
            </UserProvider>
        </Router>
    );
}

export default App;