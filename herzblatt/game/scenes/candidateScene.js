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
        this.load.image('dialogueButton', 'assets/buttons/dialogueButton.png');

        this.HudDiagBGCon.preload();
        this.nextButtonCon.preload();
        this.charDisplayCon.preload();

        // Background
        g_loadAllBG(this);
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

    update: function() {
        if (Phaser.Input.Keyboard.DownDuration(this.key_adv, KEY_DOWN_DURATION)) {
            console.log("Pressed ENTER.");
            console.log("Pressed ENTER, selected diag button is: " + this.selectedDiagButton);
            this.onPOButtonClick(this.selectedDiagButton, this);
            this.goToBachelorScene();
        }
    },

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
            this.diagButtons[i] = this.add.sprite(posX,posY,'dialogueButton',).setOrigin(0,0).setInteractive();
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

        this.selectedDiagButton = 0;
        this.selectDiagButton(0);

        var that = this;
        // this.input.keyboard.on('keydown_ENTER', function() {
        //     console.log("Pressed ENTER, selected diag button is: " + that.selectedDiagButton);
        //     that.onPOButtonClick(that.selectedDiagButton, that);
        //     that.goToBachelorScene();
        // });

        this.input.keyboard.on('keydown_UP', function() {
            var next = that.selectedDiagButton - 1;
            if (next >= 0) {
                that.selectDiagButton(next);
            }
        });
        this.input.keyboard.on('keydown_DOWN',function() {
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
        posX = Math.floor(this.HudDiagBGCon.getDiagBGx() + (GAME_WIDTH - TEXT_WIDTH)/2);
        posY = Math.floor(this.HudDiagBGCon.getDiagBGy() + DIAG_BASE_TEXT_MARGIN + 20);

        console.log(Candidates[CandidateSequ[CandSeqNo]-1].charType);
        var char_type = Candidates[CandidateSequ[CandSeqNo]-1].charType;
        console.log("Fool: " + Questions[QuestNo].getResponseFool(char_type) + " Manner: " + Questions[QuestNo].getResponseManner(char_type));

        this.diagButtons = this.add.sprite(posX,posY,'dialogueButton',).setOrigin(0,0);
        this.diagButtons.alpha = 0.3;
        this.diagButtonText = this.add.text(posX+10, posY+10, Questions[QuestNo].getResponse(char_type), DiagButTextStyle); // INFO(martin)! WOW IS THIS COMPLICATED
        Candidates[CandidateSequ[CandSeqNo]-1].addFM(Questions[QuestNo].getResponseFool(char_type), Questions[QuestNo].getResponseManner(char_type));

        // add buttons
        // this.nextButton = this.add.image(GAME_WIDTH - 200, this.dialogueBGBox.y - 80, 'dialogueButton').setOrigin(0,0).setInteractive();
        this.nextButtonCon.create();
        // this.dialogueBGBox.visible = true;
        // this.dialogueText.visible = true;

        // Set Button Functionality
        var that = this;
        this.nextButton.on('pointerdown', function(pointer) {
            console.log("Pressed NEXT.");
            that.goToBachelorScene();

        });
        this.input.keyboard.on('keydown_ENTER', function() {
            console.log("Pressed ENTER.");
            that.goToBachelorScene();
        });
    },

    onPOButtonClick: function(button, that) {
        var idx_ans = this.diagButtonCors[button];
        console.log('Button clicked ' + button + ' at idx ' + idx_ans);

        // TODO(martin): add player fool and manner
        console.log("Fool: " + Questions[QuestNo].getAnswerFool(idx_ans) + " Manner: " + Questions[QuestNo].getAnswerManner(idx_ans));

        Questions[QuestNo].setAnswerSector(idx_ans);
        Player.addFM(Questions[QuestNo].getAnswerFool(idx_ans), Questions[QuestNo].getAnswerManner(idx_ans));

        console.log("AnsSector " + Questions[QuestNo].ansSector);

        this.goToBachelorScene();
    },

    goToBachelorScene: function() {
        DiagState = DiagStateEnum.resp;
        this.scene.start('bachelorScene');
    }

});