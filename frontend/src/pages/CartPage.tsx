import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";
import {  useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/system/Box";


const CartPage =()=>{
    const {token}=useAuth();
    const {cartItems, totalAmount}= useCart();
    const [, setError]= useState('');
 
    return( 
    <Container sx={{mt: 2}}>
        <Typography variant="h4">My cart </Typography>
        {cartItems.map((item)=>(
            <Box>{item.title}</Box>
        ))}
    </Container>
    );
};

export default CartPage;