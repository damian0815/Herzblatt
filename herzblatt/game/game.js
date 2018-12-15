var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    scene: [ titleScene, characterSelectScene, questionIntroScene, questionScene,
        revealBachelorScene, revealDecisionScene, youLostScene, youWonScene ]
};

var g_loadClick = function(scene) {
    scene.load.audio('click', ['assets/sound/click.mp3']);
}

var g_playClick = function(scene) {
    var click = scene.sound.add('click', { volume:0.25 });
    click.play();
}

var g_loadSwish = function(scene) {
    //scene.load.audio('swish01', ['assets/sound/swish01.mp3']);
    scene.load.audio('swish02', ['assets/sound/swish02.mp3']);
}

var g_playSwish = function(scene) {
    //var whichSwish = (Phaser.Math.Between(0, 1) === 0) ? 'swish01' : 'swish02';
    var whichSwish = 'swish02';
    var swish = scene.sound.add(whichSwish, { volume:0.05 });
    swish.play();
}


var g_gameState = { characterIndex: 0 };
var game = new Phaser.Game(config);

