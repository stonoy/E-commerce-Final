import express from 'express'
const router = express.Router()

import {getAllCartItems, createCartItem, getSingleCartItem, updateCartItem, deleteCartItem,clearCart} from '../controllers/cart.js'


router.route('/').get(getAllCartItems).post(createCartItem)
router.route('/clearcart').delete(clearCart)
router.route('/:id').get(getSingleCartItem).patch(updateCartItem).delete(deleteCartItem)

export default router