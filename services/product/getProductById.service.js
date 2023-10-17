const Product = require('../../models/Product.model');

const getProductById = async (id) => {
    try {
        const product = await Product.findOne({_id:id}).exec();

        if (!product) {
            return {
                message: 'Product not found'
            };
        }

        return {product};
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getProductById
};