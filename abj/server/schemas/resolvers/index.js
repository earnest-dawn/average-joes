const { MenuItems, User, Combos } = require('../../models');
const { signToken } = require('../../utils/auth');
const bcrypt = require('bcrypt');
// Change this line:
// const { AuthenticationError } = require('apollo-server-express');
// To this:
const { GraphQLError } = require('graphql'); // Apollo Server v4 uses GraphQLError directly for custom errors

// Define a custom AuthenticationError that extends GraphQLError
// This is the recommended way to handle custom errors in Apollo Server v4
class AuthenticationError extends GraphQLError {
    constructor(message = 'Not authenticated') {
        super(message, {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 }, // Optional: add HTTP status code
            },
        });
        this.name = 'AuthenticationError';
    }
}


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id });
                return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
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
        register: async (parent, args) => {
            console.log('Received input:', args.input);
            const { username, password, email } = args.input;
            const user = await User.create({ username, password, email });
            const token = signToken(user);
            console.log(user);
            return { token, user };
        },
        createCombos: async (parent, { title, menuItems, price }, context) => {
            if (context.user) {
                let newCombo = await Combos.create({ title, menuItems, price });
                newCombo = await newCombo.populate('menuItems');
                return newCombo;
            }
            throw new AuthenticationError('You need to be logged in to create combos!');
        },
        deleteCombos: async (parent, { id }, context) => {
            if (context.user) {
                const deletedCombos = await Combos.findByIdAndDelete(id, {
                    new: true,
                });
                return deletedCombos;
            }
            throw new AuthenticationError('You need to be logged in to delete combos!');
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
            throw new AuthenticationError('You need to be logged in to add to combos!');
        },
        login: async (parent, { input }) => {
            const { username, password } = input;
            console.log('Attempting login for username:', username);
            const user = await User.findOne({ username });

            if (!user) {
                console.log('User not found for username:', username);
                throw new AuthenticationError('Incorrect credentials');
            }
            console.log('User found:', user.username);

            console.log('Comparing password for user:', user.username);
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                console.log('Password comparison failed for user:', user.username);
                throw new AuthenticationError('Incorrect credentials');
            }
            console.log('Password comparison successful!');

            const token = signToken(user);

            return { token, user: { username: user.username, id: user._id } };
        },
    },
};

module.exports = resolvers;
