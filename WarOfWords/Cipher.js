class Cipher {
    constructor(name, description, example, func) {
        this.name = name;
        this.description = description;
        this.example = example;
        this.func = func;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getExample() {
        return this.example;
    }
    cipherAlgorithm(...args) {
        return this.func(...args);
    }
}
