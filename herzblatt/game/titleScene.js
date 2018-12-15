var titleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function titleScene ()
        {
            Phaser.Scene.call(this, { key: 'titleScene' });
        },

    preload: function ()
    {
        this.load.audio('titleMusic', ['assets/music/titles.mp3']);
        this.load.image('title', 'assets/pics/title.jpg');
        this.load.image('play', 'assets/buttons/play.png');
        g_loadClick(this);
    },

    create: function ()
    {
        this.add.sprite(400, 200, 'title');

        //var music = this.sound.add('titleMusic', { loop:true, volume:0.3 });
        //music.play();

        this.add.text(100, 100, 'Herzblatt');
        this.add.text(100, 400, 'A game by Some People for Klagenfurt Winter Game Jam 2018');

        var playButton = this.add.sprite(400, 320, 'play').setInteractive();
        var that = this;
        playButton.on('pointerover', function(pointer) {
            this.setTint(0xffaaaa);
        });
        playButton.on('pointerout', function(pointer) {
            this.clearTint();
        });
         playButton.on('pointerdown', function(pointer) {
            console.log('Clicked play, going to characterSelectScene');
            that.scene.start('characterSelectScene');
            g_playClick(that);
        });
    }

});
