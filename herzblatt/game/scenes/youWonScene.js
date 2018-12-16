var youWonScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function youWonScene ()
        {
            Phaser.Scene.call(this, { key: 'youWonScene' });
        },

    preload: function ()
    {
        this.load.image('ywbg', 'assets/pics/bg/win.png');
    },

    create: function ()
    {
        this.add.sprite(0, 0, 'ywbg').setOrigin(0,0);

        this.input.once('pointerdown', function () {
            this.scene.start('resetScene');
        }, this);
    }

});
