const Product = require("../../models/Product.model")

const getTopProduct = async() => {
    const products = await Product.find().sort({avarageRating: -1}).limit(10)

    return {products}
}

module.exports = {
    getTopProduct
}