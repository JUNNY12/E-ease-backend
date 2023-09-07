const express = require('express');
const router = express.Router();
const { addProduct, fecthProducts, editProduct, sortProduct, removeProduct } = require('../../controllers/product/product.controller');
const { verifyRoles } = require('../../middleware/verify.roles');
const verifyJwt = require('../../middleware/verify.jwt')
const ROLES_LIST = require('../../config/roles.cofig');

router.route('/')
    .get(fecthProducts)
    .post(verifyJwt, verifyRoles(ROLES_LIST.Admin), addProduct)
    .put(verifyJwt, verifyRoles(ROLES_LIST.Admin), editProduct)
    .delete(verifyJwt, verifyRoles(ROLES_LIST.Admin), removeProduct);

router.route('/sort')
    .get(sortProduct);



module.exports = router;