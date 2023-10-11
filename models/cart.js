import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    amount: {type: Number},
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

export default mongoose.model('Cart', CartSchema)