const { Schema, model } = require('mongoose');

const menuItemSchema = new Schema({
    price: {
        type: Number,
    },
    name: {
        type: String,
    },
    ingredients: {
        type: String,
    },
    calories: {
        type: Number,
    },
    caption: {
        type: String,
    },
});

const MenuItems = model(`MenuItems`, menuItemSchema);

module.exports = MenuItems;
