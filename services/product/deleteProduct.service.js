const Product = require('../../models/Product.model');
const deleteProduct = async (productId) => {
    try {
        const product = await Product.findOneAndDelete({ _id: productId }).exec();
    
        if (!product) {
            return {
                error: 'Product not found'
            };
        }

        return {
            message: 'Product deleted successfully'
        };

    } catch (error) {
        return {
            error: 'An error occurred while deleting the product'
        };
    }
};

module.exports = { deleteProduct };
