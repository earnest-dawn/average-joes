import { AuthenticationError } from "../../../../server/utils/auth";
/**
 * @RelayResolver Mutation.createCombos(input: CreateCombosInput!): CreateCombosPayload
 */
async function createCombos(parent, { input }, context) {
    if (context.user) {
        let newCombo = await Combos.create(input);
        newCombo = await newCombo.populate('menuItems');
        return {
            code: '200',
            success: true,
            message: 'Combos created successfully!',
            combos: newCombo,
        };
    }
    throw new AuthenticationError('You need to be logged in!');
}

/**
 * @RelayResolver Mutation.deleteCombos(input: DeleteCombosInput!): DeleteCombosPayload
 */
async function deleteCombos(parent, { input: { id } }, context) {
    if (context.user) {
        const deletedCombos = await Combos.findByIdAndDelete(id, {
            new: true,
        });
        return {
            code: '200',
            success: true,
            message: 'Combos deleted successfully!',
            combos: deletedCombos,
        };
    }
    throw new AuthenticationError('You need to be logged in!');
}

/**
 * @RelayResolver Mutation.addToCombos(input: AddToCombosInput!): AddToCombosPayload
 */
async function addToCombos(
    parent,
    { input: { combosId, menuItems } },
    context
) {
    if (context.user) {
        const updatedCombos = await Combos.findByIdAndUpdate(
            combosId,
            {
                $push: {
                    menuItems,
                },
            },
            { new: true }
        );
        return {
            code: '200',
            success: true,
            message: 'Added to combos successfully!',
            combos: updatedCombos,
        };
    }
    throw new AuthenticationError('You need to be logged in!');
}

/**
 * @RelayResolver Mutation.removeFromCombos(input: RemoveFromCombosInput!): RemoveFromCombosPayload
 */
async function removeFromCombos(
    parent,
    { input: { combosId, menuItems } },
    context
) {
    if (context.user) {
        const updatedCombos = await Combos.findByIdAndUpdate(
            combosId,
            {
                $pull: {
                    menuItems,
                },
            },
            { new: true }
        );
        return {
            code: '200',
            success: true,
            message: 'Removed from combos successfully!',
            combos: updatedCombos,
        };
    }
    throw new AuthenticationError('You need to be logged in!');
}
