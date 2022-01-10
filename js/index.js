// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = "";
  
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let newFruit = document.createElement('li');
    newFruit.className = "fruit__item";
    fruitsList.appendChild(newFruit);

    let newFruitInfo = document.createElement('div');
    newFruitInfo.className = 'fruit__info';
    newFruit.appendChild(newFruitInfo);

    let newFruitIndex = document.createElement('div');
    newFruitIndex.innerHTML = 'index: ' + i;
    newFruitInfo.appendChild(newFruitIndex);;

    let newFruitKind = document.createElement('div');
    newFruitKind.innerHTML = fruits[i].kind;
    newFruitInfo.appendChild(newFruitKind);

    let newFruitColor = document.createElement('div');
    newFruitColor.innerHTML = fruits[i].color;
    newFruitInfo.appendChild(newFruitColor);

    let newFruitWeight = document.createElement('div');
    newFruitWeight.innerHTML = 'weight (кг): ' + fruits[i].weight;
    newFruitInfo.appendChild(newFruitWeight);
   
    switch(fruits[i].color){
      case 'фиолетовый':
        newFruit.classList.add('fruit_violet');
        break;
        case 'зеленый':
        newFruit.classList.add('fruit_green');
        break;
        case 'желтый':
        newFruit.classList.add('fruit_yellow');
        break;
        case 'светло-коричневый':
        newFruit.classList.add('fruit_lightbrown');
        break;
        case 'розово-красный':
        newFruit.classList.add('fruit_carmazin');
        break;
    }
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let originalArray = fruits;

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    let randomFruit =  fruits.splice(getRandomInt(0, fruits.length), 1)[0];
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
   if(randomFruit){
     result.push(randomFruit);
    };
  }

  fruits = result;
  if(result == originalArray){alert("Неудача при перемещивании!")}
};



shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let filteredFruits = fruits.filter((item) => {
    // TODO: допишите функцию
    let minWeight = document.querySelector('minweight__input').value;
    let maxWeight = document.querySelector('maxweight__input').value;
    return item.weight > minWeight && item.weight < maxWeight;
  })
  fruits = filteredFruits;
};


filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  let priority = ['розово-красный', 'светло-коричневый', 'жетлый', 'зеленый', 'фиолетовый'];
  let priority1 = priority.indexOf(a.color);
  let priority2 = priority.indexOf(b.color);
  return priority1 > priority2
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    for (let i = 0; i < arr.length-1; i++){
      let n = false; 
      for (let j = 0; j < arr.length-i; j++) { 
        if (comparation(arr[j], arr[j+1])) { 
          let temp = arr[j+1]; 
          arr[j+1] = arr[j]; 
          arr[j] = temp;
          n = true;
        }
        if(!n)break;
        return arr;
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    if(arr.length < 2) {return arr;}
    else{
      const pivot = arr[getRandomInt(0, arr.length-1)];
      const less = arr.filter(value => comparation(pivot, value));        
      const greater = arr.filter(value => comparation(value, pivot));        
      const newArr = [...quickSort(less, comparationColor), pivot, ...quickSort(greater, comparationColor)];
      arr = newArr;
      console.log(arr);
      return arr;
    };
  },  

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if(sortKind != 'bubbleSort'){
    sortKind = 'bubbleSort';
    sortKindLabel.textContent = sortKind;
    return;
  }
  else {
    sortKind = 'quickSort';
    sortKindLabel.textContent = sortKind;
  }
}); 

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if(kindInput == "" || colorInput == "" || weightInput == ""){
    alert('Введите все данные');
  }
  else{
    let newFruit = {
      kind : kindInput.value,
      color : colorInput.value,
      weight : weightInput.value,
    }
    fruits.push(newFruit);
    kindInput.value = '';
    colorInput.value = '';
    weightInput.value = '';
  }
  display();
});
