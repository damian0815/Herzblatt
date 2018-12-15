

// global vars
var gameHeight = 640;
var gameWidth = 800;
var textHeight=240;
var textWidth=700;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    backgroundColor: '#000000',
    scene: [ titleScene, characterSelectScene, dialogueScene ]
};

var game = new Phaser.Game(config);
