/**
 * @RelayResolver Query.node(id: ID): Node
 */
function node(parent, args, context) {
    const { id } = args;
    const { dataLoader } = context;
    return dataLoader.load(id);
}

/**
 * @RelayResolver Query.me: User
 */
async function me(parent, args, context) {
    if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
    }
    throw new AuthenticationError('You need to be logged in!');
}

/**
 * @RelayResolver Mutation.register(input: RegisterInput!): RegisterPayload
 */
async function register(parent, args) {
    const { username, password, email } = args.input;

    const user = await User.create(args.input);
    const token = signToken(user);
    return {
        code: '200',
        success: true,
        message: 'User registered successfully!',
        token,
        user,
    };
}

/**
 * @RelayResolver Mutation.login(input: LoginInput!): LoginPayload
 */
async function login(parent, { input: { username, password } }) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new AuthenticationError('Incorrect credentials!');
    }
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials!');
    }
    const token = signToken(user);
    return {
        code: '200',
        success: true,
        message: 'Logged in successfully!',
        token,
        user,
    };
}
