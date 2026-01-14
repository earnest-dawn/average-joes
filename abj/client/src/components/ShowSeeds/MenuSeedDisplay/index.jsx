const fs = require('fs');
const path = require('path');

/**
 * This script reads the JSON file directly from the disk,
 * parses it, and prints every value.
 */
function showMenu() {
    try {
        // 1. Define the path to your JSON file
        const filePath = path.join(__dirname, 'menuItemsSeeds.json');

        // 2. Read the file synchronously
        const rawData = fs.readFileSync(filePath, 'utf8');

        // 3. Parse the string into a JavaScript Array
        const menuItems = JSON.parse(rawData);

        console.log(`--- Printing ${menuItems.length} Items ---`);

        // 4. Iterate through the array
        menuItems.forEach((item, index) => {
            console.log(`\n[Item ${index + 1}: ${item.name}]`);
            
            // 5. Use Object.entries to print every key and value dynamically
            for (const [key, value] of Object.entries(item)) {
                console.log(`   ${key}: ${value}`);
            }
        });

    } catch (err) {
        console.error("Error reading or parsing the JSON file:", err);
    }
}

// Execute the function
showMenu();