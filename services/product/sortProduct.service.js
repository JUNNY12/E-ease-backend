const Product = require('../../models/Product.model');

const sortOrder = async (field, order) => {
    try {
        const sortQuery = {};
        sortQuery[field] = order;

        if (order === "asc") {
            sortQuery[field] = 1;
        }
        else {
            sortQuery[field] = 1;
        }
        const products = await Product.find().sort(sortQuery);

        return products;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { sortOrder };

