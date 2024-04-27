const textElement = document.getElementById("text");
const inputElement = document.getElementById("input");
const restartButton = document.getElementById("restart");
const resultElement = document.getElementById("result-scoreElement");
const bestScoreElement = document.getElementById("best-scoreElement");
const timerElement = document.getElementById("timer");

let words = [];
let typedWords = [];
let currentWordIndex = 0;
let startTime;
let timerId;
let characters = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let timeRemaining = 60;
let isFirstInput = true;

// Function to generate random text
function generateText() {
  const data =
    "the name of very to through and just form in much is great it think you say " +
    "that help he low was line for before on turn are cause with same as mean " +
    "differ his move they right be boy at old one too have does this tell from " +
    "sentence or set had three by want hot air but well some also what play there " +
    "small we end can put out home other read were hand all port your large when " +
    "spell up add use even word land how here said must an big each high she such " +
    "which follow do act their why time ask if men will change way went about light " +
    "many kind then off them need would house write picture like try so us these " +
    "again her animal long point make mother thing world see near him build two self " +
    "has earth look father more head day stand could own go page come should did " +
    "country my found sound answer no school most grow number study who still over " +
    "learn know plant water cover than food call sun first four people thought may " +
    "let down keep side eye been never now last find door any between new city work " +
    "tree part cross take since get hard place start made might live story where saw " +
    "after far back sea little draw only left round late man run year don't came " +
    "while show press every close good night me real give life our few under stop " +
    "open ten seem simple together several next vowel white toward children war " +
    "begin lay got against walk pattern example slow ease paper love often " +
    "person always money music serve those appear both road mark map book science " +
    "letter rule until govern mile pull river cold car notice feet voice care fall " +
    "second power group town carry fine took certain rain fly eat unit room lead " +
    "friend cry began dark idea machine fish note mountain wait north plan once " +
    "figure base star hear box horse noun cut field sure rest watch correct " +
    "able face pound wood done main beauty enough drive plain stood girl contain " +
    "usual front young teach ready week above final ever gave red green list oh " +
    "though quick feel develop talk sleep bird warm soon free body minute dog strong " +
    "family special direct mind pose behind leave clear song tail measure produce " +
    "state fact product street black inch short lot numeral nothing class course " +
    "wind stay question wheel happen full complete force ship blue area object half " +
    "decide rock surface order deep fire moon south island problem foot piece yet " +
    "told busy knew test pass record farm boat top common whole gold king possible " +
    "size plane heard age best dry hour wonder better laugh true thousand during ago " +
    "hundred ran am check remember game step shape early yes hold hot west miss " +
    "ground brought interest heat reach snow fast bed five bring sing sit listen " +
    "perhaps six fill table east travel weight less language morning among speed " +
    "typing mineral seven eight nine everything something standard distant paint";
  const dataArr = data.split(" ");
  const length = Math.floor(Math.random() * 10) + 15; // Random length between 5 and 14 words

  words = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * dataArr.length);
    const word = dataArr[randomIndex];
    words.push(word);
  }
  currentWordIndex = 0;
  displayText();
  inputElement.value = "";
  inputElement.focus();
}

// Function to display the text with the current word highlighted
function displayText() {
  let textContent = "";
  for (let i = 0; i < words.length; i++) {
    if (i < currentWordIndex) {
      const isCorrect = checkWord(i);
      textContent += `<span class="${isCorrect ? "correct" : "incorrect"}">${
        words[i]
      }</span> `;
    } else if (i === currentWordIndex) {
      textContent += `<span>${words[i]}</span> `;
    } else {
      textContent += `${words[i]} `;
    }
  }
  textElement.innerHTML = textContent;
}

// Function to check if a word is correct
function checkWord(index) {
  const word = words[index];
  const typedWord = typedWords[index];
  return word === typedWord;
}

// Function to start the typing test
function startTest() {
  startTime = new Date().getTime();
  timerId = setInterval(updateTimer, 1000);
  restartButton.style.display = "inline-block";
  typedWords = [];
  isFirstInput = false;
}

// Function to update the timer and check for test completion
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const secondsElapsed = Math.floor(elapsedTime / 1000);
  timeRemaining = 60 - secondsElapsed;

  if (timeRemaining >= 0) {
    timerElement.textContent = `Time remaining: ${timeRemaining}`;
  } else {
    clearInterval(timerId);
    inputElement.disabled = true;
    const charactersTyped = characters;
    resultElement.textContent = `You typed ${charactersTyped} correct characters in 1 minute.`;
    if (charactersTyped > bestScore) {
      bestScore = charactersTyped;
      localStorage.setItem("bestScore", bestScore);
      bestScoreElement.textContent = `Best Score: ${bestScore}`;
    }
  }
}

function restartTest() {
  clearInterval(timerId);
  inputElement.disabled = false;
  resultElement.textContent = "";
  characters = 0;
  timeRemaining = 60;
  timerElement.textContent = `Time remaining: ${timeRemaining}`;
  generateText();
  restartButton.style.display = "none";
  isFirstInput = true;
}

// Event listeners
restartButton.addEventListener("click", restartTest);
inputElement.addEventListener("input", () => {
  const currentWord = words[currentWordIndex];
  const inputValue = inputElement.value;
  if (inputValue.trim().length && inputValue[inputValue.length - 1] === " ") {
    if (inputValue.trim() === currentWord) {
      characters += inputValue.length - 1;
    }
    typedWords.push(inputValue.trim());
    currentWordIndex++;
    inputElement.value = "";
    displayText();
    if (currentWordIndex === words.length) {
      generateText();
    }
  }
  if (currentWordIndex === 0 && isFirstInput) {
    startTest();
  }
});

// Generate initial text
generateText();

// Set best score on page load
if (bestScore) {
  bestScoreElement.style.display = "flex";
  bestScoreElement.textContent = `Best Score: ${bestScore}`;
}
