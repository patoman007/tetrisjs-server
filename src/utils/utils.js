function getRandomId(len = 6, chars = 'abcdefghijklmopqrstuvwxyz') {
  let id = '';
  let i = 0;

  while (i < len) {
    id += chars[(Math.random() * chars.length) | 0];
    i++;
  }

  return id;
}

module.exports = {
  getRandomId
};
