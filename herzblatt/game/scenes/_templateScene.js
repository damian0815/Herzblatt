var _templateScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function _templateScene ()
        {
            Phaser.Scene.call(this, { key: '_templateScene' });
        },

    preload: function ()
    {
        this.load.image('bg', 'assets/pics/bg.jpg');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'bg');

        this.input.once('pointerdown', function () {
            this.scene.start('titleScene');
        }, this);
    }

});
