const sort = tomb => {
  for (let i = 1; i < tomb.length; i++) {
    let valami = tomb[i];
    let j = i - 1;
    while (j >= 0 && tomb[j] > valami) {
      tomb[j + 1] = tomb[j];
      j--;
    }
    tomb[j + 1] = valami;
  }
  return tomb;
};

module.exports = { sort };
