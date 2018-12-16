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
        this.load.image('tbg', 'assets/pics/bg/start_screen.png');
        this.load.image('startButt', 'assets/buttons/start_screen_button.png');

        g_loadClick(this);
        g_loadSwish(this);
    },

    create: function ()
    {
        this.add.image(0, 0, 'tbg').setOrigin(0,0);

        var music = this.sound.add('titleMusic', { loop:true, volume:0.3 });
        music.play();

        this.playButton = this.add.sprite(850, 500, 'startButt').setInteractive();
        var that = this;
        this.playButton.on('pointerover', function(pointer) {
            g_playSwish(that);
            this.setTint(0xffaaaa);
        });
        this.playButton.on('pointerout', function(pointer) {
            this.clearTint();
        });
        this.playButton.on('pointerdown', function(pointer) {
            console.log('Clicked play, going to loadingScene');
            that.scene.start('loadingScene');
            music.stop();
            g_playClick(that);
        });

        this.input.keyboard.on('keydown_ENTER', function() {
            console.log('Clicked play, going to loadingScene');
            that.scene.start('loadingScene');
            music.stop();
            g_playClick(that);
        });
    }

});
