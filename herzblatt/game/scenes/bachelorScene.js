

var bachelorScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function bachelorScene() {
            Phaser.Scene.call(this, { key: 'bachelorScene' });

            this.HudDiagBGCon = new HudDiagBase(this);
            this.nextButtonCon = new NextButtonComponent(this);
            this.charDisplayCon = new CharDisplayComponent(this);
            this.reacCon = new ReactionOverlayComponent(this);
        },

    preload: function() {
        this.load.image('dialogueBG', 'assets/buttons/dialogueBG.png');
        this.load.image('dialogueButton', 'assets/buttons/dialogueButton.png');

        // Load Diag
        this.HudDiagBGCon.preload();
        this.nextButtonCon.preload();
        this.charDisplayCon.preload();
        this.reacCon.preload();

        g_loadAllBG(this);

        this.randomizeBachelorGender();
        this.loadDialogueAudio();
    },

    loadDialogueAudio: function() {
        var key = this.getDialogueAudioKey();
        var filename = 'assets/voice/q' + (QuestNo + 1) + this.getBachelorGender() + '.wav.mp3';
        console.log('loading ' + key + ' -> ' + filename);
        this.load.audio(key, [filename]);
    },

    getDialogueAudioKey: function() {
        return 'question_' + QuestNo + '_' + this.getBachelorGender();
    },

    randomizeBachelorGender: function() {
        this.bachelorGender = ((Phaser.Math.Between(0,1) === 0) ? 'm' : 'w');
    },

    getBachelorGender: function() {
        return this.bachelorGender;
    },

    create: function() {
        this.key_adv = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Load Background
        g_addAllBG(this);

        AskedQuestions[QuestNo] = true;
        this.createDialogue();
        this.charDisplayCon.create(true, true, true, true);
        this.reacCon.preload();
    },

    createDialogue: function() {

        // Create Dialogue Background
        // this.dialogueBGBox = this.add.image(0, GAME_HEIGHT, 'dialogueBG').setOrigin(0,1);
        // this.dialogueBGBox.displayWidth = GAME_WIDTH;
        // this.dialogueBGBox.displayHeight = 40 + 2*TEXT_Y_MARGIN;
        // this.dialogueBGBox.visible = true;
        //
        // // Create Dialogue Text
        // this.dialogueText = this.add.text(this.dialogueBGBox.x + (gameWidth - textWidth)/2, this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + TEXT_Y_MARGIN, "", DiagTextSyle);
        // this.dialogueText.setOrigin(0,0);
        // this.dialogueText.visible = false;

        // Create Diag
        this.HudDiagBGCon.createBase();

        // TODO(martin): add next button here
        //this.nextButton = this.add.image(GAME_WIDTH - 200, this.dialogueBGBox.y - 80, 'dialogueButton').setOrigin(0,0).setInteractive();
        this.nextButtonCon.create();
        // this.dialogueBGBox.visible = true;

        // Load Texts depending on DiagState
        if (DiagState === DiagStateEnum.quest) {
            // this.dialogueText.setText(Questions[QuestNo].question);
            this.HudDiagBGCon.setDiagText(Questions[QuestNo].question);
            var audio = this.sound.add(this.getDialogueAudioKey());
            audio.play();
        } else if (DiagState === DiagStateEnum.resp ) {
// =======
//         this.dialogueBGBox = this.add.image(0, GAME_HEIGHT, 'dialogueBG').setOrigin(0, 1);
//         this.dialogueBGBox.displayWidth = GAME_WIDTH;
//         this.dialogueBGBox.displayHeight = 40 + 2 * TEXT_Y_MARGIN;
//         this.dialogueBGBox.visible = true;
//
//         // Create Dialogue Text
//         this.dialogueText = this.add.text(this.dialogueBGBox.x + (gameWidth - textWidth) / 2, this.dialogueBGBox.y - this.dialogueBGBox.displayHeight + TEXT_Y_MARGIN, "", DiagTextSyle);
//         this.dialogueText.setOrigin(0, 0);
//         this.dialogueText.visible = false;
//
//         // TODO(martin): add next button here
//         this.nextButton = this.add.image(GAME_WIDTH - 200, this.dialogueBGBox.y - 80, 'dialogueButton').setOrigin(0, 0).setInteractive();
//         this.dialogueBGBox.visible = true;
//
//         // Load Texts depending on DiagState
//         if (DiagState === DiagStateEnum.quest)
//             this.dialogueText.setText(Questions[QuestNo].question);
//         else if (DiagState === DiagStateEnum.resp) {
// >>>>>>> master

            // Let Bachelor react
            var rand_react = 0;// use random reaction
            switch (this.bachReaction()) {
                case 1:
                    // this.dialogueText.setText("I do love that as well.");
                    this.reacCon.showPositiveReaction();
                    break;
                case 0:
                    // this.dialogueText.setText("Well whatever.");
                    this.reacCon.showNeutralReaction();
                    break;
                case -1:
                    // this.dialogueText.setText("That .... seems weird.");
                    this.reacCon.showNegativeReaction();
                    break;
                default:
                    // this.dialogueText.setText("I do not know what to respond to that.");
                    this.HudDiagBGCon.setDiagText("I do not know what to respond to that.");
                    break;

            }

            CandSeqNo++;
        }




        // Set Button Functionality
        var that = this;
        this.nextButton.on('pointerdown', function (pointer) {
            console.log("Pressed NEXT.");

// <<<<<<< HEAD
//             if (CandSeqNo >= CandidateSequ.length){
//                 if (NoAskedQuestions >= NO_TOTQUEST) {
//                     //TODO(martin) endgamescene;
//                     console.log('END Dialogue');
//                     that.scene.start('revealDecisionScene');
//                 }
//                 else
//                     that.loadNextQuestion();
//             }
//             else
//                 that.scene.start('candidateScene');
// =======
            that.nextButtonPressed();
        });
//
//         this.input.keyboard.on('keyjustdown_ENTER', function() {
//             console.log("Pressed ENTER.");
//             that.nextButtonPressed();
// // >>>>>>> master
//         });

        // this.input.keyboard.justDown('key_ENTER', function() {
        //     console.log("Pressed ENTER2.");
            // that.nextButtonPressed();
// >>>>>>> master
//         });

    },

    update: function (){
        // console.log(Phaser.Input.Keyboard.DownDuration(this.key_adv, 15));
        // if(Phaser.Input.Keyboard.JustDown(this.key_adv)){
        if (Phaser.Input.Keyboard.DownDuration(this.key_adv, KEY_DOWN_DURATION)) {
            console.log("Pressed ENTER.");
            this.nextButtonPressed();
        }
    },

    nextButtonPressed: function() {
        if (CandSeqNo >= CandidateSequ.length){
            if (NoAskedQuestions >= NO_TOTQUEST) {
                    //TODO(martin) endgamescene;
                    console.log('END Dialogue');
                    this.scene.start('revealDecisionScene');
            }
            else
                this.loadNextQuestion();
        }
        else
            this.scene.start('candidateScene');
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