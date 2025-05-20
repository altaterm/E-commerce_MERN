import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Container from "@mui/system/Container";
import { useNavigate } from "react-router-dom";


const OrderSuccessPage = () => {
    const navigate=useNavigate();
    const handleHome= ()=>{
        navigate('/');
    }
    return (
    <Container fixed sx={{ 
        mt: 2 , 
        display: "flex" , 
        flexDirection: "column", 
        gap: 2,
        alignItems: "center", 
        justifyContent: "center"
        }}
        >
        <CheckCircleOutline sx={{color: "green", fontSize: "80px"}} />
        <Typography variant="h4">Thanks for your order.</Typography>
        <Button variant="contained" onClick={handleHome}>Go to Home</Button>
    </Container>
    )
};

export default OrderSuccessPage;