import { cartModel } from "../models/cartModel";

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