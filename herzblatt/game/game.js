

// global vars
var GAME_HEIGHT = 720;
var GAME_WIDTH = 1280;
var TEXT_HEIGHT = 240;
var TEXT_WIDTH = 1100;
var TEXT_Y_MARGIN = 25;

var textHeight=240;
var textWidth=1100;

var config = {
    // type: Phaser.AUTO,
    type: Phaser.WEBGL,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#000000',
    scene: [ titleScene,
        characterSelectScene,
        loadingScene,
        bachelorScene,
        candidateScene,
        questionIntroScene,
        revealBachelorScene,
        revealDecisionScene,
        youLostScene,
        youWonScene,
        resetScene ]
};

var g_loadClick = function(scene) {
    scene.load.audio('click', ['assets/sound/click.mp3']);
};

var g_playClick = function(scene) {
    var click = scene.sound.add('click', { volume:0.25 });
    click.play();
};

var g_loadSwish = function(scene) {
    //scene.load.audio('swish01', ['assets/sound/swish01.mp3']);
    scene.load.audio('swish02', ['assets/sound/swish02.mp3']);
};

var g_playSwish = function(scene) {
    //var whichSwish = (Phaser.Math.Between(0, 1) === 0) ? 'swish01' : 'swish02';
    var whichSwish = 'swish02';
    var swish = scene.sound.add(whichSwish, { volume:0.05 });
    swish.play();
};

var g_titleMusic = null;

var g_loadTitleMusic = function(scene) {
    scene.load.audio('titleMusic', ['assets/music/titles.mp3']);
};

var g_playTitleMusic = function(scene) {
    if (g_titleMusic == null) {
        g_titleMusic = scene.sound.add('titleMusic', {loop: true, volume: 0.3});
        g_titleMusic.play();
    }
};
var g_stopTitleMusic = function() {
    if (g_titleMusic) {
        g_titleMusic.stop();
        g_titleMusic = null;
    }
};


var g_gameState = { characterIndex: 0 };
var game;
setTimeout(function(){game = new Phaser.Game(config);}, 500);

// var game = new Phaser.Game(config);


