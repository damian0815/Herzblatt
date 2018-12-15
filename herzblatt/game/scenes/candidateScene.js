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
            this.is_pc = false;
            DiagState = DiagStateEnum.answ_npc;
            this.createDialogueNPC();
        } else {
            this.is_pc = true;
            DiagState = DiagStateEnum.answ_pc;
            this.createDialoguePC();
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

    createDialogueNPC: function() {
        
        // add buttons
        this.diagButtons = new Array(NO_DBUTTONS);
        this.diagButtonText = new Array(NO_DBUTTONS);
        this.diagButtonCors = new Array(NO_DBUTTONS); // Button Correspondences

        posX = Math.floor(this.dialogueBGBox.x + (GAME_WIDTH - TEXT_WIDTH)/2);
        posY = Math.floor(this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + 50);

        var pos_positions = [0, 1, 2, 3];

        // ger randomized button sequence
        for ( var i = 0; i < NO_DBUTTONS; i++) {
            var rand_pos = Math.floor(Math.random() * pos_positions.length);
            rand_pos = rand_pos === pos_positions.length ? pos_positions.length - 1 : rand_pos;

            var idx = pos_positions[rand_pos];
            pos_positions.splice(idx, 1);

            this.diagButtonCors[i] = idx;
        }

        // create dialogue buttons
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

        this.dialogueText.visible = true;
    },

    createDialoguePC: function() {
        posX = Math.floor(this.dialogueBGBox.x + (GAME_WIDTH - TEXT_WIDTH)/2);
        posY = Math.floor(this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + 50);

        this.diagButtons = this.add.sprite(posX,posY,'dialogueButton',).setOrigin(0,0);
        this.diagButtons.alpha = 0.3;
        this.diagButtonText = this.add.text(posX+10, posY+10, Questions[QuestNo].getResponse(Candidates[CandidateSequ[CandSeqNo]-1].charType), DiagButTextStyle); // INFO(martin)! WOW IS THIS COMPLICATED

        // add buttons
        this.nextButton = this.add.image(GAME_WIDTH - 200, this.dialogueBGBox.y - 80, 'dialogueButton').setOrigin(0,0).setInteractive();
        this.dialogueBGBox.visible = true;
        this.dialogueText.visible = true;

        // Set Button Functionality
        var that = this;
        this.nextButton.on('pointerdown', function(pointer) {
            console.log("Pressed NEXT.");
            DiagState = DiagStateEnum.resp;
            that.scene.start('bachelorScene');
        });
    },

    onPOButtonClick: function(button, that) {
        console.log('Button clicked ' + button );

        // TODO(martin): add player fool and manner
        console.log("Fool: " + Questions[QuestNo].getAnswerFool(this.diagButtonCors[button]) + " Manner: " + Questions[QuestNo].getAnswerManner(this.diagButtonCors[button]));

        DiagState = DiagStateEnum.resp;
        that.scene.start('bachelorScene');
    },



});