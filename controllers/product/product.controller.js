const { createProduct } = require('../../services/product/createProduct.service');
const { getProducts } = require('../../services/product/getProducts.service');
const { getProduct } = require('../../services/product/getProduct')
const { deleteProduct } = require('../../services/product/deleteProduct.service')
const { updateProduct } = require('../../services/product/updateProduct.service')
const { sortOrder } = require('../../services/product/sortProduct.service');
const { handleDelete } = require('../../config/cloudinary');
const { searchProducts } = require('../../services/product/searchProduct.service')
const {getCategoryService} = require('../../services/product/getCategory.service')
const {getProductById} = require('../../services/product/getProductById.service')
const {getTopProduct} = require('../../services/product/getTopProduct.service')

const getSingleProduct = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        product,
        message
    } = await getProductById(id)

    if (!product) return res.status(204).json({
        message
    });

    res.status(200).json(product);

}

const getTopProducts = async (req, res) => {
    const {message, products} = await getTopProduct();

    if (message) return res.status(204).json({ message });

    res.status(200).json(products);
};

const fecthProducts = async (req, res) => {
    const products = await getProducts();

    if (!products) return res.status(204).json({ message: 'Products not found' });

    res.status(200).json(products);
};

const getProductBySlug = async (req, res) => {
    const { slug } = req.params;
    const { product, message } = await getProduct(slug)

    if (!product) return res.status(204).json({
        message
    });

    res.status(200).json(product);

}

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
        language,
        authorName,
        aboutAuthor
    } = req.body;

    const requiredFields = [
        'title',
        'description',
        'price',
        'image',
        'category',
        'quantity',
        'publisher',
        'yearOfRelease',
        'pageNumber',
        'authorName',
        'language',
        'aboutAuthor'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing fields: ${missingFields.join(', ')}`
        });
    }

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
        language,
        authorName,
        aboutAuthor
    });

    if (product.error) {
        return res.status(409).json({
            message: product.error
        });
    }

    res.status(201).json(product);
};

const editProduct = async (req, res) => {
    const productId = req.body.productId;
    const productData = req.body.productData;

    const { message, error, product } = await updateProduct(productId, productData);

    if (error) return res.status(400).json({ message: error });

    res.status(200).json({ message, product });
};

const removeProduct = async (req, res) => {
    const { id } = req.params;
    const { public_id } = req.body;

    if (public_id) await handleDelete(public_id)
    const { message, error } = await deleteProduct(id, public_id);

    if (error) return res.status(400).json({ message: error });

    res.status(200).json({ message });
};

const sortProduct = async (req, res) => {
    const { field, order } = req.query;

    if (!field || !order) return res.status(400).json({ message: 'Add missing url parameters' });

    const products = await sortOrder(field, order);

    if (!products) return res.status(204).json({ message: 'Products not found' });

    res.status(200).json(products);
};

const searchProduct = async (req, res) => {
    const {
        query
    } = req.body;
    
    try {
        const products = await searchProducts(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const getCategory = async (req, res) => {
    const {id} = req.params

    try{
        const products = await getCategoryService(id)

        if(!products){
            res.status(204).json({message:"No product matches this category"})
        }

        res.status(200).json(products)
    }

    catch(err){
        res.status(500).json({
            message:err.message
        })
    }

}

module.exports = { 
    addProduct, 
    fecthProducts,
    sortProduct, 
    removeProduct,
    editProduct, 
    getProductBySlug, 
    searchProduct,
    getCategory,
    getSingleProduct,
    getTopProducts
};

