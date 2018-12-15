var youWonScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function youWonScene ()
        {
            Phaser.Scene.call(this, { key: 'youWonScene' });
        },

    preload: function ()
    {
        this.load.image('bg', 'assets/pics/youWonBG.jpg');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'bg');
        this.add.text(100, 100, 'youWonBG.jpg\n\nYou won. click to continue.');

        this.input.once('pointerdown', function () {
            this.scene.start('titleScene');
        }, this);
    }

});
