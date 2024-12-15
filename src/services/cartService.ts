import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface createCartForUser{
    userId : string;
}
const createCartForUser = async ({userId}: createCartForUser)=>{
    const cart=await cartModel.create({userId, totalAmount:0})
    await cart.save();
    return cart;
}

interface GetActiveCarForUser{
    userId: string;
}    


export const getActiveCartForUser =async ({
        userId,
    }: GetActiveCarForUser)=>{
    let cart =await cartModel.findOne({userId, status:"active"})

    if (!cart){
        cart=await createCartForUser({userId});
    }

    return cart;
};

interface AddItemToCart{
    productId: any ;
    quantity : number; 
    userId: string;
}

export const addItemToCart =async ({
    productId , 
    quantity , 
    userId,
}: AddItemToCart)=>{
    const cart = await getActiveCartForUser({userId});


    //does the item exist in the cart ?
    const existInCart=(await cart).items.find((p) => p.product.toString() === productId);

    if (existInCart){
        return {data: "Item already exists in cart !", statusCode:400 };
        
    }

    //Fetch the product 
    const product =await productModel.findById(productId);
    if (!product){
        return {data: "Item already exists in cart !", statusCode:400 };
    }
    if(product.stock< quantity ){
        return {data: "Low Stock for item" , statusCode: 400}
    }
    cart.items.push({
        product: productId, 
        unitPrice: product.price, 
        quantity,
    });
    //Update the total amount for the cart 
    cart.totalAmount +=product.price*quantity ;

    const updatedCart =await cart.save();

    return{ data: updatedCart, statusCode:200 };
};