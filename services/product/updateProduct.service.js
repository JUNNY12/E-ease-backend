const Product = require('../../models/Product.model');

const updateProduct = async (productId, productData) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: productId },
            { $set: productData },
            { new: true }
        ).exec();

        if (!product) {
            return {
                error: 'Product not found'
            };
        }

        return {
            message: 'Product updated successfully',
            product
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'An error occurred while updating the product'
        };
    }
};

module.exports = { updateProduct };
