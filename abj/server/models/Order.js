const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [{
        itemReference: { type: Schema.Types.ObjectId, ref: 'MenuItems' },
        quantity: { type: Number, default: 1 },
        priceAtPurchase: { type: Number, required: true } 
    }],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    }
}, { timestamps: true });
const Order = model('Order', orderSchema);
module.exports = Order;