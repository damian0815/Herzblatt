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

        this.add.text(100,20, "Programming\n" +
            "Martin Scheiber, Damian Stewart\n" +
            "\n" +
            "Writing\n" +
            "Marion Berg\n" +
            "\n" +
            "Graphics Artist\n" +
            "Stefanie Marko, Georg Wieser, Kristina Wogatai\n" +
            "\n" +
            "Recording Engineer\n" +
            "Philipp Überbacher\n" +
            "\n" +
            "Music\n" +
            "Damian Stewart\n" +
            "\n" +
            "Voice #1\n" +
            "Sarah Wachter\n" +
            "\n" +
            "\n" +
            "Voice #2\n" +
            "John NA Brown\n" +
            "\n" +
            "\n" +
            "Voice #3\n" +
            "Marion Berg\n" +
            "\n" +
            "\n" +
            "Voice #4\n" +
            "Mathew Sherry\n" +
            "\n" +
            "Announcer\n" +
            "Felix Schniz\n" +
            "\n" +
            "Player Gibberish\n" +
            "Philipp Überbacher\n" +
            "\n" +
            "Whistler\n" +
            "Simon Bernard, John NA Brown\n" +
            "\n" +
            "Bachelor voice\n" +
            "eSpeak\n" +
            "\n" +
            "Cheers\n" +
            "The Awesome Game Jam People").setOrigin(0,0);

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
