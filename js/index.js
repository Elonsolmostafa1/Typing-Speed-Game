let wordInput = document.querySelector('#wordInput');
let word = document.querySelector('.word');
let startButton = document.querySelector('.start-btn');
let passedSecondsText = document.querySelector('.time span');
let answeredQuestions = document.querySelector('.score span');
let finishMessage = document.querySelector('.finishMessage');
let totalWords = document.querySelector('.total-words');
let highestScore = document.querySelector('.highest-score');
let tryAgainButton = document.querySelector('.try-again')


if(localStorage.getItem("heighestScore") == null)
{
    highestScore.innerHTML = 0;
}
else
{
    highestScore.innerHTML = JSON.parse(localStorage.getItem("heighestScore"));
}

// Array of words
const words = ["Hello","Programming","Code","Javascript","Town","Country","Testing","Youtube","Twitter","Github","Leetcode",
                "Internet","Python","cala","Destructuring","Paradigm","Styling","Cascade","Documentation","Coding","Funny",
"Working","Dependencies","Task","Runner","Roles","Test","Rust","Playing"];


wordInput.onpaste = function () {return false;}

totalWords.innerHTML = words.length;

let writtenWords = 0;
let passedSeconds = 0;
let start = 0;

function getRandomWord(){
    let wordIndex = Math.floor(Math.random()*words.length);
    let randomWord = words[wordIndex];
    word.innerHTML = randomWord;
    words.splice(wordIndex,1);
}

startButton.addEventListener('click',function(){
    this.remove();
    wordInput.focus();
    getRandomWord();
    start = setInterval(()=>{
        passedSeconds++;
        passedSecondsText.innerHTML = passedSeconds;
        startPlaying();
    },1000)
})



function startPlaying(){
    wordInput.addEventListener('input' , function(e){
        if(wordInput.value === word.textContent)
        {
            wordInput.value ='';
            writtenWords++;
            answeredQuestions.innerHTML = writtenWords;
            if(words.length>0)
                getRandomWord();
            else
            {
                clearInterval(start);
                createWinningElement();
                updateHeighestScore();
            }
        }   
    })
}

function updateHeighestScore(){
    if(localStorage.getItem("heighestScore") == null ||parseInt(localStorage.getItem("heighestScore"))>passedSeconds )
    {
        localStorage.setItem("heighestScore" , JSON.stringify(passedSeconds));
        highestScore.innerHTML = passedSeconds;
    }
}

function createWinningElement(){
    toggleWordAndInput();
    let winningDiv = document.createElement("div");
    winningDiv.classList = "text-success fs-2 text-center mx-auto p-5 bg-light w-75 my-3 fw-bold text-capitalize";
    let winningText = document.createTextNode(`Congratulations you finished in ${passedSeconds} seconds`);
    winningDiv.appendChild(winningText);
    finishMessage.appendChild(winningDiv);
}

function toggleWordAndInput(){
    word.classList.toggle('display-none');
    wordInput.classList.toggle('display-none');
    tryAgainButton.classList.toggle('display-none');
}

tryAgainButton.addEventListener('click', function(){
    window.location.reload();
})





