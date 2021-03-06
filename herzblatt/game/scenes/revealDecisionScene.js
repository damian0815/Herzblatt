
var timedEvent_button;
var timedEvent_diag;

var revealDecisionScene = new Phaser.Class({

    Extends: Phaser.Scene,

    kXPositions: [ 600, 800, 1000 ],
    kYPositions: [ 590 ],

    initialize:

        function revealDecisionScene ()
        {
            Phaser.Scene.call(this, { key: 'revealDecisionScene' });

            this.HudDiagBGCon = new HudDiagBase(this);
            this.nextButtonCon = new NextButtonComponent(this);
            this.charDisplayCon = new CharDisplayComponent(this);

            this.allowed_next = false;
            this.said_next = true;
        },

    preload: function ()
    {
        g_loadAllBG(this);

        this.HudDiagBGCon.preload();
        this.nextButtonCon.preload();
        this.charDisplayCon.preload();

        this.load.audio('drumroll', 'assets/sound/drumroll.mp3');

        this.load.image('smallFlame', 'assets/pics/flame/SmallFlame2.png');
        this.load.image('mediumFlame', 'assets/pics/flame/MediumFlame2.png');
        this.load.image('largeFlame', 'assets/pics/flame/LargeFlame.png');
    },

    create: function ()
    {
        // Load Background
        g_addAllBG(this);

        // Create Diag
        this.HudDiagBGCon.createBig();
        this.nextButtonCon.create();
        this.charDisplayCon.create(true, true, true, true);

        this.flames = new Array(3);
        this.flames[0] = new Array(3);
        this.flames[1] = new Array(3);
        this.flames[2] = new Array(3);
        this.flames[0][0] = this.add.image(this.kXPositions[0], this.kYPositions[0], 'smallFlame').setOrigin(0.5,1);
        this.flames[0][1] = this.add.image(this.kXPositions[1], this.kYPositions[0], 'smallFlame').setOrigin(0.5,1);
        this.flames[0][2] = this.add.image(this.kXPositions[2], this.kYPositions[0], 'smallFlame').setOrigin(0.5,1);
        this.flames[1][0] = this.add.image(this.kXPositions[0], this.kYPositions[0], 'mediumFlame').setOrigin(0.5,1);
        this.flames[1][1] = this.add.image(this.kXPositions[1], this.kYPositions[0], 'mediumFlame').setOrigin(0.5,1);
        this.flames[1][2] = this.add.image(this.kXPositions[2], this.kYPositions[0], 'mediumFlame').setOrigin(0.5,1);
        this.flames[2][0] = this.add.image(this.kXPositions[0], this.kYPositions[0], 'largeFlame').setOrigin(0.5,1);
        this.flames[2][1] = this.add.image(this.kXPositions[1], this.kYPositions[0], 'largeFlame').setOrigin(0.5,1);
        this.flames[2][2] = this.add.image(this.kXPositions[2], this.kYPositions[0], 'largeFlame').setOrigin(0.5,1);
        this.flames[0][0].visible = false;
        this.flames[0][1].visible = false;
        this.flames[0][2].visible = false;
        this.flames[1][0].visible = false;
        this.flames[1][1].visible = false;
        this.flames[1][2].visible = false;
        this.flames[2][0].visible = false;
        this.flames[2][1].visible = false;
        this.flames[2][2].visible = false;


        var that = this;
        this.nextButton.on('pointerdown', function(pointer) {
            console.log("Pressed NEXT.");

            that.nextButton.visible = false;
            that.nextButtonText.visible = false;
            that.HudDiagBGCon.setDiagText("And I choose ...");
            that.timedEvent_diag = that.time.addEvent( {delay: 9000, repeat: 0} );
            that.bg_timer = that.time.addEvent( {delay: 9000, repeat: 0} );
            that.said_next = false;

            if (!this.drumrollSound) {
                this.drumrollSound = that.sound.add('drumroll');
                this.drumrollSound.play();
            }
        });

        this.nextButton.visible = false;
        this.nextButtonText.visible = false;

        this.winner = this.calculateWinner();
        console.log("Winner: " + this.winner);

        this.HudDiagBGCon.setDiagText("Oh... what? Wait... candidates... Right. It's time for a decision. \n" +
            "Will you pick Candidate 1, the boring idiot whose answers I can't even remember?\n" +
            "Or Candidate 2, someone who probably also said something?\n" +
            "Or should it be... wait, there were three of them?\n" +
            "Erm... Now it's time for you to choose.");

        // this.add.sprite(640, 360, 'rdbg');
        // this.add.text(100, 100, 'revealDecisionBG.jpg\n\nBig dramatic reveal of the decision...');
        g_loadClick(this);
        this.timedEvent_button = this.time.addEvent( {delay: 5000, repeat: 0} );
        this.bg_timer = this.time.addEvent( {delay: 10, repeat: 0} );
    },

    update: function() {
        if (!this.allowed_next && this.timedEvent_button.getProgress() === 1.0) {
            this.onAllowNext();
            this.allowed_next = true;
        }

        if (!this.said_next && this.timedEvent_diag.getProgress() === 1.0) {
            this.revealDecision();
            this.said_next = true;
        }

        if (this.bg_timer.getElapsed() > 2000 && this.bg_timer.getProgress() !== 1.0) {
            if (this.bg_timer.getElapsed() < 4000)
                this.displayFlames(0);
            else if (this.bg_timer.getElapsed() < 6000)
                this.displayFlames(1);
            else if (this.bg_timer.getElapsed() < 8000)
                this.displayFlames(2);
        }
    },

    displayFlames: function(idx) {
        this.flames[0][0].visible = false;
        this.flames[0][1].visible = false;
        this.flames[0][2].visible = false;
        this.flames[1][0].visible = false;
        this.flames[1][1].visible = false;
        this.flames[1][2].visible = false;
        this.flames[2][0].visible = false;
        this.flames[2][1].visible = false;
        this.flames[2][2].visible = false;

        this.flames[idx][0].visible = true;
        this.flames[idx][1].visible = true;
        this.flames[idx][2].visible = true;

        this.flames[idx][this.winner].visible = false;
    },

    onAllowNext: function() {
        this.nextButton.visible = true;
        this.nextButtonText.visible = true;
    },

    revealDecision: function() {
        this.HudDiagBGCon.setDiagText("And I choose ...\n" + "Candidate " + (this.winner + 1));
        this.nextButton.visible = true;
        this.nextButtonText.visible = true;

        var that = this;
        this.nextButton.on('pointerdown', function(pointer) {
            console.log("Pressed NEXT.");

            var nextScene = '';
            if (that.winner === g_gameState.characterIndex)
                nextScene = 'revealBachelorScene';
            else
                nextScene = 'youLostScene';

            // TODO(martin): change back
            that.scene.start(nextScene);
            // that.scene.start('revealBachelorScene');
        });
    },

    calculateWinner: function() {
        var player_fm = Player.getFM();
        var bachelor_fm = Bachelor.getFM();
        var c1_fm = Candidates[0].getFM();
        var c2_fm = Candidates[1].getFM();

        // calc differences
        var bp = [bachelor_fm[0] - player_fm[0], bachelor_fm[1] - player_fm[1]];
        var bc1 = [bachelor_fm[0] - c1_fm[0], bachelor_fm[1] - c1_fm[1]];
        var bc2 = [bachelor_fm[0] - c2_fm[0], bachelor_fm[1] - c2_fm[1]];

        // These score differences
        var player_dis = Math.sqrt( bp[0] * bp[0] + bp[1] * bp[1] );
        var c1_dis = Math.sqrt( bc1[0] * bc1[0] + bc1[1] * bc1[1] );
        var c2_dis = Math.sqrt( bc2[0] * bc2[0] + bc2[1] * bc2[1] );

        console.log("Scores: " + player_dis + "==" + c1_dis + "==" + c2_dis);

        var idx_max = 0;
        if (player_dis > c1_dis) {
            if (c1_dis > c2_dis)
                idx_max = 2;
            else
                idx_max = 1;
        } else if (player_dis > c2_dis) {
            idx_max = 2;
        }

        switch (idx_max) {
            case 0:
                return g_gameState.characterIndex;
                break;
            case 1:
                return g_gameState.characterIndex === 0 ? 1 : 0;
                break;
            case 2:
                return g_gameState.characterIndex === 2 ? 1 : 2;
                break;
            default:
                return -1;
        }

    },

    getBachelorSelectedCharacterIndex() {
       return Phaser.Math.Between(0, 2);
    }

});
