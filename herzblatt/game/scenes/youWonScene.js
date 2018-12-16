var youWonScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function youWonScene ()
        {
            Phaser.Scene.call(this, { key: 'youWonScene' });
        },

    preload: function ()
    {
        this.load.image('ywbg', 'assets/pics/youWonBG.jpg');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'ywbg');
        this.add.text(100, 100, 'youWonBG.jpg\n\nYou won. click to continue.');

        this.input.once('pointerdown', function () {
            this.scene.start('resetScene');
        }, this);
    }

});
