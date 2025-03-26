const Words = require('../models/Words.js')
const words = new Words();

const game = {
    secretWord: "none",
    hiddenWord: "____",
    hint: "none",
    difficulty: 0,
    rightGuesses: 0,
    wrongGuesses: 0,
    rightGuessHistory: [],
    wrongGuessHistory: [],
    letterBank: [],
    get imgNum() {
        return 1 + this.difficulty + this.wrongGuesses;
    },
    get attempts() {
        return this.rightGuesses + this.wrongGuesses;
    },
    get attemptsLeft() {
        return this.maxWrong - this.wrongGuesses;
    },
    get gameOn() {
        return this.secretWord !== "none" && !this.hasLost && !this.hasWon;
    },
    get hasWon() {
        if(this.hiddenWord === this.secretWord) return true;
        else return false;
    },
    get hasLost() {
        if(this.attemptsLeft === 0 && !this.hasWon) return true;
    },
    get maxWrong() {
        return 7 - this.difficulty;
    },
    get uniqueLetters() {
        let uLetters = [];
        for(let ltr of this.secretWord){
            if(!uLetters.includes(ltr)){
                uLetters.push(ltr);
            }
        }
        return uLetters.length;
    },
    guess: function(letter) {
        const idx = this.letterBank.indexOf(letter);
        this.letterBank.splice(idx, 1);
        let found = false;
        let str = "";
        let hiddenArray = this.hiddenWord.split("");
        for(let i=0; i<this.secretWord.length; i++){
            str += letter + " " + this.secretWord + " " + this.secretWord[i] + " " + hiddenArray;
            if(this.secretWord[i] === letter){
                found = true;
                hiddenArray[i] = letter;
            }
        }
        if(found){
            this.rightGuesses++;
            this.rightGuessHistory.push(letter);
            this.hiddenWord = hiddenArray.join("");
        }
        else{
            this.wrongGuesses++;
            this.wrongGuessHistory.push(letter);
        }
        return str;
    },
    load: function(word, hint, difficulty) {
        this.secretWord = word;
        this.hiddenWord = this.generateHiddenWord(word);
        this.hint = hint;
        this.difficulty = difficulty;
        this.letterBank = "abcdefghijklmnopqrstuvwxyz".split("");
    },
    reset: function() {
        this.secretWord = "none";
        this.hiddenWord = "____";
        this.hint = "none";
        this.difficulty = 0;
        this.rightGuesses = 0;
        this.wrongGuesses = 0;
        this.rightGuessHistory = [];
        this.wrongGuessHistory = [];
        this.letterBank = [];
    },
    generateHiddenWord: function(word) {
        let hw = "";
        for(let i=0; i<this.secretWord.length; i++) hw += "_";
        return hw;
    }
}

exports.getHangman = (req, res, next) => {
    game.reset();
    res.render('main', {
        game: game,
        title: "Welcome to Halloween Hangman"
    })
}

exports.startGame = (req, res, next) => {
    game.reset();
    let word = words.getRandomWord();
    let difficulty = parseInt(req.body.difficulty);
    game.load(word.word, word.hint, difficulty);
    res.render('main', {
        game: game,
        title: "Welcome to Halloween Hangman"
    })
}

exports.makeGuess = (req, res, next) => {
    game.guess(req.body.guess);
    res.render('main', {
        game: game,
        title: "Welcome to Halloween Hangman"
    })
}