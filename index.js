// A rendezo algoritmusok behuzva fajlonkent.
const bubble = require('./bubble');
const insertion = require('./insertion');
const exchange = require('./exchange');
const selection = require('./selection');

// A harmadik feltol szarmazo package behuzasa
const readline = require('readline-sync');

// minimum szam ami generalodik a random fuggvenyben
let minGeneratedData = 1;

// maximum szam ami generalodik a random fuggvenyben
let maxGeneratedData = 235;

// ha szeretnenk osszehasonlitani a legnagyobb szamot
// a rendezendo tombokben akkor ez a flag true lesz
let compareFlag;

// az elemek szamat ahany elemet generalni akarunk
let numOfElements;

// elkeri a felhasznalotol, hogy hany elemet generaljon
numOfElements = readline.question('Hany elem legyen a tombben?');

// ha a felhasznalo csak entert utott, vagy 0-t, akkor feltolti 122-vel
if (numOfElements == 0) {
  numOfElements = 122;
}

// ha a szam nagyobb mint 200 akkor noveli a max generalhato szamot
// a problema amit megold: 235 szambol nem lehet 400 egyedi szamot generalni
if (numOfElements > 200) {
  // javascriptben a plusz jel string osszefuzesre szolgal,
  // ha a valtozok elotti plusz jellel szamma alakitjuk oket akkor lesz
  // tenyleges osszeadas
  maxGeneratedData = +maxGeneratedData + +numOfElements;

  // a masik opcio szamma alakitasra
  // maxGeneratedData = Number(maxGeneratedData) + Number(numOfElements);
}

// elkeri a felhasznalotol, hogy szeretne-e osszehasonlitani
compareFlag = readline.keyInYN('Szeretnel osszehasonlitani?');

// megkerdezi melyik algoritmust szeretne hasznalni
let algorithms = ['Bubble', 'Exchange', 'Selection', 'Insertion'];
let index = readline.keyInSelect(algorithms, 'Melyik algoritmus?');

// az index2 globalis scope-n lesz, igy nem csak az if-en belul fog elerheto
// lenni
let index2;

// ha szeretne a user osszehasonlitast, kerunk meg egy algoritmust
if (compareFlag) {
  let algorithms = ['Bubble', 'Exchange', 'Selection', 'Insertion'];
  index2 = readline.keyInSelect(algorithms, 'Melyik algoritmus?');
}

// visszaad egy random szamot min es max kozott
// ez a fuggveny ujrahasznosithato a parameterezhetoseg miatt
let getRandom = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

// general egy random unique szamokat tartalmazo tombot numOfElements szamu
// elemmel
let getDataArr = numOfElements => {
  let arr = [];
  for (i = 0; i < numOfElements; i++) {
    arr = getUniqueData(arr);
  }

  return arr;
};

// rekurziv fuggveny, addig fut ameddig nem general unique szamot,
// majd visszaadja az uj feltoltott elemet
// az amugy beepitett .includes and .push fuggvenyeket implementaltuk magunknak
let getUniqueData = arr => {
  let num = getRandom(minGeneratedData, maxGeneratedData);
  if (!includes(arr, num)) {
    // arr.push(num);
    return push(arr, num);
  } else {
    return getUniqueData(arr);
  }
};

// megvizsgalja, hogy az adott tomb tartalmazza-e az adott elemet
let includes = (arr, element) => {
  for (i = 0; i < arr.length; i++) {
    if (arr[i] == element) {
      return true;
    }
  }
  return false;
};

// beleteszi az elemet a tomb vegere,
// letrehoz egy uj tombot es noveli a helyet benne eggyel,
// majd arra a helyre odateszi az uj elemet
// !!! nyelvfuggetlen megoldas tomb push-ra
let push = (arr, element) => {
  let newArr = new Array(arr.length + 1);
  for (i = 0; i < arr.length; i++) {
    newArr[i] = arr[i];
  }
  newArr[arr.length] = element;
  return newArr;
};

// Az tomb join beepitett fuggveny segitsegevel az amugy tomb tipusu
// valtozot osszefuzi es string-et alakit ki belole
let printArr = arr => {
  console.log(arr.join(', '));
};

// A kapott index alapjan futtat egy rendezesi algoritmust
// majd visszaadja a rendezett tombot
let algorithmPicker = i => {
  switch (i) {
    case 0:
      let bubbleArr = getDataArr(numOfElements);
      console.time('bubble');
      bubble.sort(bubbleArr);
      console.timeEnd('bubble');
      console.log('Num of elements: ', bubbleArr.length);
      printArr(bubbleArr);
      return bubbleArr;
    case 1:
      let exchangeArr = getDataArr(numOfElements);
      console.time('exchange');
      exchange.sort(exchangeArr);
      console.timeEnd('exchange');
      console.log('Num of elements: ', exchangeArr.length);
      printArr(exchangeArr);
      return exchangeArr;
    case 2:
      let selectionArr = getDataArr(numOfElements);
      console.time('selection');
      selection.sort(selectionArr);
      console.timeEnd('selection');
      console.log('Num of elements: ', selectionArr.length);
      printArr(selectionArr);
      return selectionArr;
    case 3:
      let insertionArr = getDataArr(numOfElements);
      console.time('insertion');
      let insertionNewArr = insertion.sort(insertionArr);
      console.timeEnd('insertion');
      console.log('Num of elements: ', insertionNewArr.length);
      printArr(insertionNewArr);
      return insertionNewArr;
  }
};

// pickHigher kivalasztja a legnagyobb elemet a tombbol
// mivel rendezett tombokrol van szo, ezert az utolso elemet vizsgalja
// mindkettoben
let pickHigher = (arr1, arr2) => {
  return arr1[arr1.length - 1] > arr2[arr2.length - 1];
};

// rendez ketto tombott a ketto kivalasztott algoritmus alapjan
result1 = algorithmPicker(index);
result2 = algorithmPicker(index2);

if (pickHigher(result1, result2)) {
  console.log('Elso a nagyobb!');
} else {
  console.log('Masodik a nagyobb, vagy nem tudom!');
}
