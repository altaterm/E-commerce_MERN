import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
}


export const seedInitialProducts =async ()=>{
    
    try{
        const products =[
        { title: "Dell Laptop", image: "https://benson.ph/cdn/shop/products/peripherals_laptop_latitude_3420nt_gallery_1.jpg?v=1627523235&width=3319", price:3000, stock:10},
        // { title: "laptop 2", image: "image2.jpg", price:20, stock:10},
        // { title: "mobile 3", image: "image3.jpg", price:10, stock:50},
        // { title: "headPhone 4", image: "image4.jpg", price:30, stock:30},
        // { title: "ear phone 5", image: "image5.jpg", price:40, stock:40},
        // { title: "Product 6", image: "image6.jpg", price:50, stock:20},
        // { title: "Product 7", image: "image7.jpg", price:160, stock:70},
        // { title: "Product 8", image: "image8.jpg", price:50, stock:50},
        // { title: "Product 9", image: "image9.jpg", price:20, stock:80},
        // { title: "Product 10", image: "image10.jpg", price:60, stock:10},
    ];

    const existingProducts =await getAllProducts();

    if(existingProducts.length===0){
        await productModel.insertMany(products)
    }
} catch (err){
    console.error("cannot see database ",err)
}
};