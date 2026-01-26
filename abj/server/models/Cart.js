const { Schema, model } = require('mongoose');
const ALLOWED_CATEGORIES = ["Italian", "Chinese", "Mexican", "American", "Indian", "Thai", "Japanese", "Mediterranean", "Soul", "BBQ"];

const cartSchema = new Schema({
    items: [
        {
            menuItem: {
                type: Schema.Types.ObjectId,
                ref: 'MenuItems'
            },
            combo: {
                type: Schema.Types.ObjectId,
                ref: 'Combos'
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
    
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;