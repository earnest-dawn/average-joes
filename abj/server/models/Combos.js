const { Schema, model } = require('mongoose');

const combosSchema = new Schema({
    title: {
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
    price: {
        type: Number,
        required: true,
    },
});

combosSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'menuItem'
});
combosSchema.set("toObject", { virtuals: true });
combosSchema.set("toJSON", { virtuals: true });
const Combos = model('Combos', combosSchema);

module.exports = Combos;
