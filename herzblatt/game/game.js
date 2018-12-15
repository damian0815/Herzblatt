

// global vars
var GAME_HEIGHT = 720;
var GAME_WIDTH = 1280;
var TEXT_HEIGHT = 240;
var TEXT_WIDTH = 1100;
var TEXT_Y_MARGIN = 25;

var gameHeight = 720;
var gameWidth = 1280;
var textHeight=240;
var textWidth=1100;

var config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    backgroundColor: '#000000',
    scene: [ titleScene, characterSelectScene, dialogueScene, loadingScene, bachelorScene,candidateScene ]
};

var game = new Phaser.Game(config);
