const { Schema, model } = require("mongoose");

const ALLOWED_EMOJIS = ["🤯", "❤", "🤔", "🤮", "😡"];

const ratingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  emoji: {
    type: String,
    required: true,
    enum: {
      values: ALLOWED_EMOJIS,
      message: "{VALUE} is not a supported emoji",
    },
  },
  ratingText: {
    type: String,
    refPath: 'onModel'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ratedId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  onModel: {
    type: String,
    required: true,
    enum: ["MenuItems", "Combos", "Restaurant"],
  },
  images: [
    {
      type: String,
    },
  ],
  status: { type: String, default: "pending" },
});

ratingSchema.virtual('menuItem', {
  ref: 'MenuItems',
  localField: '_id',
  foreignField: 'ratings'
});


ratingSchema.set("toObject", { virtuals: true });
ratingSchema.set("toJSON", { virtuals: true });

const Rating = model(`Rating`, ratingSchema);

module.exports = Rating;
