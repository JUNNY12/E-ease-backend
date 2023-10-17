const Product = require('../../models/Product.model');

const getProduct = async (slug) => {
    try {
        const product = await Product.findOne({
            slug
        }).exec();

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
    getProduct
};