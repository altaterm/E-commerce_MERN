import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";
import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const CartPage =()=>{
    const {cartItems, totalAmount}= useCart(); 
    return( 
    <Container fixed sx={{mt: 2}}>
        <Typography variant="h4">My cart </Typography>
        <Box  display="flex" flexDirection="column" gap={4}>
        {cartItems.map((item)=>(
            <Box 
            display="flex" 
            flexDirection="row" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{
                border: 1, 
                borderColor: '#f2f2f2',
                borderRadius: 5, 
                padding: 1 }} >
                
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                    <img src={item.image} width={50}/>
                <Box>
                <Typography variant="h6">{item.title}</Typography> 
                <Typography>
                    {item.quantity} * ${item.unitPrice}
                </Typography> 
              <Button>Remove item</Button>

               </Box> 
               </Box>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button>-</Button>
                        <Button>+</Button>
                    </ButtonGroup>
            </Box>
        ))}
        <Box>
            <Typography variant="h4">Total Amount : {totalAmount}</Typography>
        </Box>
    </Box>
    </Container>
    );
};

export default CartPage;