const Product = require('../../models/Product.model');
const slugify = require('slugify');

const createProduct = async ({
    title,
    description,
    price,
    image,
    category,
    quantity,
    publisher,
    yearOfRelease,
    pageNumber,
    authorName,
    aboutAuthor
}) => {
    try {
        const slug = slugify(title, { lower: true });

        const product = await Product.create({
            slug,
            title,
            description,
            price,
            image,
            category,
            quantity,
            publisher,
            yearOfRelease,
            pageNumber,
            author: {
                authorName,
                aboutAuthor
            }
        });

        return product;
    } catch (error) {
        // Check if the error is a MongoDB duplicate key error (error code 11000)
        if (error.code === 11000) {
            // Handle the duplicate title error
            return {
                error: 'Product with the same title already exists'
            };
        }
    }
};

module.exports = { createProduct };
