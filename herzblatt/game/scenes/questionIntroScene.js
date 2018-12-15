var questionIntroScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function questionIntroScene ()
        {
            Phaser.Scene.call(this, { key: 'questionIntroScene' });
        },

    preload: function ()
    {
        this.load.image('qibg', 'assets/pics/questionIntroSceneBG.jpg');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'qibg');
        this.add.text(100, 100, 'questionIntroSceneBG.jpg\n\nIntro to game. Click to continue.');

        this.input.once('pointerdown', function () {
            this.scene.start('bachelorScene');
        }, this);
    }

});
