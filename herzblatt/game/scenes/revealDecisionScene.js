var revealDecisionScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function revealDecisionScene ()
        {
            Phaser.Scene.call(this, { key: 'revealDecisionScene' });
        },

    preload: function ()
    {
        this.load.image('rdbg', 'assets/pics/revealDecisionBG.jpg');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'rdbg');
        this.add.text(100, 100, 'revealDecisionBG.jpg\n\nBig dramatic reveal of the decision...');
        g_loadClick(this);
        this.time.delayedCall(1500, this.onExplodeTimer, [], this);
    },

    onExplodeTimer: function() {

        var bachelorSelectedIndex = this.getBachelorSelectedCharacterIndex();
        var nextScene;
        if (bachelorSelectedIndex == g_gameState.characterIndex) {
            this.add.text(100, 200, 'the bachelor picked you <3\n\nclick to continue');
            nextScene = 'revealBachelorScene';
        } else {
            this.add.text(100, 200, 'you exploded :(\n\nclick to continue');
            nextScene = 'youLostScene';
        }

        var that = this;
        this.input.once('pointerdown', function () {
            that.scene.start(nextScene);
        }, this);

    },

    getBachelorSelectedCharacterIndex() {
       return Phaser.Math.Between(0, 2);
    }

});
