import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

function Landing() {
    return <> 
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"85vh"}}>
            <Card sx={{ minWidth: 275 }}>
                <div style={{display:"flex", flexDirection:"column", margin:"20px"}}>
                    <Button variant="contained" style={{marginBottom:"10px"}} href='/adminlogin'>Login</Button>
                    <Button variant="contained" href='/adminsignup'>Signup</Button>
                </div>
            </Card>
        </div>
    </>
}

export default Landing;