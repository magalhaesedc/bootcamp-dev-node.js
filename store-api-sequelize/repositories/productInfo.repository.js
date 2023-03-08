/**
 * Import para uso do drive nativo
 * import { getClient } from "./mongo.db.js";
 */

import ProductInfoSchema from "../schemas/productInfo.schema.js";
import { connect } from "./mongoose.db.js";

async function createProductInfo(productInfo){
    /**
     * MongoDB drive nativo
     * 
        const client = getClient();
        try {
            await client.connect();
            await client.db("store").collection("productInfo").insertOne(productInfo);
        } catch (error) {
            throw error;
        }finally{
            await client.close();
        }
     *
     */

    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        productInfo = new ProductInfo(productInfo);
        await productInfo.save();
    } catch (error) {
        throw error;
    }
    
}

async function updateProductInfo(productInfo){
    /**
     * MongoDB drive nativo
     * 
        const client = getClient();
        try {
            await client.connect();
            await client.db("store").collection("productInfo").updateOne(
                {productId: productInfo.productId},
                {$set: {...productInfo}}
            );
        } catch (error) {
            throw error;
        }finally{
            await client.close();
        }
     */
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        await ProductInfo.findOneAndUpdate({ productId: productInfo.productId }, productInfo);
    } catch (error) {
        throw error;
    }
}

async function getProductInfo(productId){
     /**
     * MongoDB drive nativo
     * 
        const client = getClient();
        try {
            await client.connect();
            return await client.db("store").collection("productInfo").findOne({productId});
        } catch (error) {
            throw error;
        }finally{
            await client.close();
        }
     */
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        const query = ProductInfo.findOne({productId});
        return await query.exec();
    } catch (error) {
        throw error;
    }
}

async function createReview(review, productId){
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.push(review);
        await updateProductInfo(productInfo);
    } catch (error) {
        throw error;
    }
}

async function deleteReview(productId, index){
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.splice(index, 1);
        await updateProductInfo(productInfo);
    } catch (error) {
        throw error;
    }
}

async function getProductsInfo(){
    /**
     * MongoDB drive nativo
     * 
        const client = getClient();
        try {
            await client.connect();
            return await client.db("store").collection("productInfo").find({}).toArray();
        } catch (error) {
            throw error;
        }finally{
            await client.close();
        }
     */
    
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        const query = ProductInfo.find({});
        return await query.exec();
    } catch (error) {
        throw error;
    }
}

async function deleteProductInfo(productId){
    /**
     * MongoDB drive nativo
     * 
        const client = getClient();
        try {
            await client.connect();
            await client.db("store").collection("productInfo").deleteOne({productId});
        } catch (error) {
            throw error;
        }finally{
            await client.close();
        }
     */
    
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        await ProductInfo.deleteOne({ productId });
    } catch (error) {
        throw error;
    }
}

export default { 
    createProductInfo,
    updateProductInfo,
    getProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}