

var bachelorScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function bachelorScene() {
            Phaser.Scene.call(this, { key: 'bachelorScene' });

            this.nextButtonCon = new NextButtonComponent(this);
        },

    preload: function() {
        this.load.image('dialogueBG', 'assets/buttons/dialogueBG.png');
        this.load.image('dialogueButton', 'assets/buttons/dialogueButton.png');

        this.nextButtonCon.preload();

        g_loadAllBG(this);
    },

    create: function() {
        // Load Background
        g_addAllBG(this);

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
        //this.nextButton = this.add.image(GAME_WIDTH - 200, this.dialogueBGBox.y - 80, 'dialogueButton').setOrigin(0,0).setInteractive();
        this.nextButtonCon.create();
        this.dialogueBGBox.visible = true;

        // Load Texts depending on DiagState
        if (DiagState === DiagStateEnum.quest)
            this.dialogueText.setText(Questions[QuestNo].question);
        else if (DiagState === DiagStateEnum.resp ) {

            // Let Bachelor react
            var rand_react = 0;// use random reaction
            switch (this.bachReaction()) {
                case 1:
                    this.dialogueText.setText("I do love that as well.");
                    break;
                case 0:
                    this.dialogueText.setText("Well whatever.");
                    break;
                case -1:
                    this.dialogueText.setText("That .... seems weird.");
                    break;
                default:
                    this.dialogueText.setText("I do not know what to respond to that.");
                    break;

            }

            CandSeqNo++;
        }

        this.dialogueText.visible = true;

        // Set Button Functionality
        var that = this;
        this.nextButton.on('pointerdown', function(pointer) {
            console.log("Pressed NEXT.");

            if (CandSeqNo >= CandidateSequ.length){
                if (AskedQuestions >= NO_TOTQUEST)
                //TODO(martin) endgamescene;
                    log('END');
                else
                    that.loadNextQuestion();
            }
            else
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
    },

    /**
     * Calculates the reaction of the bachelor
     * @returns {number} 1=positive, 0=medium, -1=negative
     */
    bachReaction: function() {

        // Convert to Gray Code for easier Computation
        var cand_sect = Questions[QuestNo].ansSector;
        var bach_sect = Bachelor.charType;

        console.log("Sectors: " + bach_sect + " vs " + cand_sect);

        if (cand_sect === bach_sect)
            return 1;
        else {
            var cand_sect_gray = cand_sect;
            var bach_sect_gray = bach_sect;
            if (cand_sect_gray >= 2){
                cand_sect_gray = cand_sect === 2 ? 3 : 2;
            }
            if (bach_sect_gray >= 2) {
                bach_sect_gray = bach_sect === 2 ? 3 : 2;
            }

            console.log("Sectors Gray: " + bach_sect_gray + " vs " + cand_sect_gray);

            if (cand_sect_gray + bach_sect_gray === 3)
                return -1;
            else
                return 0;
        }


    }

});