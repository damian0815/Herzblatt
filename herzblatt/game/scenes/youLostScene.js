var youLostScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function youLostScene ()
        {
            Phaser.Scene.call(this, { key: 'youLostScene' });
        },

    preload: function ()
    {
        this.load.image('ylbg', 'assets/pics/youLostBG.jpg');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'ylbg');
        this.add.text(100, 100, 'youLostBG.jpg\n\nYou lost. click to continue.');

        this.input.once('pointerdown', function () {
            this.scene.start('titleScene');
        }, this);
    }

});
