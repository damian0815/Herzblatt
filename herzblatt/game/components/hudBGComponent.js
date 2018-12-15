// GENERAL METHODS
var g_loadAllBG = function (scene) {
    scene.load.image('bgAll', 'assets/pics/bg/bg_all.png')
};

var g_addAllBG =  function (scene) {
    scene.add.image(0,0,'bgAll').setOrigin(0,0);
}
