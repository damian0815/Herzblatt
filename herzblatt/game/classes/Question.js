class Answer {
    constructor(text, manner, fool) {
        this.text = text;
        this.manner = manner;
        this.fool = fool;
    }

    get text() {
        return this._text;
    }

    get manner() {
        return this._manner;
    }

    get fool() {
        return this._fool;
    }

    set text(value) {
        this._text = value;
    }

    set manner(value) {
        this._manner = value;
    }

    set fool(value) {
        this._fool = value;
    }
}

/**
 *
 */
class Question {
    constructor(question) {
        this.question = question;
        this.answers = [4];
        this.responses = [4];
        this.answercount = 0;
        this.responsecount = 0;
    }

    /**
     * Add a new Player Answer to the question
     * @param answer
     */
    addAnswer(answer) {
        this.answers[this.answercount++] = answer;
    }

    /**
     * Add a new PC Answer to the question
     * @param response
     */
    addResponse(response) {
        this.responses[this.responsecount++] = response;
    }

    /**
     * Get the Manner of the
     * @param idx_ans
     * @returns {*}
     */
    getAnswerManner(idx_ans) {
        // check if idx is in bounds
        if (idx_ans < this.answercount)
            return this.answers[i].manner;
        else
            console.log('Requested answer index not in bounds');
    }

    getResponse(manner, fool) {

    }

    get question() {
        return this._question;
    }

    set question(value) {
        this._question = value;
    }
}

