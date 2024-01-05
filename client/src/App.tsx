import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Landing from './components/Landing';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Booking from './components/Booking';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { adminState } from './store/atoms/admin';


function App() {
  return (
    <>
      <RecoilRoot>
        <NavBar/>
        <InitUser/>
        <Router>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/adminlogin" element={<Login/>}/>
            <Route path="/adminsignup" element={<Signup/>}/>
            <Route path="/booking" element={<Booking/>}/>
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  )
}

function InitUser() {
  const setAdmin = useSetRecoilState(adminState);
  const init = () =>{
    fetch('http://localhost:3000/loggedIn', {
      headers: {
        "Content-type" : "application/json",
        "jwtToken": "Bearer " + localStorage.getItem("jwtToken")
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      setAdmin({
        email: data.user.email
      })
    })
  }
  useEffect(() => {
    init();
  },[])
  return <>
  </>
}

export default App
