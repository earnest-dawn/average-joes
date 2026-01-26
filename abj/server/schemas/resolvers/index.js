const { MenuItems, User, Combos, Rating, Restaurant } = require("../../models");
const Cart = require("../../models/Cart");
const { create } = require("../../models/MenuItems");
const { signToken } = require("../../utils/auth");
const bcrypt = require("bcrypt");

const { GraphQLError } = require("graphql");

class AuthenticationError extends GraphQLError {
  constructor(message = "Not authenticated") {
    super(message, {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 }, // Optional: add HTTP status code
      },
    });
    this.name = "AuthenticationError";
  }
}

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ id: context.user.id });
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    menuItems: async () => {
  const items = await MenuItems.find();
  return items.map(item => {
    return {
      id: item._id.toString(), // Explicit
      name: item.name || "Unnamed Item", 
      ingredients: item.ingredients || "",
      calories: item.calories || 0,
      price: item.price || 0,
      caption: item.caption || "",
      category: item.category || "entree",
      inStock: item.inStock ?? true, // Use ?? to handle boolean false
    };
  });
},


    combos: async () => {
      return Combos.find({}).populate("menuItems");
    },
    users: async () => {
      return User.find({});
    },
    ratings: async () => {
      return Rating.find({}).populate("user").populate("ratedId");
    },
    restaurants: async () => {
      return Restaurant.find({}).populate("menuItems").populate("combos");
    },
  },
  Mutation: {
    toggleStockStatus: async (parent, { input }, context) => {
      if (context.user) {
        const menuItem = await MenuItems.findById(input.id);
        if (!menuItem) {
          throw new Error("Menu item not found");
        }
        menuItem.inStock = !menuItem.inStock;
        await menuItem.save();
        return {
          code: 200,
          success: true,
          message: "Stock status updated!",
          menuItem: menuItem, // This allows Relay to see the change
        };
      }
      throw new AuthenticationError(
        "You need to be logged in to toggle stock status!",
      );
    },
    register: async (parent, args) => {
      console.log("Received input:", args.input);
      const { username, password, email } = args.input;
      const user = await User.create({ username, password, email });
      const token = signToken(user);
      console.log(user);
      return { token, user };
    },
    createCombos: async (parent, { title, menuItems, price }, context) => {
      if (context.user) {
        let newCombo = await Combos.create({ title, menuItems, price });
        newCombo = await newCombo.populate("menuItems");
        return newCombo;
      }
      throw new AuthenticationError(
        "You need to be logged in to create combos!",
      );
    },
    deleteCombos: async (parent, { title }, context) => {
      if (context.user) {
        const deletedCombos = await Combos.findOneAndDelete(
          { title },
          {
            new: true,
          },
        );
        return deletedCombos;
      }
      throw new AuthenticationError(
        "You need to be logged in to delete combos!",
      );
    },
    editCombos: async (parent, args, context) => {
      if (context.user) {
        const updatedCombos = await Combos.findByIdAndUpdate(
          args.CombosId,
          {
            $push: {
              menuItems: args.menuItemsId,
            },
          },
          { new: true },
        );
        return updatedCombos;
      }
      throw new AuthenticationError(
        "You need to be logged in to add to combos!",
      );
    },
    login: async (parent, { input }) => {
      const { username, password } = input;
      console.log("Attempting login for username:", username);
      const user = await User.findOne({ username });

      if (!user) {
        console.log("User not found for username:", username);
        throw new AuthenticationError("Incorrect credentials");
      }
      console.log("User found:", user.username);

      console.log("Comparing password for user:", user.username);
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log("Password comparison failed for user:", user.username);
        throw new AuthenticationError("Incorrect credentials");
      }
      console.log("Password comparison successful!");

      const token = signToken(user);

      return { token, user: { username: user.username, id: user.id } };
    },
    createMenuItems: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to create menu items!",
        );
      }

      try {
        let newMenuItem = await MenuItems.create({
          ...input,
        });

        return {
          menuItem: {
            ...newMenuItem._doc,
            id: newMenuItem._id.toString(),
          },
          code: "201",
          success: true,
          message: "Menu item created successfully!",
        };
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create menu item");
      }
    },
    deleteMenuItems: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to delete items!");
      }

      // Extract the name from the input object
      const { name } = input;
      const deletedItem = await MenuItems.findOneAndDelete({ name });

      if (!deletedItem) {
        return {
          code: "404",
          success: false,
          message: "Item not found",
        };
      }

      return {
        code: "200",
        success: true,
        message: "Successfully deleted",
        menuItem: deletedItem,
      };
    },
    editMenuItems: async (parent, args, context) => {
      if (context.user) {
        const updatedMenuItems = await MenuItems.findByIdAndUpdate(
          args.MenuItemsId,
          {
            $push: {
              menuItems: args.menuItemsId,
            },
          },
          { new: true },
        );
        return updatedMenuItems;
      }
      throw new AuthenticationError(
        "You need to be logged in to add to combos!",
      );
    },
    createRating: async (parent, { input }, context) => {
      if (context.user) {
        let finalRatedId = input.ratedId;

        // 2. HELPER: If the user passed a Name (like "Storm Claw") instead of an ID,
        // we should try to find the ID first, otherwise Mongoose validation fails.
        if (input.onModel === "MenuItems" && input.ratedId.length !== 24) {
          const foundItem = await MenuItems.findOne({ name: input.ratedId });
          if (foundItem) finalRatedId = foundItem.id;
        } else if (
          input.onModel === "Restaurant" &&
          input.ratedId.length !== 24
        ) {
          const foundRest = await Restaurant.findOne({ name: input.ratedId });
          if (foundRest) finalRatedId = foundRest.id;
        }

        // 3. Create the rating with EXPLICIT keys
        // Using explicit keys (emoji: input.emoji) is safer than spreading (...input)
        const newRating = await Rating.create({
          user: context.user._id || context.user.id,
          ratedId: finalRatedId,
          onModel: input.onModel,
          emoji: input.emoji,
          ratingText: input.ratingText,
          images: input.images || [],
        });

        // 4. Return and populate user
        const savedRating = await newRating.populate("user");
        return {
          code: 200,
          success: true,
          message: "Rating created!",
          rating: savedRating,
        };
      }
      throw new AuthenticationError(
        "You need to be logged in to create a rating!",
      );
    },
    deleteRating: async (parent, { id }, context) => {
      if (context.user) {
        const ratingToDelete = await Rating.findById(id);
        if (!ratingToDelete) {
          return {
            code: "404",
            success: false,
            message: "Rating not found.",
            rating: null,
          };
        }
        if (ratingToDelete.user.toString() !== context.user.id) {
          return {
            code: "403",
            success: false,
            message: "You are not authorized to delete this rating.",
            rating: null,
          };
        }
        await Rating.findByIdAndDelete(id);
        return {
          code: "200",
          success: true,
          message: "Rating deleted successfully.",
          rating: ratingToDelete,
        };
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a rating!",
      );
    },
    createRestaurant: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to create restaurant!",
        );
      }

      try {
        let newRestaurant = await Restaurant.create({
          ...input,
        });

        return {
          restaurant: newRestaurant,
          input: input,
        };
      } catch (err) {
        console.error(err);
        throw new Error("Failed to create restaurant");
      }
    },
    deleteRestaurant: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to delete Restaurants!",
        );
      }

      // Extract the name from the input object
      const { name } = input;
      const deletedItem = await Restaurant.findOneAndDelete({ name });

      if (!deletedItem) {
        return {
          code: "404",
          success: false,
          message: "restaurant not found",
        };
      }

      return {
        code: "200",
        success: true,
        message: "Successfully deleted",
        restaurant: deletedItem,
      };
    },
    addRestaurant: async (parent, args, context) => {
      if (context.user) {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
          args.RestaurantId,
          {
            $push: {
              restaurant: args.restaurantId,
            },
          },
          { new: true },
        );
        return updatedRestaurant;
      }
      throw new AuthenticationError(
        "You need to be logged in to add a restaurant!",
      );
    },
    addToCart: async (_, { input }, context) => {
      const { itemId, itemType } = input;
      if (!context.user) {
        throw new Error("You must be logged in!");
      }

      const user = await User.findById(context.user._id);
      
      const existingItemIndex = user.cart.items.findIndex(item => {
        const idToCompare = itemType === 'MenuItem' ? item.menuItem : item.combo;
        return idToCompare?.toString() === itemId;
      });

      if (existingItemIndex > -1) {
        // SCENARIO A: Item exists, increment quantity
        user.cart.items[existingItemIndex].quantity += 1;
      } else {
        // SCENARIO B: Item is new, push to array
        const newItem = {
          quantity: 1,
          [itemType === 'MenuItem' ? 'menuItem' : 'combo']: itemId
        };
        user.cart.items.push(newItem);
      }

      await user.populate('cart.items.menuItem cart.items.combo');
      
      user.cart.totalPrice = user.cart.items.reduce((total, item) => {
        const price = itemType === 'MenuItem' ? item.menuItem.price : item.combo.price;
        return total + (price * item.quantity);
      }, 0);

      await user.save();
      return user;
    },
  removeFromCart: {
    cart: async (parent, {input}, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to delete items!");
      }
            const { name } = input;

        const deletedItem = await Cart.findOneAndDelete({ name });

      if (!deletedItem) {
        return {
          code: "404",
          success: false,
          message: "Item not found",
        };
      }
      return {
        code: "200",
        success: true,
        message: "Successfully deleted",
        menuItem: deletedItem,
      };
  }
}
  },
  Rating: {
    ratedId: async (parent) => {
      if (!parent.onModel || !parent.ratedId) return null;

      // Dynamically select the model based on the 'onModel' string stored in DB
      const models = {
        MenuItems: MenuItems,
        Combos: Combos,
      };

      const SelectedModel = models[parent.onModel];

      if (!SelectedModel) return null;

      return await SelectedModel.findById(parent.ratedId);
    },
  },
 
  RatedObject: {
    __resolveType(obj) {
      // Check for specific fields to identify the type
      if (obj.price) return "MenuItems";
      if (obj.location || obj.cuisine) return "Restaurant";
      if (obj.items) return "Combo";
      return null;
    },
  },
};

module.exports = resolvers;
