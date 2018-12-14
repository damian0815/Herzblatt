var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    scene: [ titleScene, characterSelectScene ]
};

var game = new Phaser.Game(config);
