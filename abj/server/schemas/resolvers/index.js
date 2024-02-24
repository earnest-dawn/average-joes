const { MenuItems, User, Combos } = require('../../models');
const { signToken, AuthenticationError } = require('../../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id });
                return userData;
            }
            throw AuthenticationError;
        },

        menuItems: async (parent, args) => {
            return await MenuItems.find({});
        },
        combos: async () => {
            return Combos.find({}).populate('menuItems');
        },
        users: async () => {
            return User.find({});
        },
    },
    Mutation: {
        // getSingleDeck: async (parent, { id }) => {
        //     // const data = this.deck;
        //     return Deck.findById(id).populate('cards');
        // },

        register: async (parent, args) => {
            console.log('Received input:', args.input);
            const { username, password, email } = args.input;
            const user = await User.create({ username, password, email });
            const token = signToken(user);
            console.log(user);
            return { token, user };
        }
        ,
        createCombos: async (parent, { title, menuItems, price }, context) => {
            if (context.user) {
                let newCombo = await Combos.create({ title, menuItems, price });
                newCombo = await newCombo.populate('menuItems');
                return newCombo;
            }
            throw AuthenticationError;
        },
        deleteCombos: async (parent, { id }, context) => {
            if (context.user) {
                const deletedCombos = await Combos.findByIdAndDelete(id, {
                    new: true,
                });
                return deletedCombos;
            }
            throw AuthenticationError;
        },
        addToCombos: async (parent, args, context) => {
            if (context.user) {
                const updatedCombos = await Combos.findByIdAndUpdate(
                    args.CombosId,
                    {
                        $push: {
                            menuItems: args.menuItemsId,
                        },
                    },
                    { new: true }
                );

                return updatedCombos;
            }
            throw AuthenticationError;
        },
        // removeFromCombos: async (parent, args, context) => {
        //     if (context.user) {
        //         const updatedCombos = await Combos.findByIdAndUpdate(
        //             args.CombosId,
        //             {
        //                 $pull: {
        //                     cards: args.cardId,
        //                 },
        //             },
        //             { new: true }
        //         );

        //         return updatedCombos;
        //     }
        //     throw AuthenticationError;
        // },
        // updateCombos: async (parent{title, cards}, context) => {
        //     if (context.user) {
        //         let newCombos = await Combos.findOneAndUpdate({})
        //     }
        // }

        // deleteComboss:

        // createCardCharacter:
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
        
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
        
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
        
            const token = signToken(user);
        
            // Do not include the password in the response
            return { token, user: { username: user.username } };
        }
        ,
        // getSingleUser: async (parent, args, context) => {
        //     const desiredUser = await User.findById({ _id: context.user._id });
        // },
        // deleteUser: async () => {
        //     return User.deleteOne({ req });
        //     console.log('deleted user');
        // },
    },
};

module.exports = resolvers;
