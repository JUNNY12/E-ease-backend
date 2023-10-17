const Product = require('../../models/Product.model');
const slugify = require('slugify');
const updateProduct = async (productId, productData) => {
    try {
        // Generate a new slug from the title in productData
        const newSlug = slugify(productData.title, {
            lower: true
        });

        const product = await Product.findOneAndUpdate({
                _id: productId
            }, {
                $set: {
                    ...productData,
                    slug: newSlug
                }
            }, // Update the slug field
            {
                new: true
            }
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

module.exports = {
    updateProduct
};
