/**
 * Created by Martin on 29.04.2017.
 */
var found = [8];
var clickSound;
var homeState = {

    create: function () {
        //this.background = this.game.add.sprite(0, 0, 'background');

        //ScreenScaleMode. others: SHOW_ALL or NO_SCALE
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        var background = game.add.sprite(0,0, 'homescreen');
        background.scale.setTo(1280/background.width, 720/background.height);
        //Calls the gofull function (dont forget the this.)
        startbuttonbutton = game.add.button(game.world.centerX ,game.world.centerY+50, 'startbutton', this.gofull, this);
        startbuttonbutton.anchor.set(0.5,0.5);
        startbuttonbutton.scale.set(1);
        creditsbutton = game.add.button(game.world.centerX , game.world.centerY+200, 'creditsbutton', this.showCredits, this);
        creditsbutton.anchor.set(0.5,0.5);
        creditsbutton.scale.set(1);
        for(var i=0;i<nritems;i++){
            found[i]=false;
        }

        //Audio
        backgroundmusic = game.add.audio('backgroundmusic');
        backgroundmusic.volume = 0.5;
        backgroundmusic.loop = true;
        clickSound = game.add.audio('click');
        clickSound.volume = 0.2;
        backgroundSound = game.add.audio('wind');
        backgroundSound.volume = 0.2;
        backgroundSound.play();
    },

    //Klick to go fullscreen and then klick again to go back to normal screen
    gofull: function() {
        /*if (game.scale.isFullScreen){
         game.scale.stopFullScreen();
         }else{
         game.scale.startFullScreen(false);
         }*/

        //Starts the fullscreenmode
        game.scale.startFullScreen(false);

        backgroundSound.stop();
        clickSound.play();
        backgroundmusic.play();
        game.state.start('intro');
    },

    //Giving some debug informations
    render: function() {
        // game.debug.text('Click / Tap to go fullscreen', 270, 16);
        // game.debug.text('Click / Tap to go fullscreen', 0, 16);
        //game.debug.inputInfo(32, 32);
        // game.debug.pointer(game.input.activePointer);
    },

    showCredits: function(){
        backgroundSound.stop();
        clickSound.play();
        game.scale.startFullScreen(false);
        game.state.start('credits');
    },
};