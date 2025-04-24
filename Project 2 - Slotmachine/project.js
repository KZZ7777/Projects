// 1. Deposit some money (hier vragen we aan de user hoeveel geld die wilt storten)
// 2. Determine number of lines to bet on (welke lijn de user wilt gokken)
// 3. Collect a bet amount
// 4. spin the slot machine 
// 5. Check if the user won
// 6. give the user their winnings
// 7. play again

/*
// function 1
 function deposit (){
    return 1
    // return the fuction that it was called
 }
     deposit()
 */
const prompt = require("prompt-sync")()

const ROWS = 3;
const COLS = 3;

// define symbols (objects)
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}


// 1. Deposit some money (hier vragen we aan de user hoeveel geld die wilt storten)

// function 2
const deposit = () => {
    while (true) { // true is is the condition of when we wanna do it ( true is looping forever)
        const depositAmount = prompt("Enter a deposit amount: "); // hier vragen we aan de user hoeveel die wilt storten
        const numberDepositAmount = parseFloat(depositAmount); // hier gaan we string naar float converteren

        // isNan = 'not a number'
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) { // hier checken we als het geen nummer is
            console.log("Invalid deposit amount, try again.")
        }
        else {
            return numberDepositAmount; //break the loop
        }

    }

}

// 2. Determine number of lines to bet on (welke lijn de user wilt gokken)
const getNumberOfLines = () => {
    while (true) { // true is is the condition of when we wanna do it ( true is looping forever)
        const lines = prompt("Enter the number of lines to bet on (1-3): "); // hier vragen we aan de user bij welke lijn ze willen gokken
        const numberOfLines = parseFloat(lines); // hier gaan we string naar float converteren

        // isNan = 'not a number'
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) { // hier checken we als het geen nummer is of groter dan 3
            console.log("Invalid number of lines, try again.")
        }
        else {
            return numberOfLines; //break the loop
        }
    }
}

// 3. Collect a bet amount

// ik voeg de balance in de parameter zodat ik balance kan gebruiken zelde met lines
const getBet = (balanc, lines) => {
    while (true) { // true is is the condition of when we wanna do it ( true is looping forever)
        const bet = prompt("Enter the bet per line: "); // hier vragen we aan de user bij welke lijn ze willen gokken
        const numberBet = parseFloat(bet); // hier gaan we string naar float converteren

        // isNan = 'not a number'
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) { // hier checken we als het geen nummer is of groter dan de balans en dan gaan we de balans verdelen met de lijnen
            console.log("Invalid bet, try again.")
        }
        else {
            return numberBet; //break the loop
        }
    }
}

// 4. spin the slot machine
const spin = () => {

    // arrays 
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { // de loop gaat door all die object van SYMBOLS_COUNT
        for (let i = 0; i < count; i++) {
            symbols.push(symbol); // insert a new element in an array
        }
    }

    const reels = []; // elk of deze arrays is gonna represtent a column inside the slotmachine
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];

        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1)// we gonna remove 1 element zodat we verder kunnen generere.
        }
    }
    return reels;
}

// van colls naar rows converteren [I I I], [I I I ] naar [I I I],
//                                                        [I I I]

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

const printRows = (rows) => { // slotmachine printen
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.lenght - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

// 5. Check if the user won
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}

// 6. give the user their winnings
// 7. play again

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance); // hier zeggen we hoeveel geld die heeft gelegt
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n)? ");

        if (playAgain != "y") break;
    }
}
game();









