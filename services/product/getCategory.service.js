const Product = require('../../models/Product.model')

const getCategoryService = async  (category) => {
    try{
        const products = await Product.find({category:category})
        return products
    }
    catch(err){
        console.log(err)
        throw new Error (err.message)
    }
}

module.exports = {
    getCategoryService
}