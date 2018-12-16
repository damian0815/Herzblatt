// GENERAL METHODS
var g_loadAllBG = function (scene) {
    scene.load.image('bgAll', 'assets/pics/bg/bg_all.png');
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

class CharDisplayComponent {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.image('canA', 'assets/pics/chars/candidate_A.png');
        this.scene.load.image('canB', 'assets/pics/chars/candidate_B.png');
        this.scene.load.image('canC', 'assets/pics/chars/candidate_C.png');
        this.scene.load.image('curtain', 'assets/pics/chars/curtain.png');
    }

    create(visA = false, visB = false, visC = false, visCur = false) {
        this.canA = this.scene.add.image(0,0,'canA').setOrigin(0,0);
        this.canB = this.scene.add.image(0,0,'canB').setOrigin(0,0);
        this.canC = this.scene.add.image(0,0,'canC').setOrigin(0,0);
        this.curtain = this.scene.add.image(0,0,'curtain').setOrigin(0,0);

        this.canA.visible = visA;
        this.canB.visible = visB;
        this.canC.visible = visC;
        this.curtain.visible = visCur;
    }

    setCanAVisibility(value = true) {
        this.canA.visible = value;
    }

    setCanBVisibility(value = true) {
        this.canB.visible = value;
    }

    setCanCVisibility(value = true) {
        this.canC.visible = value;
    }

    setCurtainVisibility(value = true) {
        this.curtain.visible = value;
    }

    moveCurtain(dy) {
        this.curtain.y -= Math.ceil(dy);
    }
}