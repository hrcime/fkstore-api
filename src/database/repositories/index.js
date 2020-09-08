const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    db[file.split('.')[0]] = new (require(path.join(__dirname, file)));
  })

module.exports = db;