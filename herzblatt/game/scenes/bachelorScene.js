

var bachelorScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function bachelorScene() {
            Phaser.Scene.call(this, { key: 'bachelorScene' });
        },

    preload: function() {
        this.load.image('dialogueBG', 'assets/buttons/dialogueBG.png');
        this.load.image('dialogueButton', 'assets/buttons/dialogueButton.png');
    },

    create: function() {
        AskedQuestions[QuestNo] = true;
        this.createDialogue();


    },

    createDialogue: function() {
        // Create Dialogue Background
        this.dialogueBGBox = this.add.image(0, GAME_HEIGHT, 'dialogueBG').setOrigin(0,1);
        this.dialogueBGBox.displayWidth = GAME_WIDTH;
        this.dialogueBGBox.displayHeight = 40 + 2*TEXT_Y_MARGIN;
        this.dialogueBGBox.visible = true;

        // Create Dialogue Text
        this.dialogueText = this.add.text(this.dialogueBGBox.x + (gameWidth - textWidth)/2, this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + TEXT_Y_MARGIN, "", DiagTextSyle);
        this.dialogueText.setOrigin(0,0);
        this.dialogueText.visible = false;

        // TODO(martin): add next button here
        this.nextButton = this.add.image(GAME_WIDTH - 200, this.dialogueBGBox.y - 80, 'dialogueButton').setOrigin(0,0).setInteractive();
        this.dialogueBGBox.visible = true;

        // Load Texts depending on DiagState
        if (DiagState === DiagStateEnum.quest)
            this.dialogueText.setText(Questions[QuestNo].question);
        else if (DiagState === DiagStateEnum.resp ) {
            CandSeqNo++;

            // TODO(martin): reaction of bachelor here
            this.dialogueText.setText("Well whatever.");

            if (CandSeqNo >= CandidateSequ.length){
                if (AskedQuestions >= NO_TOTQUEST)
                    //TODO(martin) endgamescene;
                    log('END');
                else
                    this.loadNextQuestion();
            }
        }

        this.dialogueText.visible = true;

        // Set Button Functionality
        var that = this;
        this.nextButton.on('pointerdown', function(pointer) {
            console.log("Pressed NEXT.");
            that.scene.start('candidateScene');
        });
    },

    loadNextQuestion: function() {
        var end = false;
        var newQuestNo = -1;
        while(!end) {
            newQuestNo = Math.floor(Math.random() * NO_QUESTIONS);
            newQuestNo = newQuestNo === NO_QUESTIONS ? NO_QUESTIONS-1 : newQuestNo;

            if (!AskedQuestions[newQuestNo])
                end = true;
        }

        QuestNo = newQuestNo;
        NoAskedQuestions++;
        DiagState = DiagStateEnum.quest;
        console.log("Next Question: " + QuestNo);

        this.reinitCandSequence();

        var that = this;
        that.scene.start('bachelorScene');
    },

    reinitCandSequence: function () {
        var sequ_npc = Math.floor(Math.random() * 3); // random value between 1 and 4
        sequ_npc = sequ_npc === 3 ? 2 : sequ_npc; // correct the  possibility of getting 0
        var sequ_pc1 = Math.round(Math.random());
        var sequ_pc2 = 1 - sequ_pc1;
        switch (sequ_npc) {
            case 0:
                sequ_pc1 += 1;
                sequ_pc2 += 1;
                break;
            case 1:
                if (sequ_pc1 === 0)
                    sequ_pc2 += 1;
                else
                    sequ_pc1 += 1;
                break;
            default:
                break;
        }

        CandidateSequ[sequ_npc] = CandidatesEnum.npc;
        CandidateSequ[sequ_pc1] = CandidatesEnum.pc1;
        CandidateSequ[sequ_pc2] = CandidatesEnum.pc2;
        CandSeqNo = 0;

        console.log(CandidateSequ);
    }

});