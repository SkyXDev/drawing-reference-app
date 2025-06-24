// List of subfolders inside /public/images
export const folders = ['Photos', 'Traditional Art', 'Scenes'];
//Uncomment the script when in need and remove export
/*const fs = require('fs');
const path = require('path');



const baseFolder = path.join(__dirname, 'public/images');
const outputPath = path.join(baseFolder, 'imageList.json');

// Filter for image files only
const isImageFile = (filename) => /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(filename);

// This will store our final output
const imageData = {};

folders.forEach((folderName) => {
  const folderPath = path.join(baseFolder, folderName);
  try {
    const files = fs.readdirSync(folderPath).filter(isImageFile);
    imageData[folderName] = files;
  } catch (err) {
    console.error(`Failed to read folder "${folderName}":`, err.message);
    imageData[folderName] = [];
  }
});

// Write result to JSON
fs.writeFileSync(outputPath, JSON.stringify(imageData, null, 2));
console.log('✅ imageList.json generated in /public/images');

*/