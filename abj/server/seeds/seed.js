const db = require('../config/connection');
const { MenuItems, User, Combos } = require('../models');
const MenuItemsSeeds = require('./MenuItemsSeeds.json');
const CombosSeeds = require('./CombosSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await MenuItems.deleteMany({});
    await MenuItems.insertMany(MenuItemsSeeds);
    console.log('Menu Items have all been deleted');

    await Combos.deleteMany({});
    await Combos.insertMany(CombosSeeds);
    console.log('Combos have all been deleted');
    process.exit(0);
});
