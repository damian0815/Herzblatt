var questionScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function questionScene ()
        {
            Phaser.Scene.call(this, { key: 'questionScene' });
        },

    preload: function ()
    {
        this.load.image('qbg', 'assets/pics/questionSceneBG.jpg');
        this.hud = new HudComponent(this);
        this.hud.preload();
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'qbg');
        this.add.text(100, 100, 'questionSceneBG.jpg\n\nQuestions and answers. Click to update sliders and continue.');

        this.hud.create();

        this.clickCounter = 3;

        var that = this;
        this.input.on('pointerdown', function () {
            console.log('click counter: ' + that.clickCounter);
            that.clickCounter = that.clickCounter - 1;
            if (that.clickCounter > 0) {
                that.updateHud();
            } else {
                that.scene.start('revealDecisionScene');
            }
        }, this);
    },

    updateHud: function()
    {
        var foolPct = Phaser.Math.FloatBetween(0, 1);
        var mannersPct = Phaser.Math.FloatBetween(0, 1);
        this.hud.updateStatBars(foolPct, mannersPct);
    }

});
