const sort = tomb => {
  for (let i = 0; i < tomb.length; i++) {
    for (let j = 0; j < tomb.length - i - 1; j++) {
      if (tomb[j] > tomb[j + 1]) {
        let temp = tomb[j];
        tomb[j] = tomb[j + 1];
        tomb[j + 1] = temp;
      }
    }
  }
  return tomb;
};

module.exports = { sort };
