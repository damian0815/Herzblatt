var Xmax = 1280;
var Ymax = 720;

var game = new Phaser.Game(Xmax, Ymax, 'Cookies and Crime');

game.state.add('boot', bootState);
game.state.add('preLoad', preLoadState);
game.state.add('home', homeState);
game.state.add('credits', creditState);
game.state.add('intro', introState);
game.state.add('end', endState);
game.state.add('main', mainState);
game.state.add('preGame', preGameState);
game.state.add('room01', room01State);
game.state.add('room02', room02State);
game.state.add('room03', room03State);
game.state.add('room04', room04State);
game.state.add('room05', room05State);
game.state.add('room06', room06State);

game.state.start('boot');

var level;
var rooms;
var dialogueBGBox;
var dialogueText;
var diagLevels;
var possibleAnswers;

var diagClicked;

// visited rooms
var visitedR;

// global vars
var textHeight;

var mainState = {


    create: function() {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        this.background = this.game.add.sprite(0, 0, 'background');
        game.scale.startFullScreen();
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
        game.input.onDown.add(this.jump, this);

        /*
        this.jumpSound = game.add.audio('click');
        this.jumpSound.volume = 0.2;
        this.jumpSound.play();
        */

        // for pre game state:
        game.state.start('preGame');
    },

};

