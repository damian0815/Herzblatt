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
    var click = scene.sound.add('click');
    click.play();
}


var g_gameState = { characterIndex: 0 };
var game = new Phaser.Game(config);

