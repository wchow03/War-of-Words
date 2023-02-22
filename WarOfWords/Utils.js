function randInt(max) {
    return Math.floor(Math.random() * (max+1));
}

function randomSign() {
    return Math.round(Math.random()) * 2 - 1;
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function replaceAll(string, char1, char2) {
    let result = "";

    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) == char1) {
            result += char2;
        } else {
            result += string.charAt(i);
        }
    }
    return result;
}
