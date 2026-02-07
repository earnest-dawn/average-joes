const { MenuItems, User, Combos, Rating, Restaurant, Order, Cart } = require("../../models");
const { signToken } = require("../../utils/auth");
const bcrypt = require("bcrypt");

const { GraphQLError } = require("graphql");

class AuthenticationError extends GraphQLError {
  constructor(message = "Not authenticated") {
    super(message, {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
    this.name = "AuthenticationError";
  }
}

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user.id });
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    menuItems: async () => {
  const items = await MenuItems.find();
  return items.map(item => {
    return {
      id: item._id.toString(), 
      name: item.name || "Unnamed Item", 
      ingredients: item.ingredients || "",
      calories: item.calories || 0,
      price: item.price || 0,
      caption: item.caption || "",
      category: item.category || "entree",
      inStock: item.inStock ?? true, 
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
      return Restaurant.find({}).populate("menuItems").populate("combos").populate("owner");
    },
     myOrders: async (_, __, context) => {
  if (!context.user) throw new AuthenticationError();
  return await Order.find({ customer: context.user._id })
    .populate('restaurant')
.populate({
       path: 'items.itemReference',
       model: 'MenuItems' 
    })    .sort({ createdAt: -1 });
},

   orders: async () => {
  return await Order.find({})
    .populate('customer restaurant')
    .populate('items.itemReference');
}
  
    
  },
  Mutation: {
    toggleStockStatus: async (parent, { input }, context) => {
  if (!context.user) {
    throw new Error("You need to be logged in!");
  }

  try {
    const { id, inStock } = input; 

    const menuItem = await MenuItems.findByIdAndUpdate(
      id,
      { inStock: inStock },
      { new: true }
    );

    if (!menuItem) {
      return { code: "404", success: false, message: "Menu item not found" };
    }

    return {
      code: "200",
      success: true,
      message: "Stock status updated!",
      menuItem: menuItem,
    };
  } catch (err) {
    console.error(err);
    return { code: "500", success: false, message: "Internal Server Error" };
  }
},
    register: async (parent, args) => {
      console.log("Received input:", args.input);
      const { username, password, email } = args.input;
      const user = await User.create({ username, password, email });
      const token = signToken(user);
      console.log(user);
      return { token, user };
    },
    claimRestaurantOwnership: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError();

      const restaurant = await Restaurant.findById(id);
      if (!restaurant) return { success: false, message: "Restaurant not found" };
      if (restaurant.owner) return { success: false, message: "Restaurant already claimed" };

      restaurant.owner = context.user._id;
      await restaurant.save();

      return {
        success: true,
        message: "Ownership successfully claimed",
        restaurant: await restaurant.populate('owner')
      };
    },

    editRestaurant: async (_, { id, input }, context) => {
      if (!context.user) throw new AuthenticationError();
      const restaurant = await Restaurant.findById(id);

      if (!restaurant) return { success: false, message: "Restaurant not found" };
      if (restaurant.owner.toString() !== context.user._id) {
        return { success: false, message: "Not authorized" };
      }

      Object.assign(restaurant, input);
      await restaurant.save();

      return {
        success: true,
        message: "Restaurant updated",
        restaurant
      };
    },

    
   removeFromCart: async (_, { input }, context) => {
  if (!context.user) throw new AuthenticationError();

  const user = await User.findById(context.user._id);
  user.cart.items = user.cart.items.filter(
    item => !input.id.includes(item.menuItem?.toString()) && !input.id.includes(item.combo?.toString())
  );

  await user.save();
  const populatedUser = await user.populate('cart.items.menuItem cart.items.combo');
  
  return {
    code: "200",
    success: true,
    message: "Items removed from cart",
    
  };
},
    

    updateOrderStatus: async (_, { orderId, status }, context) => {
      if (!context.user) throw new AuthenticationError();
      
      const order = await Order.findById(orderId).populate('restaurant');
      if (!order) throw new Error('Order not found');
      
      if (order.restaurant.owner.toString() !== context.user._id) {
        throw new Error('Not authorized to update this order');
      }

      order.status = status;
      await order.save();
      return order;
    },
    createCombos: async (parent, { input }, context) => {
  if (!context.user) throw new AuthenticationError();

  const newCombo = await Combos.create({ ...input });
  const populatedCombo = await newCombo.populate("menuItems");

  return {
    code: "201",
    success: true,
    message: "Combo created!",
    combos: populatedCombo
  };
},
    deleteCombos: async (parent, { title }, context) => {
      if (context.user) {
        const deletedCombos = await Combos.findOneAndDelete(
          { title },
          {
            new: true,
          },
        );
        return {
    code: deletedCombos ? "200" : "404",
    success: !!deletedCombos,
    message: deletedCombos ? "Combo deleted" : "Combo not found",
    combos: deletedCombos
  };
      }
      throw new AuthenticationError(
        "You need to be logged in to delete combos!",
      );
    },
    editCombos: async (parent, { input }, context) => {
  if (!context.user) throw new AuthenticationError();
  
  const updatedCombos = await Combos.findByIdAndUpdate(
    input.id,
    { $set: input }, // Use $set to update name, price, or the entire menuItems array
    { new: true }
  ).populate("menuItems");

  return {
    code: "200",
    success: true,
    message: "Combo updated successfully",
    combos: updatedCombos
  };
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

      return {code: "200",
    success: true,
    message: "Login successful", token, user: { username: user.username, id: user.id } };
    },
    createMenuItems: async (parent, { input }, context) => {
      const { restaurantId, ...itemData } = input;
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to create menu items!",
        );
      }

      try {
        let newMenuItem = await MenuItems.create({
          ...itemData,
        });
await Restaurant.findByIdAndUpdate(
    restaurantId,
    { $push: { menuItems: newMenuItem._id } },
    { new: true }
  );
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
console.error("MONGOOSE ERROR:", err);
       throw new Error(`Database Error: ${err.message}`);
      }
    },
    deleteMenuItems: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to delete items!");
      }

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
    editMenuItems: async (parent, { input }, context) => {
  if (!context.user) throw new AuthenticationError();

  const updatedItem = await MenuItems.findByIdAndUpdate(
    input.id,
    { $set: input }, // Use $set to update fields from input
    { new: true }
  );

  return {
    code: "200",
    success: true,
    message: "Menu item updated successfully",
    menuItem: updatedItem
  };
},
    createRating: async (parent, { input }, context) => {
      if (context.user) {
        let finalRatedId = input.ratedId;

        // try to find the ID first 
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
if (input.onModel === "Combos" && input.ratedId.length !== 24) {
    const foundCombo = await Combos.findOne({ title: input.ratedId });
    if (foundCombo) finalRatedId = foundCombo.id;
}
        
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
      code: "201",
      success: true,
      message: "Restaurant created!",
      restaurant: newRestaurant 
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
    addRestaurant: async (parent, {input}, context) => {
      if (context.user) {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
          input.id,
          {
            $push: {
              restaurant: input.restaurantId,
            },
          },
          { new: true },
        );
return {
    code: "200",
    success: true,
    message: "Restaurant updated",
    restaurant: updatedRestaurant
  }      }
      throw new AuthenticationError(
        "You need to be logged in to add a restaurant!",
      );
    },
    
  
createOrder: async (_, { input }, context) => {
  if (!context.user) throw new AuthenticationError();

  const { restaurantId, items } = input;

  try {
    let total = 0;
    
    // 1. Validate items and calculate total price server-side
    const itemsToSave = await Promise.all(items.map(async (item) => {
      const dbItem = await MenuItems.findById(item.menuItemId);
      if (!dbItem) throw new Error(`Item ${item.menuItemId} not found`);
      if (!dbItem.inStock) throw new Error(`${dbItem.name} is out of stock`);

      total += dbItem.price * item.quantity;

      return {
        itemReference: dbItem._id,
        quantity: item.quantity,
        priceAtPurchase: dbItem.price 
      };
    }));

    const order = await Order.create({
      customer: context.user._id,
      restaurant: restaurantId,
      items: itemsToSave,
      totalPrice: total,
      status: 'PENDING'
    });

    await User.findByIdAndUpdate(context.user._id, {
      $set: { "cart.items": [], "cart.totalPrice": 0 }
    });

    const populatedOrder = await order.populate(['customer', 'restaurant', 'items.itemReference']);

    return {
      code: "201",
      success: true,
      message: "Order placed successfully!",
      order: populatedOrder
    };
  } catch (err) {
    return {
      code: "400",
      success: false,
      message: err.message,
      order: null
    };
  }
},
deleteOrder: async (parent, { input }, context) => {
  if (!context.user) throw new AuthenticationError();

  const { orderId } = input;
  
  const order = await Order.findById(orderId).populate('customer');

  if (!order) {
    return { code: "404", success: false, message: "Order not found" };
  }

  if (order.customer._id.toString() !== context.user._id.toString()) {
    return { code: "403", success: false, message: "Not authorized" };
  }

  await Order.findByIdAndDelete(orderId);

  return {
    code: "200",
    success: true,
    message: "Order deleted successfully",
    order: order 
  };
},
        addToCart: async (_, { input }, context) => {
  const { itemId, itemType } = input;
  if (!context.user) throw new AuthenticationError();

  const user = await User.findById(context.user._id).populate('cart.items.menuItem cart.items.combo');
  
  const existingItem = user.cart.items.find(item => {
    const idToCompare = itemType === 'MenuItem' ? item.menuItem?._id : item.combo?._id;
    return idToCompare?.toString() === itemId;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user.cart.items.push({
      quantity: 1,
      [itemType === 'MenuItem' ? 'menuItem' : 'combo']: itemId
    });
    await user.populate('cart.items.menuItem cart.items.combo');
  }

  user.cart.totalPrice = user.cart.items.reduce((total, item) => {
    const price = item.menuItem?.price || item.combo?.price || 0;
    return total + (price * item.quantity);
  }, 0);

  await user.save();
  return { code: "200", success: true, message: "Cart updated" };
},
    
        

        

    
  },
  Rating: {
    ratedId: async (parent) => {
      if (!parent.onModel || !parent.ratedId) return null;

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
      if (obj.name) return "MenuItems";
      if (obj.location || obj.cuisine) return "Restaurant";
      if (obj.title) return "Combos";
      return null;
    },
  },
  OrderItem: {
  priceAtPurchase: (parent) => parent.priceAtPurchase ?? 0,
  name: (parent) => {
    if (parent.itemReference && typeof parent.itemReference === 'object') {
      return parent.itemReference.name || "Unknown Item";
    }
    return "Unknown Item";
  }
},
};

module.exports = resolvers;
