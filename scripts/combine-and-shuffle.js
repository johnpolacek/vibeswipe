const fs = require('fs').promises;
const path = require('path');

async function combineAndShuffleJson() {
  try {
    // Read all files in the data directory
    const dataDir = path.join(__dirname, '..', 'data');
    const files = await fs.readdir(dataDir);
    
    // Filter for JSON files only
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    // Array to store all items
    let allItems = [];
    
    // Read and parse each JSON file
    for (const file of jsonFiles) {
      const filePath = path.join(dataDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      try {
        const data = JSON.parse(content);
        if (Array.isArray(data)) {
          allItems = allItems.concat(data);
        } else {
          console.warn(`Warning: ${file} does not contain an array at the root level`);
        }
      } catch (parseError) {
        console.error(`Error parsing ${file}:`, parseError.message);
      }
    }
    
    // Shuffle the array
    for (let i = allItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
    }
    
    // Write the combined and shuffled data to a new file
    const outputPath = path.join(__dirname, '..', 'data', 'combined-shuffled.json');
    await fs.writeFile(outputPath, JSON.stringify(allItems, null, 2));
    
    console.log(`Successfully combined and shuffled ${allItems.length} items from ${jsonFiles.length} files`);
    console.log(`Output written to: ${outputPath}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
combineAndShuffleJson(); 