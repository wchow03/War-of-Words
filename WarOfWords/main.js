const healthBar = document.querySelector(".health-bar");
const percentage = document.querySelector(".percentage");
const mainContent = document.querySelector(".main-content");
const clock = document.querySelector(".time");
let userInput = document.querySelector("text-field");
let slides = [document.querySelector(".first-slide"),
document.querySelector(".second-slide"),
document.querySelector(".third-slide"),
document.querySelector(".fourth-slide"),
document.querySelector(".fifth-slide")];
document.querySelector("text-field");
let input = "";

let health = 100;
let timer = 30;
let loops = 0;

let countryIndex = 0;
let decrypt = "";
let word = "";

let gameQuit = false;
let gameOver = false;

let timerInterval = null;

let countries = [
    new Country("USA", [shiftRightCipher, randomLettersCipher]),
    new Country("United Kingdom", [shiftLeftCipher, invertPhraseCipher]),
    new Country("Soviet Union", [caesarCipher, invertWordsCipher]),
    new Country("China", [caesarCipher, randomLettersCipher]),
    new Country("France", [caesarCipherEven, caesarCipherOdd]),
];

function initSlides() {
    let country = 0;
    for (let i = 0; i < 5; i++) {
        let firstName = countries[i].getFuncs()[0].getName();
        let secondName = countries[i].getFuncs()[1].getName();
        let firstDesc = countries[i].getFuncs()[0].getDescription();
        let firstExample = countries[i].getFuncs()[0].getExample();
        let secondDesc = countries[i].getFuncs()[1].getDescription();
        let secondExample = countries[i].getFuncs()[1].getExample();
        slides[i].querySelector("p").innerHTML = "<u>"+ firstName +"</u>: <br>" + firstExample +"</u> <br><span class=\"small-description\">" + firstDesc + "</span><br><br>" + "<u>" + secondName + "</u>: <br>" + secondExample + "</u> <br><span class=\"small-description\">" + secondDesc + "</span>";
    }
}

function updateTimer() {
    timer -= 1;
    //console.log(timer);
    if (!gameOver && timer <= 0) {
        printTerminal("Times up!");
        health = 0;
        changeHealthBar();
        afterInput();
        clearInterval(timerInterval);
    }
    clock.textContent = timer;
}

timerInterval = setInterval(updateTimer, 1000);

function printToTerminal(text) {
    if (event.key === 'Enter') {
        let span = document.createElement('span');
        span.className = "terminal-text-user";
        span.innerHTML = "&nbsp;>&nbsp;" + text.value;
        mainContent.append(span);
        let tempText = text.value;
        text.value = "";
        mainContent.scrollTop = mainContent.scrollHeight;
        return tempText;
    }
}

function printTerminal(text) {
    let span = document.createElement('span');
    span.className = "terminal-text-user";
    span.innerHTML = "&nbsp;" + text;
    mainContent.append(span);
    mainContent.scrollTop = mainContent.scrollHeight;
}

function changeHealthBar() {
    if (health >= 0) {
        healthBar.style.width = health + '%';
        percentage.innerHTML = health + '%';
    }
}

function incomingMessage(word) {
    let cipherIndex = randInt(countries[countryIndex].getFuncsLength()-1);

    printTerminal("Incoming message from " + countries[countryIndex].getName());
    printTerminal("> " + countries[countryIndex].cipher(cipherIndex, word));
    // printTerminal("List of known ciphers " + countries[countryIndex].getName() + " employs:");
    // for (let i = 0; i < countries[countryIndex].getFuncsLength(); i++) {
    //     printTerminal("\200");
    //     printTerminal("&emsp;- " + countries[countryIndex].getFuncs()[i].getName());
    //     printTerminal(countries[countryIndex].getFuncs()[i].getDescription());
    //     //printTerminal("\200");
    //     printTerminal("&emsp;&emsp;Example:");
    //     //printTerminal("\200");
    //     printTerminal("&emsp;&emsp;&emsp;" + countries[countryIndex].getFuncs()[i].getExample());
    // }

    printTerminal("Decrypt the message ('q' to quit):");
}

function game() {
    //printTerminal("You play as a decryption intelligence officer during WWI.\n");
    word = wordList[randInt(wordList.length-1)].toLowerCase();
    countryIndex = randInt(countries.length-1);
    incomingMessage(word);
}

function userInputFunction(text) {
    if (event.key === 'Enter') {
        decrypt = printToTerminal(text);
        if (gameOver) return;
        if (decrypt == "q" || decrypt == "quit" || decrypt == "exit") {
            gameQuit = true;
            afterInput();
            return;
        } else if (decrypt == word) {
            printTerminal("Correctly decrypted!");
            timer += 15 + countryIndex;
        } else {
            printTerminal("Incorrect! The message was: " + word);
            health -= randInt(20)+25;
            health = Math.max(health, 0);
            changeHealthBar();
        }
        afterInput();
        return;
    }
}

function afterInput() {
    printTerminal("<br>");
    printTerminal("<br>");
    printTerminal("<br>");
    printTerminal("<br>");
    if (gameQuit || health <= 0 || timer <= 0) {
        printTerminal("You survived " + loops + " decryptions!");
        gameOver = true;
        clearInterval(timerInterval);
        return;
    }
    loops++;
    game();
}

changeHealthBar();
initSlides();
game();
