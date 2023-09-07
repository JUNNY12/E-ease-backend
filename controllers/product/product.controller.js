const { createProduct } = require('../../services/product/createProduct.service');
const { getProducts } = require('../../services/product/getProducts.service');
const {deleteProduct} = require('../../services/product/deleteProduct.service')
const {updateProduct} = require('../../services/product/updateProduct.service')
const {sortOrder} = require('../../services/product/sortProduct.service');


const fecthProducts = async (req, res) => {
    const products = await getProducts();

    if (!products) return res.status(204).json({ message: 'Products not found' });

    res.status(200).json(products);
};

const addProduct = async (req, res) => {
    const {
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
        authorName,
        aboutAuthor
    } = req.body;

    if (!title
        || !description
        || !price
        || !image
        || !category
        || !quantity
        || !publisher
        || !yearOfRelease
        || !pageNumber
        || !authorName
        ||!aboutAuthor) return res.status(400).json({ message: 'All fields are required! Add missing fields' });

    const product = await createProduct({
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
        authorName,
        aboutAuthor
    });

    if (product.error) return res.status(409).json({ message: product.error });

    res.status(201).json( product);
};

const editProduct = async (req, res) => {
    const productId = req.body.productId;
    const productData = req.body.productData;

    const { message, error, product } = await updateProduct(productId, productData);

    if (error) return res.status(400).json({ message: error });

    res.status(200).json({ message, product });
};

const removeProduct = async (req, res) => {
    const productId = req.body.productId;

    const { message, error } = await deleteProduct(productId);

    if (error) return res.status(400).json({ message: error });

    res.status(200).json({ message });
};

const sortProduct = async (req, res) => {
    const { field, order } = req.query;

    if(!field || !order) return res.status(400).json({ message: 'Add missing url parameters' });
    
    const products = await sortOrder(field, order);

    if (!products) return res.status(204).json({ message: 'Products not found' });

    res.status(200).json(products);
};



module.exports = { addProduct, fecthProducts, sortProduct, removeProduct, editProduct };