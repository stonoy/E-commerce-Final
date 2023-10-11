import mongoose from "mongoose";
import Product from './product.js'

const SingleProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true, default: "sample image" },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    tax: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    orderItems: [SingleProductSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    address:{type: String},
    user: {
      type: mongoose.Types.ObjectId,

      ref: "User",
      required: true,
    },
    transactionId: { type: String, required:true },
    
  },
  { timestamps: true }
);

OrderSchema.pre('save', async function(){
  if(this.status === 'paid'){
    // console.log(this.status)
    for(let item of this.orderItems){
      const productId = item.product.toString()
      const product = await Product.findOne({_id:productId})
      const inventoryNow = product.inventory - item.amount
      await Product.findOneAndUpdate({_id:productId}, {inventory: inventoryNow})
    }
  }
})

export default mongoose.model("Order", OrderSchema);
