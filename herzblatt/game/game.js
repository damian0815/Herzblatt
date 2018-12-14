var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    backgroundColor: '#000000',
    scene: [ titleScene, characterSelectScene ]
};

var game = new Phaser.Game(config);
