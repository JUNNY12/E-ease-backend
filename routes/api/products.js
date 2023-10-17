const express = require('express');
const router = express.Router();
const {
    addProduct,
    fecthProducts,
    editProduct,
    sortProduct,
    removeProduct,
    getProductBySlug,
    searchProduct,
    getCategory,
    getSingleProduct,
    getTopProducts
} = require('../../controllers/product/product.controller');
const { verifyRoles } = require('../../middleware/verify.roles');
const verifyJwt = require('../../middleware/verify.jwt')
const ROLES_LIST = require('../../config/roles.cofig');

router.route('/sort')
    .get(sortProduct);

router.route('/search')
    .post(searchProduct);

router.route('/category/:id')
.get(getCategory)

router.route('/topProducts')
    .get(getTopProducts)

router.route('/product/:id')
    .get(getSingleProduct)

router.route('/')
    .get(fecthProducts)
    .post(verifyJwt, verifyRoles(ROLES_LIST.SuperAdmin, ROLES_LIST.Admin), addProduct)
    .put(verifyJwt, verifyRoles(ROLES_LIST.SuperAdmin, ROLES_LIST.Admin), editProduct)

router.route('/:id')
    .post(verifyJwt, verifyRoles(ROLES_LIST.SuperAdmin, ROLES_LIST.Admin), removeProduct)

router.route('/:slug')
    .get(getProductBySlug)

module.exports = router;