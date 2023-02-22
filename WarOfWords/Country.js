class Country {
    constructor(name, ciphers) {
        this.name = name;
        this.ciphers = ciphers;
    }
    cipher(funcIndex, ...args) {
        return this.ciphers[funcIndex].cipherAlgorithm(...args);
    }
    getName() {
        return this.name;
    }
    getFuncs() {
        return this.ciphers;
    }
    getFuncsLength() {
        return this.ciphers.length;
    }
}
