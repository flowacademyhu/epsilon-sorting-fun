const sort = tomb => {
  for (let i = 0; i < tomb.length; i++) {
    let kiscica = i;
    for (let j = i + 1; j < tomb.length; j++) {
      if (tomb[j] < tomb[kiscica]) {
        kiscica = j;
      }
    }
    let temp = tomb[i];
    tomb[i] = tomb[kiscica];
    tomb[kiscica] = temp;
  }
  return tomb;
};

module.exports = { sort };
