import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import Box  from "@mui/material/Box";
import Grid from "@mui/material/Grid";



const HomePage = () => {
 const [products, setProducts]= useState<Product[]>([]);
 const [error, setError]= useState(false);
 useEffect(()=>{
  const fetchData =async ()=>{
    try{
       const response = await fetch(`${BASE_URL}/product`);
    const data =await response.json();
    setProducts(data)
    }catch{
      setError(true);
    }
  };

  fetchData();
 },[]);

 if(error){
  return <Box>Something Went Wrong , please try again </Box>
 }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map( ({_id, title , image , price}) => (
          <Grid >
            <ProductCard _id={_id} title={title} image={image} price={price} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
