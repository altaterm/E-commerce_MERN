import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import type { CartItem } from "../../types/CartItem";
import { CartContext } from "./CartContext";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const {token}=useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [, setError]= useState('');

     useEffect(()=>{
        if(!token){
            return;
        }

        const fetchCart =async ()=>{
            const response =await fetch(`${BASE_URL}/cart`, {
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });

            if (!response.ok){
                setError("failed to fetch user cart, please try again ", );
            }
            const cart =await response.json();
            const cartItemsMapped = cart.items.map(
              ({product, quantity, unitPrice}: {product: any ; quantity : number; unitPrice: number })=>({
                productId: product._id, 
                title: product.title, 
                image : product.image, 
                quantity, 
                unitPrice,
              })
            );

            setCartItems(cartItemsMapped);
            setTotalAmount(cart.totalAmount);
        };
        fetchCart();
    }, [token]);


  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });
      if(!response.ok){
        setError('failes to add to cart ');
      }

      const cart =await response.json();
      if(! cart){
        setError('failed to parse cart data');
      }

      const cartItemsMapped = cart.items.map(
        ({product, quantity, unitPrice}: {product: any ; quantity : number; unitPrice: number}) => ({
        productId: product._id, 
        title: product.title, 
        image : product.image, 
        unitPrice,
        quantity, 
        
    })
  );


      setCartItems([...cartItemsMapped] );
      setTotalAmount(cart.totalAmount);
    } catch (error) {
    console.error(productId);
}
  };


   const updateItemInCart = async (productId:string, quantity: number)=>{

    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
      if(!response.ok){
        setError('failes to update  cart ');
      }

      const cart =await response.json();
      if(! cart){
        setError('failed to parse cart data');
      }

      const cartItemsMapped = cart.items.map(
        ({product, quantity, unitPrice}: {product: any ; quantity : number; unitPrice: number}) => ({
        productId: product._id, 
        title: product.title, 
        image : product.image, 
        unitPrice,
        quantity, 
        
    })
  );


      setCartItems([...cartItemsMapped] );
      setTotalAmount(cart.totalAmount);
    } catch (error) {
    console.error(productId);
}


  };


  const removeItemInCart = async(productId:string)=>{
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
      });
      if(!response.ok){
        setError('failes to delete  cart ');
      }

      const cart =await response.json();
      if(! cart){
        setError('failed to parse cart data');
      }

      const cartItemsMapped = cart.items.map(
        ({product, quantity, unitPrice}: {product: any ; quantity : number; unitPrice: number}) => ({
        productId: product._id, 
        title: product.title, 
        image : product.image, 
        unitPrice,
        quantity, 
        
    })
  );


      setCartItems([...cartItemsMapped] );
      setTotalAmount(cart.totalAmount);
    } catch (error) {
    console.error(productId);
}

};

const clearCart = async()=>{
      try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
      });
      if(!response.ok){
        setError('failes to delete  cart ');
      }

      const cart =await response.json();
      if(! cart){
        setError('failed to parse cart data');
      }


      setCartItems([] );
      setTotalAmount(0);
    } catch (error) {
    console.error(error);
}

};


  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart, updateItemInCart, removeItemInCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
