const Product = require('../../models/Product.model');

const searchProducts = async (query) => {
    try {
        const products = await Product.find({
            $or: [{
                title: {
                    $regex: query,
                    $options: 'i'
                }
            },
            {
                category: {
                    $regex: query,
                    $options: 'i'
                }
            },
            ],
        });

        return products;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    searchProducts
};
