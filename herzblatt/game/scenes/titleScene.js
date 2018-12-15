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
        this.load.image('tbg', 'assets/pics/titleBG.png');
        this.load.image('play', 'assets/buttons/play.png');
        g_loadClick(this);
        g_loadSwish(this);
    },

    create: function ()
    {
        this.add.image(640, 360, 'tbg');

        //var music = this.sound.add('titleMusic', { loop:true, volume:0.3 });
        //music.play();

        //this.add.text(100, 100, 'Herzblatt');
        //this.add.text(100, 400, 'A game by Some People for Klagenfurt Winter Game Jam 2018');

        var playButton = this.add.sprite(850, 500, 'play').setInteractive();
        var that = this;
        playButton.on('pointerover', function(pointer) {
            g_playSwish(that);
            this.setTint(0xffaaaa);
        });
        playButton.on('pointerout', function(pointer) {
            this.clearTint();
        });
         playButton.on('pointerdown', function(pointer) {
            console.log('Clicked play, going to loadingScene');
            that.scene.start('loadingScene');
            g_playClick(that);
        });
    }

});
