// GENERAL METHODS
var g_loadAllBG = function (scene) {
    scene.load.image('bgAll', 'assets/pics/bg/bg_all.png')
};

var g_addAllBG =  function (scene) {
    scene.add.image(0,0,'bgAll').setOrigin(0,0);
};

/**
 * Creates a random integer in the range [0, bound)
 * @param bound upper boundary (not included)
 * @returns {number}
 */
var g_getFRandom = function(bound) {
    var rand =  Math.floor(Math.random() * bound);
    return rand === bound ? bound - 1 : rand; // correct the  possibility of getting 0
};