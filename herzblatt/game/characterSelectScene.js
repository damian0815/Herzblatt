var characterSelectScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function characterSelectScene ()
        {
            Phaser.Scene.call(this, { key: 'characterSelectScene' });
        },

    preload: function ()
    {
        this.load.image('spar', 'assets/pics/spar.PNG');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'spar').setAlpha(0.8);

        this.input.once('pointerdown', function () {

            console.log('From characterSelectScene to dialogueScene');

            this.scene.start('dialogueScene');

        }, this);
    }

});