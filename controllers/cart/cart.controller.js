const {getCart} = require('../../services/cart/getCart.service');
const {addToCart} = require('../../services/cart/createCartItem.service');
const {removeFromCart} = require('../../services/cart/deleteCartItem.service');
const {updateCart} = require('../../services/cart/updateCart.service');
const {deleteSingleItem} = require('../../services/cart/deleteSingleItem.service');

const fetchCart = async (req, res) => {
    const {userId} = req.params
    const {cart} = await getCart(userId);

    if(!cart) return res.status(204).json({message: 'Cart not found', cart:{}});

    res.status(200).json({message: 'Cart fetched', cart});
};

const addProductToCart = async (req, res) => {
    const userId = req.params.userId;
    const {productId, quantity} = req.body;

    const {cart, error} = await addToCart(userId, productId, quantity);

    if(error) return res.status(400).json({message: error});

    res.status(200).json({message: 'Product added to cart', cart});
};

const deleteItemFromCart = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.body.itemId;

    const {cart, error} = await removeFromCart(userId, itemId);

    if(error) return res.status(400).json({message: error});

    res.status(200).json({message: 'Product deleted from cart', cart});
};

const updateUserCart = async (req, res) => {
    const userId = req.params.userId;
    const reqId = req.id

    console.log(userId, reqId)

    if(userId !== reqId) return res.status(401).json({message: 'you are not authorized to update this cart'});

    const {cart, error} = await updateCart(userId, req.body);

    if(error) return res.status(400).json({message: error});

    res.status(200).json({message: 'Cart updated', cart});

};

const deleteSingleItemFromCart = async (req, res) => { 
    const userId = req.params.userId;
    const itemId = req.body.itemId;

    const {cart, error} = await deleteSingleItem(userId, itemId);

    if(error) return res.status(400).json({message: error});

    res.status(200).json({message: 'Product deleted from cart', cart});
}

module.exports = {fetchCart, addProductToCart, deleteItemFromCart, updateUserCart , deleteSingleItemFromCart};