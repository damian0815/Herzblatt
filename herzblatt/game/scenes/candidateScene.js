var candidateScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function candidateScene() {
            Phaser.Scene.call(this, { key: 'candidateScene' });
        },

    preload: function() {
        this.load.image('dialogueBG', 'assets/buttons/dialogueBG.png');
        this.load.image('dialogueButton', 'assets/buttons/dialogueButton.png');
    },

    create: function() {
        this.createDialogeMain();

        if (CandidateSequ[CandSeqNo] === CandidatesEnum.npc) {
            this.is_pc = true;
            DiagState = DiagStateEnum.answ_pc;
            this.createDialoguePC();
        } else {
            this.is_pc = false;
            DiagState = DiagStateEnum.answ_npc;
            this.createDialogueNPC();
        }
    },

    createDialogeMain: function() {
        // Create Dialogue Background
        this.dialogueBGBox = this.add.image(0, GAME_HEIGHT, 'dialogueBG').setOrigin(0,1);
        this.dialogueBGBox.displayWidth = GAME_WIDTH;
        this.dialogueBGBox.displayHeight = 240 + 2*TEXT_Y_MARGIN;
        this.dialogueBGBox.visible = true;

        // Create Dialogue Text
        this.dialogueText = this.add.text(this.dialogueBGBox.x + (gameWidth - textWidth)/2, this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + TEXT_Y_MARGIN, Questions[QuestNo].question, DiagTextSyle);
        this.dialogueText.setOrigin(0,0);
        this.dialogueText.visible = true;
    },

    createDialoguePC: function() {


        // add buttons
        this.diagButtons = new Array(NO_DBUTTONS);
        this.diagButtonText = new Array(NO_DBUTTONS);

        posX = Math.floor(this.dialogueBGBox.x + (GAME_WIDTH - TEXT_WIDTH)/2);
        posY = Math.floor(this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + 50);
        // create dialogue buttons
        possibleAnswers = 2;
        for ( var i = 0; i < NO_DBUTTONS; i++){

            // TODO(martin): randomize buttons

            this.diagButtons[i] = this.add.sprite(posX,posY,'dialogueButton',).setOrigin(0,0).setInteractive();
            this.diagButtons[i].on('pointerdown', this.onPOButtonClick.bind(this,i,this));
            this.diagButtons[i].alpha = 0.3;
            this.diagButtonText[i] = this.add.text(posX+10, posY+10, Questions[0].getAnswer(i), diaButStyle);

            // set visibility
            this.diagButtons[i].visible = true;
            this.diagButtonText[i].visible = true;

            this.selectedDiagButton = 0;

            posY += 45;
        }
        this.dialogueText.visible = true;

        var that = this;
        this.input.keyboard.on('keydown_ENTER', function() {
            console.log("Pressed ENTER.");
            that.onPOButtonClick(that.diagButtons[that.selectedDiagButton], that.selectedDiagButton);
            that.goToBachelorScene();
        });

    },

    createDialogueNPC: function() {
        posX = Math.floor(this.dialogueBGBox.x + (GAME_WIDTH - TEXT_WIDTH)/2);
        posY = Math.floor(this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + 50);

        console.log(CandSeqNo);
        console.log(Candidates);

        this.diagButtons = this.add.sprite(posX,posY,'dialogueButton',).setOrigin(0,0);
        this.diagButtons.alpha = 0.3;
        this.diagButtonText = this.add.text(posX+10, posY+10, Questions[0].getResponse(Candidates[CandidateSequ[CandSeqNo]-1].charType), diaButStyle); // INFO(martin)! WOW IS THIS COMPLICATED

        // add buttons
        this.nextButton = this.add.image(GAME_WIDTH - 200, this.dialogueBGBox.y - 80, 'dialogueButton').setOrigin(0,0).setInteractive();
        this.dialogueBGBox.visible = true;

        this.dialogueText.visible = true;

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
        console.log('Button clicked ' + button );

        // TODO(martin): add player fool and manner

        this.goToBachelorScene();
    },

    goToBachelorScene: function() {
        DiagState = DiagStateEnum.resp;
        this.scene.start('bachelorScene');
    }

});