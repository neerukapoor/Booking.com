import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Landing from './components/Landing';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/adminlogin" element={<Login/>}/>
          <Route path="/adminsignup" element={<Signup/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
