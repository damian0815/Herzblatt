var candidateScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function candidateScene() {
            Phaser.Scene.call(this, { key: 'candidateScene' });

            this.HudDiagBGCon = new HudDiagBase(this);
            this.nextButtonCon = new NextButtonComponent(this);
            this.charDisplayCon = new CharDisplayComponent(this);
        },

    preload: function() {
        // this.load.image('dialogueBG', 'assets/buttons/dialogueBG.png');
        this.load.image('dialogueButton', 'assets/buttons/bar_1100.png');

        this.HudDiagBGCon.preload();
        this.nextButtonCon.preload();
        this.charDisplayCon.preload();

        this.loadDialogueAudio();

        // Background
        g_loadAllBG(this);

        this.isPlayingGibberish = false;
    },

    loadDialogueAudio: function() {
        if (CandidateSequ[CandSeqNo] === CandidatesEnum.npc) {
        } else {
            var candidate = Candidates[CandidateSequ[CandSeqNo]-1];
            var characterNo = candidate.charType;
            this.loadSingleDialogueAudio(QuestNo, characterNo);
        }

        for (var i=0; i<3; i++) {
            var key = this.getGibberishAudioKey(i);
            var filename = this.getGibberishAudioFilename(i);
            this.load.audio(key, [filename]);
        }
    },

    loadSingleDialogueAudio: function(questionNo, characterNo) {
        console.log('loading audio for answers for question ' + questionNo + ' character number ' + characterNo);
        var key = this.generateAudioKey(questionNo, characterNo);
        var file = this.generateAudioFilename(questionNo, characterNo);
        console.log(key + ' -> ' + file);
        this.load.audio(key, [file]);
    },

    generateAudioKey: function(questionNo, characterNo) {
        return 'audio_a' + questionNo.toString() + '_' + characterNo;
    },

    generateAudioFilename: function(questionNo, characterNo) {
        // 'A1_Character 1_custom winter jam.mp3'
        return 'assets/voice/A' + (questionNo+1) + '_Character ' + (characterNo+1) + "_custom winter jam.wav.mp3";
    },

    getRandomGibberishAudioKey: function() {
        return this.getGibberishAudioKey(Phaser.Math.Between(0,2));
    },

    getGibberishAudioKey: function(which) {
        return 'gibberish_' + which;
    },

    getGibberishAudioFilename: function(which) {
        return 'assets/voice/gibberish' + (which+1) + '.mp3';
    },

    create: function() {
        this.key_adv = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        g_addAllBG(this);

        console.log("CanSeq: " + CandidateSequ[CandSeqNo]);

        // this.createDialogeMain();
        this.charDisplayCon.create(true, true, true, true);
        var a = CandidateSequ[CandSeqNo] === 0;
        var b = CandidateSequ[CandSeqNo] === 1;
        var c = CandidateSequ[CandSeqNo] === 2;
        this.charDisplayCon.setSpotVisibility(a, b, c);

        if (CandidateSequ[CandSeqNo] === CandidatesEnum.npc) {
            // Create Diag
            this.HudDiagBGCon.createBig();
            this.HudDiagBGCon.setDiagText(Questions[QuestNo].question);
            this.is_pc = false;
            DiagState = DiagStateEnum.answ_npc;
            this.createDialogueNPC();
        } else {
            // Create Diag
            this.HudDiagBGCon.createSmall();
            this.HudDiagBGCon.setDiagText(Questions[QuestNo].question);
            this.is_pc = true;
            DiagState = DiagStateEnum.answ_pc;
            this.createDialoguePC();
        }
    },

    // createDialogeMain: function() {
    //     // Create Dialogue Background
    //     this.dialogueBGBox = this.add.image(0, GAME_HEIGHT, 'dialogueBG').setOrigin(0,1);
    //     this.dialogueBGBox.displayWidth = GAME_WIDTH;
    //     this.dialogueBGBox.displayHeight = 240 + 2*TEXT_Y_MARGIN;
    //     this.dialogueBGBox.visible = true;
    //
    //     // Create Dialogue Text
    //     this.dialogueText = this.add.text(this.dialogueBGBox.x + (gameWidth - textWidth)/2, this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + TEXT_Y_MARGIN, Questions[QuestNo].question, DiagTextSyle);
    //     this.dialogueText.setOrigin(0,0);
    //     this.dialogueText.visible = true;
    // },

    /*
    update: function() {
        if (Phaser.Input.Keyboard.DownDuration(this.key_adv, KEY_DOWN_DURATION)) {
            console.log("Pressed ENTER.");
            console.log("Pressed ENTER, selected diag button is: " + this.selectedDiagButton);
            if (this.selectedDiagButton == null) {
                //this.goToBachelorScene();
            } else {
                this.onPOButtonClick(this.selectedDiagButton, this);
            }
        }
    },*/

    createDialogueNPC: function() {

        // add buttons
        this.diagButtons = new Array(NO_DBUTTONS);
        this.diagButtonText = new Array(NO_DBUTTONS);
        this.diagButtonCors = new Array(NO_DBUTTONS); // Button Correspondences

        posX = Math.floor(this.HudDiagBGCon.getDiagBGx() + (GAME_WIDTH - TEXT_WIDTH)/2);
        posY = Math.floor(this.HudDiagBGCon.getDiagBGy() + DIAG_BASE_TEXT_MARGIN + 20);

        var pos_positions = [0, 1, 2, 3];

        // ger randomized button sequence
        for ( var i = 0; i < NO_DBUTTONS; i++) {
            var rand_pos = Math.floor(Math.random() * pos_positions.length);
            rand_pos = rand_pos === pos_positions.length ? pos_positions.length - 1 : rand_pos;

            var idx = pos_positions[rand_pos];
            pos_positions.splice(rand_pos, 1);

            this.diagButtonCors[i] = idx;
        }

        // createBase dialogue buttons
        for (let i = 0; i < NO_DBUTTONS; i++) {
            this.diagButtons[i] = this.add.image(posX,posY,'dialogueButton',).setOrigin(0,0).setInteractive();
            this.diagButtons[i].on('pointerdown', this.onPOButtonClick.bind(this,i,this));
            this.diagButtons[i].alpha = 0.3;
            this.diagButtonText[i] = this.add.text(posX+10, posY+10, Questions[QuestNo].getAnswer(this.diagButtonCors[i]), DiagButTextStyle);

            // set visibility
            this.diagButtons[i].visible = true;
            this.diagButtonText[i].visible = true;

            // set button correspondence

            posY += 45;
        }

// <<<<<<< HEAD
//         // this.dialogueText.visible = true;
// =======

        // this.dialogueText.visible = true;

        this.isPlayingGibberish = false;
        this.selectedDiagButton = 0;
        this.selectDiagButton(0);

        var that = this;
        this.input.keyboard.on('keydown_ENTER', function() {
            console.log("Pressed ENTER, selected diag button is: " + that.selectedDiagButton);
            that.onPOButtonClick(that.selectedDiagButton, that);
            //that.goToBachelorScene();
        });

        this.input.keyboard.on('keydown_UP', function() {
            if (that.isPlayingGibberish) {
                return;
            }
            var next = that.selectedDiagButton - 1;
            if (next >= 0) {
                that.selectDiagButton(next);
            }
        });
        this.input.keyboard.on('keydown_DOWN',function() {
            if (that.isPlayingGibberish) {
                return;
            }
            var next = that.selectedDiagButton + 1;
            if (next < NO_DBUTTONS) {
                that.selectDiagButton(next);
            }
        });



    },

    selectDiagButton: function(buttonIndex) {

        this.diagButtons[this.selectedDiagButton].setTint(0xffffff);
        this.selectedDiagButton = buttonIndex;
        this.diagButtons[this.selectedDiagButton].setTint(0xffaaaa);

// >>>>>>> master
    },

    createDialoguePC: function() {
        this.selectedDiagButton = null;

        posX = Math.floor(this.HudDiagBGCon.getDiagBGx() + (GAME_WIDTH - TEXT_WIDTH)/2);
        posY = Math.floor(this.HudDiagBGCon.getDiagBGy() + DIAG_BASE_TEXT_MARGIN + 20);

        console.log(Candidates[CandidateSequ[CandSeqNo]-1].charType);
        var char_type = Candidates[CandidateSequ[CandSeqNo]-1].charType;
        let question = Questions[QuestNo];
        console.log("Fool: " + question.getResponseFool(char_type) + " Manner: " + question.getResponseManner(char_type));

        this.diagButtons = this.add.image(posX,posY,'dialogueButton',).setOrigin(0,0);
        this.diagButtons.alpha = 0.3;
        this.diagButtonText = this.add.text(posX+10, posY+10, question.getResponse(char_type), DiagButTextStyle); // INFO(martin)! WOW IS THIS COMPLICATED
        Candidates[CandidateSequ[CandSeqNo]-1].addFM(question.getResponseFool(char_type), question.getResponseManner(char_type));


        // add buttons
        // this.nextButton = this.add.image(GAME_WIDTH - 200, this.dialogueBGBox.y - 80, 'dialogueButton').setOrigin(0,0).setInteractive();
        this.nextButtonCon.create();
        // this.dialogueBGBox.visible = true;
        // this.dialogueText.visible = true;

        var soundKey = this.generateAudioKey(QuestNo, char_type);
        console.log('playing ' + soundKey);
        var sound = this.sound.add(soundKey, {volume: 1});
        sound.play();

        // Set Button Functionality
        var that = this;
        this.nextButton.on('pointerdown', function(pointer) {
            console.log("Pressed NEXT.");
            sound.stop();
            that.goToBachelorScene();

        });
        this.input.keyboard.on('keydown_ENTER', function() {
            console.log("Pressed ENTER.");
            sound.stop();
            that.goToBachelorScene();
        });
    },

    onPOButtonClick: function(button, that) {
        if (this.isPlayingGibberish) {
            return;
        }
        var idx_ans = this.diagButtonCors[button];
        console.log('Button clicked ' + button + ' at idx ' + idx_ans);

        // TODO(martin): add player fool and manner
        console.log("Fool: " + Questions[QuestNo].getAnswerFool(idx_ans) + " Manner: " + Questions[QuestNo].getAnswerManner(idx_ans));

        // play random gibberish
        var soundKey = this.getRandomGibberishAudioKey();
        var sound = this.sound.add(soundKey, {volume: 1});
        sound.play();
        this.isPlayingGibberish = true;

        Questions[QuestNo].setAnswerSector(idx_ans);
        Player.addFM(Questions[QuestNo].getAnswerFool(idx_ans), Questions[QuestNo].getAnswerManner(idx_ans));

        console.log("AnsSector " + Questions[QuestNo].ansSector);

        this.time.delayedCall(4000, this.goToBachelorScene, [], this);
    },

    goToBachelorScene: function() {
        DiagState = DiagStateEnum.resp;
        this.scene.start('bachelorScene');
    }

});