const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

var currentNum = [];
var num=100;
var arr = [];

var clapad = new Audio('sounds/audience_applause_big-theatre-54753-[AudioTrimmer.com].mp3');
var oohad = new Audio('sounds/wahwahwahwaaaahahahahahaha-94669.mp3');

let score = 0;
let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {

    if(num==100){
        num = Math.floor(Math.random() * wordList.length);
    }
    
    let ranItem = wordList[num];
    var i = Math.floor(Math.random() * wordList.length);
    
    if(currentNum.includes(num)){
        num = i
        randomWord();
    }
    else{
        currentNum.push(num);
        
        word = ranItem.word;
        maxGuesses = word.length >= 5 ? 8 : 6;
        correctLetters = []; incorrectLetters = [];
        hintTag.innerText = ranItem.hint;
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    
        let html = "";
        for (let i = 0; i < word.length; i++) {
            html += `<input type="text" disabled>`;
            inputs.innerHTML = html;
        }
        console.log(currentNum.length);
    }
    
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[أ-ي-1-2-3-4-5-6-7-8-9-ء-ئ]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            clapad.muted = false;
            clapad.play();
            alert(`اجابتك صحيحة , الاجابة هي ${word.toUpperCase()}`);
            clapad.pause();
            score++;
            document.querySelector('.score').innerHTML = `نتيجتك هي :  ${score}`;
            return randomWord();
        } else if(maxGuesses == 0) {
            oohad.muted = false;
            oohad.play();
            alert(` لم تعرف الاجابة , الاجابة هي ${word.toUpperCase()}`);
            oohad.pause();
            score--;
            document.querySelector('.score').innerHTML = `نتيجتك هي :  ${score}`; 
            return randomWord();

            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
