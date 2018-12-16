var DELAY_MOVE_TIME = 1500;
var MOVE_TIME = 10000;

var revealBachelorScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function revealBachelorScene ()
        {
            Phaser.Scene.call(this, { key: 'revealBachelorScene' });

            this.charDisplayCon = new CharDisplayComponent(this);
        },

    preload: function ()
    {
        g_loadAllBG(this);

        g_loadTitleMusic(this);

        this.load.image('rbbg', 'assets/pics/revealBachelorBG.jpg');
        this.charDisplayCon.preload();
    },

    create: function ()
    {
        // Load Background
        g_addAllBG(this);

        this.charDisplayCon.create(true, true, true, true);
        this.charDisplayCon.setBachVisibility(true);

        this.moveCompleted = false;
        this.prevTime = 0.0;
        this.startMoveTimer = this.time.addEvent({
            delay: DELAY_MOVE_TIME,
            repeat: false
        });
        this.bgTimer = this.time.addEvent({
            delay: DELAY_MOVE_TIME + MOVE_TIME,
            repeat: false
        });

        this.add.sprite(640, 360, 'rbbg');
        this.add.text(100, 100, 'revealBachelorBG.jpg\n\nBachelor is revealed. click to continue.');

        g_playTitleMusic(this);
        this.input.once('pointerdown', function () {
            this.scene.start('youWonScene');
        }, this);
    },

    update: function () {
        if (!this.moveCompleted && this.startMoveTimer.getProgress() === 1.0) {
            var curTime = this.bgTimer.getElapsed();
            // console.log(curTime + "&" + (curTime - this.prevTime));
            if (this.prevTime === 0.0)
                this.prevTime = curTime;
            else if (curTime - this.prevTime > MOVE_TIME / GAME_HEIGHT) {
                this.prevTime = curTime;
                var dy = 1;
                this.charDisplayCon.moveCurtain(dy);
            }
        }
    },



});
