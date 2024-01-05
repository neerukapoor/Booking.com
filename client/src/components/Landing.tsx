import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    return <> 
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Card sx={{ minWidth: 275 }}>
                <div style={{display:"flex", flexDirection:"column", margin:"20px"}}>
                    <Button variant="contained" style={{marginBottom:"10px"}} href='/adminlogin'>Login</Button>
                    <Button variant="contained" style={{marginBottom:"10px"}} href='/adminsignup'>Signup</Button>
                    <GoogleLogin
                        onSuccess={ async credentialResponse => {
                            console.log(credentialResponse)
                            const response = await axios.post('http://localhost:3000/admin/google',{
                                ...credentialResponse
                            })
                            console.log(response)
                            navigate("/booking");
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />
                </div>
            </Card>
        </div>
    </>
}

export default Landing;