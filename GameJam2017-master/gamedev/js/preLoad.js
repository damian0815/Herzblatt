/**
 * Created by Martin on 29.04.2017.
 */

//TODO: https://www.youtube.com/watch?v=oNobWzmR7nQ

var preLoadState = {

    // preload everything for game and home
    preload: function() {
        game.stage.backgroundColor = '#4c67c0';

        //images - items
        game.load.image('coffee', 'assets/coffee.png');
        game.load.image('pasta','assets/pasta.png');
        game.load.image('unicorn', 'assets/unicorn.png');
        game.load.image('VR', 'assets/VR_Glasses.png');

        //images - weapons
        game.load.image('lindwurm', 'assets/lindwurm.png');
        game.load.image('milk_syringe', 'assets/milk syringe.png');
        game.load.image('cookie_cutter', 'assets/cookie_cutter.png');
        game.load.image('spoon', 'assets/spoon.png');

        //images - backgrounds and buttons
        game.load.image('arrowleft', 'assets/arrowleft.png');
        game.load.image('arrowright', 'assets/arrowright.png');
        game.load.image('inventory', 'assets/inventorybutton.png');
        game.load.image('creditsbutton', 'assets/credits.png');
        game.load.image('startbutton', 'assets/start.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('cls_button', 'assets/x_btn.png', 50, 50);
        game.load.image('txtbackground', 'assets/text_background.png', 1020,570);
        game.load.image('object_background','assets/object_background2.png');
        game.load.image('cloud', 'assets/cloud_new.png');
        game.load.image('picture', 'assets/picture.png');

        //images - scenes and background
        game.load.image('scene1', 'assets/hallway.png');
        game.load.image('scene2', 'assets/smoking_room.png');
        game.load.image('scene3', 'assets/balcony720.png');
        game.load.image('scene4', 'assets/dining_hall.png');
        game.load.image('scene5', 'assets/library.png');
        game.load.image('scene6', 'assets/restrooms.png');
        game.load.image('homescreen', 'assets/castle_exterior720.png');

        //image - cookies
        game.load.image('miss_maple', 'assets/miss_maple.png');
        game.load.image('victim', 'assets/cookies/victim_victor.png');

        //audio
        game.load.audio('jump', 'assets/jump.mp3');
        game.load.audio('click', 'assets/click.mp3');
        game.load.audio('wind', 'assets/wind.mp3');
        game.load.audio('scene1sound', 'assets/story1sound.mp3');
        game.load.audio('scene2sound', 'assets/story2sound.mp3');
        game.load.audio('scene3sound', 'assets/story3sound.mp3');
        game.load.audio('scene4sound', 'assets/story4sound.mp3');
        game.load.audio('scene6sound', 'assets/story6sound.mp3');
        game.load.audio('backgroundmusic', 'assets/Crimes_N_Cookies_V_1.mp3');
        game.load.audio('intro1', 'assets/intro1.mp3');
        game.load.audio('intro2', 'assets/intro2.mp3');
        game.load.audio('intro3', 'assets/intro3.mp3');
        game.load.audio('intro4', 'assets/intro4.mp3');
        game.load.audio('intro5', 'assets/intro5.mp3');
        game.load.audio('outro1', 'assets/outro1.mp3');
        game.load.audio('outro2', 'assets/outro2.mp3');
        game.load.audio('outro3', 'assets/outro3.mp3');
    },

    create: function () {
        game.state.start('home');
    }
};