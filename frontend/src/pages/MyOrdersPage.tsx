import { Button, Typography } from "@mui/material";
import Container from "@mui/system/Container";
import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Box } from "@mui/system";


const MyOrdersPage = () => {
    const {getMyOrders, myOrders} = useAuth();

    useEffect(() => {
            getMyOrders();
    },[]);


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
            <Typography>My Orders</Typography>
            {myOrders.map((order:any)=>(
            <Box sx={{border: 1, borderColor:"Gray", borderRadius: 2 , padding : 1 }}>
             <Typography>Address: {order.address}</Typography>
             <Typography>Items: {order.orderItems.length}</Typography>
             <Typography>Total: {order.total}</Typography>

  </Box>
        ))}
    </Container>
    )
};

export default MyOrdersPage;