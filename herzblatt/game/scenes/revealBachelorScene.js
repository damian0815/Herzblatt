var revealBachelorScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function revealBachelorScene ()
        {
            Phaser.Scene.call(this, { key: 'revealBachelorScene' });
        },

    preload: function ()
    {
        this.load.image('bg', 'assets/pics/revealBachelorBG.jpg');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'bg');
        this.add.text(100, 100, 'revealBachelorBG.jpg\n\nBachelor is revealed. click to continue.');

        this.input.once('pointerdown', function () {
            this.scene.start('youWonScene');
        }, this);
    }

});
