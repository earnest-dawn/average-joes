const { Schema, model } = require("mongoose");

const ALLOWED_CATEGORIES = ["entree", "side", "drink", "dessert", "appetizer"];

const menuItemSchema = new Schema({
  inStock: {
    type: Boolean,
    default: true,  
  }, 
  category: {
    type: String,
    required: true,
    enum: {
      values: ALLOWED_CATEGORIES,
      message: "{VALUE} is not a supported category",
    },
  },
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
  image: {
    type: String,
  },  
  status: { type: String, default: "pending" },
});

menuItemSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'menuItem'
});
menuItemSchema.set("toObject", { virtuals: true });
menuItemSchema.set("toJSON", { virtuals: true });

const MenuItems = model(`MenuItems`, menuItemSchema);

module.exports = MenuItems;
