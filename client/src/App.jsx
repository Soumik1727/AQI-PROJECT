
import { Routes, Route } from "react-router";
import './App.css'
import NavBar from './components/NavBar';
import Home from'./pages/Home'
import Stats from'./pages/Stats'
import Store from'./pages/Store'
import Footer from './components/Footer';
import Error from './pages/Error'
function App() {

    return (
        <>
            <div className="full">
                <NavBar/>
                <Routes>
                    <Route path = '/' element={<Home/>}/>
                    <Route path = '/stats' element={<Stats/>}/>
                    <Route path = '/store' element={<Store/>}/>
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
            <Footer/>
        </>
    )
}

export default App
