const fs = require('fs');

const filename = 'example.txt';
const data = 'Hello, world!';

fs.writeFile(filename, data, (err) => {
  if (err) throw err;
  console.log('File has been saved!');
});
