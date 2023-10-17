const Product = require('../../models/Product.model');

const getProducts = async () => {
    try{
        const products = await Product.find().exec();
        return products;
    }
    catch(err){
        console.log(err);
    }
};


module.exports = {getProducts};