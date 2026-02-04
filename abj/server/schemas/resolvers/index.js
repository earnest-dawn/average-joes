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
        const userData = await User.findOne({ id: context.user.id });
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
        .populate('restaurant items.menuItem')
        .sort({ createdAt: -1 });
    },

    orders: async () => {
      return await Order.find({}).populate('customer restaurant');
    }
  
    
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
          menuItem: menuItem,
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

    addToCart: async (_, { input }, context) => {
      const { itemId, itemType } = input;
      if (!context.user) throw new AuthenticationError();

      const user = await User.findById(context.user._id);
      const field = itemType === 'MenuItem' ? 'menuItem' : 'combo';

      const existingIndex = user.cart.items.findIndex(
        item => item[field]?.toString() === itemId
      );

      if (existingIndex > -1) {
        user.cart.items[existingIndex].quantity += 1;
      } else {
        user.cart.items.push({ quantity: 1, [field]: itemId });
      }

      await user.save();
      return await user.populate('cart.items.menuItem cart.items.combo');
    },

    removeFromCart: async (_, { itemId }, context) => {
      if (!context.user) throw new AuthenticationError();

      const user = await User.findById(context.user._id);
      user.cart.items = user.cart.items.filter(
        item => (item.menuItem?.toString() !== itemId && item.combo?.toString() !== itemId)
      );

      await user.save();
      return await user.populate('cart.items.menuItem cart.items.combo');
    },

    createOrder: async (_, { restaurantId, items }, context) => {
      if (!context.user) throw new AuthenticationError();

      let total = 0;
      const orderItems = await Promise.all(items.map(async (item) => {
        const dbItem = await MenuItems.findById(item.menuItemId);
        if (!dbItem) throw new Error(`Item ${item.menuItemId} not found`);
        
        const price = dbItem.price * item.quantity;
        total += price;
        return {
          menuItem: item.menuItemId,
          quantity: item.quantity,
          priceAtPurchase: dbItem.price
        };
      }));

      const newOrder = await Order.create({
        customer: context.user._id,
        restaurant: restaurantId,
        items: orderItems,
        totalPrice: total,
        status: 'PENDING'
      });

      return await newOrder.populate('restaurant items.menuItem');
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
},
createOrder: async (_, { restaurantId, items }, context) => {
            if (!context.user) throw new Error('Not authenticated');

            let total = 0;
            const itemsWithPrice = await Promise.all(items.map(async (item) => {
                
                const dbItem = await MenuItem.findById(item.menuItemId);
                const price = dbItem.price * item.quantity;
                total += price;
                
                return {
                    menuItem: item.menuItemId,
                    quantity: item.quantity,
                    priceAtPurchase: dbItem.price
                };
            }));

            const newOrder = await Order.create({
                customer: context.user._id,
                restaurant: restaurantId,
                items: itemsWithPrice,
                totalPrice: total,
                status: 'PENDING'
            });

            return await newOrder.populate('restaurant items.menuItem');
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
    claimRestaurantOwnership: async (_, { restaurantId }, context) => {
            if (!context.user) throw new Error('Not authenticated');
            
            const restaurant = await Restaurant.findById(restaurantId);
            if (!restaurant) throw new Error('Restaurant not found');
            if (restaurant.owner) throw new Error('Restaurant already claimed');

            restaurant.owner = context.user._id;
            await restaurant.save();
            return restaurant;
        },

        

        updateOrderStatus: async (_, { orderId, status }, context) => {
            if (!context.user) throw new Error('Not authenticated');
            
            const order = await Order.findById(orderId).populate('restaurant');
            if (order.restaurant.owner.toString() !== context.user._id) {
                throw new Error('Not authorized to update this order');
            }

            order.status = status;
            await order.save();
            return order;
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
 Restaurant: {
    activeOrders: async (parent) => {
      return await Order.find({ 
        restaurant: parent._id, 
        status: { $in: ['PENDING', 'PREPARING', 'READY'] } 
      }).populate('customer items.menuItem');
    }
  },
  RatedObject: {
    __resolveType(obj) {
      if (obj.price) return "MenuItems";
      if (obj.location || obj.cuisine) return "Restaurant";
      if (obj.items) return "Combo";
      return null;
    },
  },
};

module.exports = resolvers;
