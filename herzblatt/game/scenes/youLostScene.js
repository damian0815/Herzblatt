var youLostScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function youLostScene ()
        {
            Phaser.Scene.call(this, { key: 'youLostScene' });
        },

    preload: function ()
    {
        this.load.image('ylbg', 'assets/pics/bg/gameOver.png');
    },

    create: function ()
    {
        this.add.sprite(0, 0, 'ylbg').setOrigin(0,0);

        this.input.once('pointerdown', function () {
            this.scene.start('resetScene');
        }, this);
    }

});
