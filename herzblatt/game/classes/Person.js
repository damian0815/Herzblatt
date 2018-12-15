
var CharTypeEnum = Object.freeze({"gFgM":0, "gFbM":1, "bFgM":2, "bFbM":3});

class Person {
    constructor(charType, isBachelor = false) {
        // Set Manner and Fool
        this.manner = 0;
        this.fool = 0;
        this.charType = charType;
        this.isBachelor = isBachelor;
    }

    set charType(value) {
        if (value > 4 || value < 0)
            console.warn("Invalid Person type.");
        this._charType = value;
    }

    get charType() {
        return this._charType;
    }

    /**
     * Adds manner and fool simultaneously
     * @param fool
     * @param manner
     */
    addFM (fool, manner) {
        this.fool += fool;
        this.manner += manner;

        console.log("New Score: " + this.fool + "=" + this.manner);
    }
}