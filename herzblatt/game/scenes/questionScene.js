var questionScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function questionScene ()
        {
            Phaser.Scene.call(this, { key: 'questionScene' });
        },

    preload: function ()
    {
        this.load.image('bg', 'assets/pics/questionSceneBG.jpg');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'bg');
        this.add.text(100, 100, 'questionSceneBG.jpg\n\nQuestions and answers. Click to continue.');

        this.input.once('pointerdown', function () {
            this.scene.start('revealDecisionScene');
        }, this);
    }

});
