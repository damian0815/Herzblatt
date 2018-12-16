var resetScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function resetScene ()
        {
            Phaser.Scene.call(this, { key: 'resetScene' });
        },

    preload: function ()
    {
        this.load.image('bg', 'assets/pics/bg.jpg');
    },

    create: function ()
    {
        this.etimer =  this.time.addEvent( {delay: 5000, repeat: 0} );

        var titleScene = this.scene.get('titleScene');
        var charSelectScene = this.scene.get('characterSelectScene');
        var loadingScene = this.scene.get('loadingScene');
        var introScene = this.scene.get('questionIntroScene');
        var bachScene = this.scene.get('bachelorScene');
        var candScene = this.scene.get('candidateScene');
        var revBachScene = this.scene.get('revealBachelorScene');
        var revealDecScene = this.scene.get('revealDecisionScene');
        var wonScene = this.scene.get('youWonScene');
        var lostScene = this.scene.get('youLostScene');

        // titleScene.scene.remove();
        // loadingScene.scene.remove();
        // charSelectScene.scene.remove();
        // introScene.scene.remove();
        // bachScene.scene.remove();
        // candScene.scene.remove();
        // revBachScene.scene.remove();
        // revealDecScene.scene.remove();
        // wonScene.scene.remove();
        // lostScene.scene.remove();

        // this.scene.add('titleScene', [], false);
        // loadingScene.scene.add();
        // charSelectScene.scene.add();
        // introScene.scene.add();
        // bachScene.scene.add();
        // candScene.scene.add();
        // revBachScene.scene.add();
        // revealDecScene.scene.add();
        // wonScene.scene.add();
        // lostScene.scene.add();

        //this.scene.start('titleScene');
    },

    update: function() {
        if(this.etimer.getProgress() === 1.0)
            this.scene.start('titleScene');
    }

});
