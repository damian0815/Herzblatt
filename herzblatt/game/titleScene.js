var titleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function titleScene ()
        {
            Phaser.Scene.call(this, { key: 'titleScene' });
        },

    preload: function ()
    {
        this.load.image('lensThing', 'assets/pics/lensthing.JPG');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'lensThing').setAlpha(0.8);

        this.input.once('pointerdown', function () {

            console.log('From titleScene to characterSelectScene');

            this.scene.start('characterSelectScene');

        }, this);
    }

});
