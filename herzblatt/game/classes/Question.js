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

    getAnsSector() {
        if (this.fool > 0)
            return this.manner > 0 ? CharTypeEnum.gFgM : CharTypeEnum.gFbM;
        else
            return this.manner > 0 ? CharTypeEnum.bFgM : CharTypeEnum.bFbM;
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
        this.ansSector = 0;
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
    addResponse(response, idx_resp) {
        if (idx_resp < 0 || idx_resp > this.responses.length)
            console.error("Response Index out of Bounds.");

        this.responsecount++;
        this.responses[idx_resp] = response;
    }

    /**
     * Get the Manner of the
     * @param idx_ans
     * @returns {*}
     */
    getAnswerManner(idx_ans) {
        // check if idx is in bounds
        if (idx_ans < this.answercount)
            return this.answers[idx_ans].manner;
        else
            console.error('Requested answer index not in bounds');
    }

    getAnswerFool(idx_ans) {
        // check if idx is in bounds
        if (idx_ans < this.answercount)
            return this.answers[idx_ans].fool;
        else
            console.error('Requested answer index not in bounds');
    }

    getAnswer(idx_ans) {
        // check if idx is in bounds
        if (idx_ans < this.answercount) {
            return this.answers[idx_ans].text;
        }
        else
            console.error('Requested answer index not in bounds');
    }

    getResponse(idx_resp) {
        if (idx_resp < 0 || idx_resp > this.responses)
            console.error("Response Index out of Bounds.");

        this.ansSector = idx_resp;
        return this.responses[idx_resp].text;
    }

    getResponseManner(idx_ans) {
        // check if idx is in bounds
        if (idx_ans < this.responsecount)
            return this.responses[idx_ans].manner;
        else
            console.error('Requested answer index not in bounds');
    }

    getResponseFool(idx_ans) {
        // check if idx is in bounds
        if (idx_ans < this.responsecount)
            return this.responses[idx_ans].fool;
        else
            console.error('Requested answer index not in bounds');
    }

    get question() {
        return this._question;
    }

    set question(value) {
        this._question = value;
    }

    get ansSector() {
        return this._ansSector;
    }

    set ansSector(value) {
        this._ansSector = value;
    }

    setAnswerSector(idx_ans) {
        this.ansSector = this.answers[idx_ans].getAnsSector();
    }
}

