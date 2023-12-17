import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userLogin = () => {
        fetch('http://localhost:3000/admin/login', {
            method:"POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            localStorage.setItem("jwtToken", data.token)
            navigate("/booking");
        })
    }

    return <>
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"85vh"}}>
        <Card sx={{ display:"flex", flexDirection:"column", justifyContent:"center", minWidth: 375, minHeight: 255, alignItems:"center", padding:"20px" }}>
            <div style={{display:"flex", flexDirection:"column"}}>
                <TextField style={{ width:"100%", marginBottom:"10px"}} id="outlined-basic" label="Email ID" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>   
                <TextField id="outlined-basic" label="Password " variant="outlined" onChange={(e) => setPassword(e.target.value)}/>   
                <Button style={{marginTop:"20px", marginBottom:"20px"}} variant="contained" onClick={userLogin}>Login</Button>
            </div>
            Don't have Account?
            <Button variant="contained" href='/adminsignup'>Signup</Button>
        </Card>
        </div>
    </> 
}

export default Login;