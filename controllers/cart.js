import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart.js";
import checkPermission from "../utils/checkParmission.js";
import createCustomApiError from "../errors/customApiError.js";



const getAllCartItems = async (req,res,next) => {
    let cartItems = await Cart.find({user: req.user.userId}).populate('product')

    
    res.status(200).json({cartItems})
}

const createCartItem = async (req,res,next) => {
    let {product, amount} = req.body
    
    amount = Number(amount)
    if(!product){
        return next(createCustomApiError('Provide a valid product to add to cart', StatusCodes.BAD_REQUEST))
    }

    

    const cartItem = await Cart.findOne({user: req.user.userId, product})
    if(cartItem){
        const newAmount =  amount
        await Cart.findOneAndUpdate({user: req.user.userId, product}, {amount:newAmount })
        return next()
    }

    req.body.user = req.user.userId

    await Cart.create(req.body)
    res.status(StatusCodes.CREATED).json({msg: 'cartItem created'})
}

const clearCart = async(req,res,next) => {
    const cartItems = await Cart.find({user: req.user.userId})
    if(cartItems.length < 1){
        console.log('in')
        return next(createCustomApiError('No items in cart', StatusCodes.BAD_REQUEST))
    }

    await Cart.deleteMany({user: req.user.userId})
    res.send(200).json({msg: 'cart emply'})
}

const getSingleCartItem = async (req,res,next) => {
    const {id: cartId} = req.params

    const cartItem = await Cart.findOne({_id: cartId})
    if(!cartItem){
        return next(createCustomApiError(`No cartItem with id:${cartId}`, StatusCodes.BAD_REQUEST))
    }
    
    const hasPermission = checkPermission(req.user, cartItem.user)
    if(!hasPermission){
        return next(createCustomApiError('Not authorized', StatusCodes.UNAUTHORIZED))
    }

    res.status(200).json({cartItem})
}

const updateCartItem = async (req,res,next) => {
    const {id: cartId} = req.params

    const cartItem = await Cart.findOne({_id: cartId})
    if(!cartItem){
        return next(createCustomApiError(`No cartItem with id:${cartId}`, StatusCodes.BAD_REQUEST))
    }
    
    const hasPermission = checkPermission(req.user, cartItem.user)
    if(!hasPermission){
        return next(createCustomApiError('Not authorized', StatusCodes.UNAUTHORIZED))
    }

    const {amount} = req.body
   
    if(amount === 0){
        await Cart.findOneAndDelete({_id:cartId})
        res.status(200).json({msg: 'cartItem deleted!'})
    }else{
        await Cart.findOneAndUpdate({_id:cartId}, {amount}, {new:true, runValidators:true})

    res.status(200).json({msg: 'cartItem updated!'})
    }
    
}

const deleteCartItem = async (req,res,next) => {
    const {id: cartId} = req.params

    const cartItem = await Cart.findOne({_id: cartId})
    if(!cartItem){
        return next(createCustomApiError(`No cartItem with id:${cartId}`, StatusCodes.BAD_REQUEST))
    }
    
    const hasPermission = checkPermission(req.user, cartItem.user)
    if(!hasPermission){
        return next(createCustomApiError('Not authorized', StatusCodes.UNAUTHORIZED))
    }
    
    await Cart.findOneAndDelete({_id:cartId})

    res.status(200).json({msg: 'cartItem Deleted!'})
}

export {getAllCartItems, createCartItem, getSingleCartItem, updateCartItem, deleteCartItem,clearCart}