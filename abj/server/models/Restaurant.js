const { Schema, model } = require('mongoose');
const ALLOWED_CATEGORIES = ["Italian", "Chinese", "Mexican", "American", "Indian", "Thai", "Japanese", "Mediterranean", "Soul", "BBQ"];

const restaurantsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    menuItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'MenuItems',
            required: true,
        },
    ],
    combos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Combos',
            required: false,
        },
    ],
    
    category: {
        type: String,
        required: true,
        enum: {
            values: ALLOWED_CATEGORIES,
            message: '{VALUE} is not a supported category',
        },
    },
    location: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: false,
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false, 
    },
}, { timestamps: true });

restaurantsSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'restaurant',
});
restaurantsSchema.set("toObject", { virtuals: true });
restaurantsSchema.set("toJSON", { virtuals: true });
const Restaurant = model('Restaurant', restaurantsSchema);

module.exports = Restaurant;