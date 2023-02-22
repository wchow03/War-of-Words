let shift = randInt(3)+1;
let negate = randomSign();

function caesarAll(str) {
    // Lowercase first
    str = str.toLowerCase();

    let result = "";
    let charCode = 0;

    // Add to every character
    for (let i = 0; i < str.length; i++) {
        // Get the character code for the current character
        charCode = str.charCodeAt(i);

        if (charCode >= 97 && charCode <= 122) {
            charCode = mod((charCode - 97 - shift*negate), 26) + 97;
        }

        result += String.fromCharCode(charCode);
    }

    return result;
}

let shiftOdd = randInt(3)+1;
let negateOdd = randomSign();

function caesarOdd(str) {
    // Lowercase first
    str = str.toLowerCase();

    let result = "";
    let charCode = 0;

    // Add to every character
    for (let i = 0; i < str.length; i++) {
        // Get the character code for the current character
        charCode = str.charCodeAt(i);

        if (i % 2 == 0 && charCode >= 97 && charCode <= 122) {
            charCode = mod((charCode - 97 - shiftOdd*negateOdd), 26) + 97;
        }

        result += String.fromCharCode(charCode);
    }

    return result;
}

let shiftEven = randInt(3)+1;
let negateEven = randomSign();

function caesarEven(str) {
    // Lowercase first
    str = str.toLowerCase();

    let result = "";
    let charCode = 0;

    // Add to every character
    for (let i = 0; i < str.length; i++) {
        // Get the character code for the current character
        charCode = str.charCodeAt(i);

        if (i % 2 == 1 && charCode >= 97 && charCode <= 122) {
            charCode = mod((charCode - 97 - shiftEven*negateEven), 26) + 97;
        }

    result += String.fromCharCode(charCode);
    }

    return result;
}

let shiftRightShift = randInt(4)+1;

function shiftRight(str) {
    // Lowercase first
    str = str.toLowerCase();

    let wordList = str.split(" ");
    let result = [];

    for (let i = 0; i < wordList.length; i++) {
        let length = wordList[i].length;
        result.push(wordList[i].slice(length - shiftRightShift, length) + wordList[i].slice(0, length - shiftRightShift));
    }

    return result.join(" ");
}

let shiftLeftShift = randInt(4)+1;

function shiftLeft(str) {
    // Lowercase first
    str = str.toLowerCase();

    let wordList = str.split(" ");
    let result = [];

    for (let i = 0; i < wordList.length; i++) {
      result.push(wordList[i].slice(shiftLeftShift) + wordList[i].slice(0, shiftLeftShift));
    }

    return result.join(" ");
}

function invertPhrase(str) {
    // Lowercase first
    str = str.toLowerCase();

    // Let result be an empty string
    let result = "";

    // Insert char in reverse order into result
    for (let i = str.length-1; i >= 0; i--) {
        result += str.charAt(i);
    }

    return result;
}

function invertWords(str) {
    // Lowercase first
    str = str.toLowerCase();

    let wordList = str.split(" ");
    let result = [];

    for (let i = 0; i < wordList.length; i++) {
      result.push(wordList[i].split("").reverse().join(""));
    }

    return result.join(" ");
}

function randomLetters(str) {
    // Lowercase first
    str = str.toLowerCase();

    // Select letter from random index
    let randomLetter1 = str.charAt(Math.floor(Math.random() * str.length));

    // Select random letter from alphabet (excluding chosen letter)
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let randomLetter2 = alphabet.charAt(Math.floor(Math.random() * 26));
    while (randomLetter1 == randomLetter2) {
        randomLetter2 = alphabet.charAt(Math.floor(Math.random() * 26));
    }

    // Make replacements then return
    return replaceAll(str, randomLetter1, randomLetter2);
}

let caesarCipher = new Cipher("Caesar Cipher with a " + (negate == 1 ? "right" : "left") + " shift of " + shift,
                              "Shifts the alphabet left or right by some amount",
                              "Example left shift of 2: ABCD... → YZAB...",
                              caesarAll);

let caesarCipherOdd = new Cipher("Odd Character Caesar Cipher with a " + (negateOdd == 1 ? "right" : "left") + " shift of " + shiftOdd,
                              "Shifts odd letters of the word left or right alphabetically by some amount",
                              "Example left shift of 2: ABCD... → YBAD...",
                              caesarOdd);

let caesarCipherEven = new Cipher("Even Character Caesar Cipher with a " + (negateEven == 1 ? "right" : "left") + " shift of " + shiftEven,
                              "Shifts even letters of the word left or right alphabetically by some amount",
                              "Example left shift of 2: ABCD... → AZCB...",
                              caesarEven);

let shiftRightCipher = new Cipher("Shift Right Cipher by " + shiftRightShift,
                              "Shifts the characters of the word right by some amount",
                              "Example shift right by 2: ABCDEFG → FGABCDE",
                              shiftRight);

let shiftLeftCipher = new Cipher("Shift Left Cipher by " + shiftLeftShift,
                              "Shifts the characters of the word left by some amount",
                              "Example shift left by 2: ABCDEFG → CDEFGAB",
                              shiftLeft);

let invertPhraseCipher = new Cipher("Invert Phrase Cipher",
                              "Inverts/reverses the whole phrase",
                              "ABCD EFG → GFE DCBA",
                              invertPhrase);

let invertWordsCipher = new Cipher("Invert Words Cipher",
                              "Inverts/reverses the phrase word by word",
                              "ABCD EFG → DCBA GFE",
                              invertWords);

let randomLettersCipher = new Cipher("Random Letter Cipher",
                              "Replaces all occurrences of a certain letter with some other letter",
                              "Example replacing O with E: BONJOUR → BENJEUR",
                              randomLetters);
