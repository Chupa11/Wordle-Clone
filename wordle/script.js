const words=[
    "apple", "bread", "chair", "dance", "eagle", 
    "flame", "grass", "honey", "knife", "lemon", 
    "mango", "night", "ocean", "peace", "queen", 
    "river", "smile", "train", "unity", "voice", 
    "alert", "brick", "climb", "dream", "email", 
    "flock", "grape", "heart", "igloo", "jolly", 
    "kiosk", "laser", "maple", "nacho", "olive", 
    "plumb", "quest", "ready", "swing", "tiger", 
    "umbra", "vigor", "whale", "xenon", "yield", 
    "zesty", "blaze", "candy", "doubt", "exile", 
    "frisk", "globe", "haste", "ivory", "jewel", 
    "knack", "light", "mirth", "novel", "olive", 
    "pearl", "quilt", "radar", "scent", "thumb", 
    "usual", "vivid", "waltz", "xylan", "zebra",
    "aback", "badge", "cider", "drape", "eager", 
    "flora", "grind", "hasty", "infer", "jiffy", 
    "koala", "laser", "medal", "nerdy", "ovate", 
    "plume", "quack", "robot", "silly", "tread", 
    "urban", "valor", "wiser", "yacht", "zesty",
    "acorn", "bliss", "crown", "dough", "ethos", 
    "flint", "gleam", "hollow", "index", "joint", 
    "kites", "latch", "mimic", "noble", "optic", 
    "plaza", "quill", "robin", "sheep", "tango", 
    "unite", "viola", "weave", "yummy", "zesty"
];
const popUp=document.getElementById("popUp");
const answer=words[Math.floor(Math.random()*words.length)];
const answerArr = answer.split('');
const letters = [
    "Backspace", "Enter", "a", "A", "b", "B", "c", "C", "d", "D", 
    "e", "E", "f", "F", "g", "G", "h", "H", "i", "I", "j", "J", 
    "k", "K", "l", "L", "m", "M", "n", "N", "o", "O", "p", "P", 
    "q", "Q", "r", "R", "s", "S", "t", "T", "u", "U", "v", "V", 
    "w", "W", "x", "X", "y", "Y", "z", "Z"
];

const boxes = {
    0: document.getElementById('0').querySelectorAll('.box'),
    1: document.getElementById('1').querySelectorAll('.box'),
    2: document.getElementById('2').querySelectorAll('.box'),
    3: document.getElementById('3').querySelectorAll('.box'),
    4: document.getElementById('4').querySelectorAll('.box'),
    5: document.getElementById('5').querySelectorAll('.box')
};

let row = 0; // Tracks our guesses
let col = 0; // Tells us which letter we're on
let curGuess = [];
let gameWon=false;
document.addEventListener('keydown', (event) => {
    if(row>6){
        gameWon=true;
    }
    if(!gameWon){
        let key = null;
        if (!letters.includes(event.key)) {
            return;
        } else if (event.key === "Backspace") {
            key = "Backspace";
        } else if (event.key === "Enter") {
            if (curGuess.length === 5) {
                checkWord(curGuess);
            }
            return; 
        } else {
            key = event.key.toLowerCase();
        }
        changeGuess(key);
    }
});


/*---FUNCTIONS---*/
let colors = [];

function checkWord(guessArr) {
    let answerArrChanged = [...answerArr]; 
    let colors = []; 

    // First pass: mark correct positions
    for (let i = 0; i < guessArr.length; i++) {
        if (guessArr[i] === answerArrChanged[i]) {
            colors.push('correct'); 
            answerArrChanged[i] = '!'; // Mark as used
        } else {
            colors.push(null); // Placeholder for second pass
        }
    }

    // Second pass: mark present positions
    for (let i = 0; i < guessArr.length; i++) {
        if (colors[i] === null) { // Only check letters that weren't marked 'correct'
            if (answerArrChanged.includes(guessArr[i])) {
                colors[i] = 'present'; 
                let index = answerArrChanged.indexOf(guessArr[i]);
                answerArrChanged[index] = '?'; // Mark as used
            } else {
                colors[i] = 'absent'; 
            }
        }
    }

    // Apply colors to the boxes
    for (let i = 0; i < curGuess.length; i++) {
        boxes[row][i].classList.add(colors[i]); 
    }

    if (colors.every(color => color === "correct")) {
        gameWon = true;
        return winGame();
    }
    curGuess = [];
    colors = []; 
    if (row !== 5) {
        row++;
    } else {
        popUp.querySelector("h1").innerText = "You Lost";
        popUp.querySelector("p").innerText = "Better luck next time!";
        popUp.style.visibility = "visible";
    }
}


function display(word) {
    for (let i = 0; i < 5; i++) {
        if (word[i]) {
            boxes[row][i].innerText = word[i];
        } else {
            boxes[row][i].innerText = "";
        }
    }
}


function changeGuess(key) {
    if (key === "Backspace" && curGuess.length >= 0) {
        curGuess.pop();
    } else if (curGuess.length < 5) {
        curGuess.push(key);
    }
    display(curGuess);
}
function winGame(){
    const freal=document.getElementById('freal');
    popUp.style.visibility="visible";
    if(row!==0){
        freal.innerText=`It took you ${row+1} guesses!`;
    }else{
        freal.innerText=`It took you ${row+1} guess!`;
    }
    
}
const button=document.querySelector('button');
button.addEventListener('click',()=>{
    window.location.reload();
})
console.log(answer);