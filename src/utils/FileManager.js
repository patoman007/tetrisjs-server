const fs = require('fs');

class FileManager {

  constructor(filepath) {
    if (filepath != null) {
      this.setFilepath(filepath);
    }
  }

  readFromFile() {
    if (this.filepath == null) {
      throw Error('Cannot read from file, filepath is not defined.');
    }

    return fs.readFileSync(this.filepath);
  }

  setFilepath(filepath) {
    this.filepath = filepath;
  }

  writeToFile(data, options = 'utf-8') {
    if (this.filepath == null) {
      throw Error('Canoot write to file, filepath is not defined.');
    }

    fs.writeFileSync(this.filepath, data, options);
  }

}

module.exports = FileManager;
