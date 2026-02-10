const fs = require('fs');
const path = require('path');

/**
 * This script reads the JSON file directly from the disk,
 * parses it, and prints every value.
 */
function showCombo() {
    try {
        const filePath = path.join(__dirname, 'CombosSeeds.json');

        const rawData = fs.readFileSync(filePath, 'utf8');

        const combos = JSON.parse(rawData);

        console.log(`--- Printing ${combos.length} Items ---`);

        combos.forEach((item, index) => {
            console.log(`\n[Item ${index + 1}: ${item.name}]`);
            
            for (const [key, value] of Object.entries(item)) {
                console.log(`   ${key}: ${value}`);
            }
        });

    } catch (err) {
        console.error("Error reading or parsing the JSON file:", err);
    }
}

showCombo();