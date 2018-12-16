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
        this.scene.load.image('canC', 'assets/pics/chars/MrBlobby.png');
        this.scene.load.image('curtain', 'assets/pics/chars/curtain02.png');

        this.scene.load.image('spotA', 'assets/pics/spotlight/spotlight_red.png');
        this.scene.load.image('spotB', 'assets/pics/spotlight/spotlight_white.png');
        this.scene.load.image('spotC', 'assets/pics/spotlight/spotlight_yellow.png');
    }

    create(visA = false, visB = false, visC = false, visCur = false) {
        this.bach = this.scene.add.image(0,0,'MrBlobby').setOrigin(0,0);
        this.canA = this.scene.add.image(0,0,'canA').setOrigin(0,0);
        this.canB = this.scene.add.image(0,0,'canB').setOrigin(0,0);
        this.canC = this.scene.add.image(0,0,'canC').setOrigin(0,0);
        this.curtain = this.scene.add.image(0,0,'curtain').setOrigin(0,0);

        this.bach.visible = false;

        this.canA.visible = visA;
        this.canB.visible = visB;
        this.canC.visible = visC;
        this.curtain.visible = visCur;

        var gl = this.scene.sys.game.renderer.gl;
        var additiveMode = [ gl.ONE, gl.ONE, gl.ONE, gl.ONE ];
        var additiveEquation = gl.FUNC_ADD;
        var renderer = this.scene.sys.game.renderer;
        var modeIndex = renderer.addBlendMode(additiveMode, additiveEquation);
        // this.scene.add.image(400, 300, 'face').setBlendMode(modeIndex);

        this.spotA = this.scene.add.image(600,200,'spotA'). setBlendMode(modeIndex);
        this.spotB = this.scene.add.image(800,200,'spotB'). setBlendMode(modeIndex);
        this.spotC = this.scene.add.image(1100,200,'spotC'). setBlendMode(modeIndex);
        this.spotA.visible = false;
        this.spotB.visible = false;
        this.spotC.visible = false;
    }

    setBachVisibility(value = false) {
        this.bach.visible = value;
    }

    setCanAVisibility(value = true) {
        this.canA.visible = value;
        this.spotA.visible = value;

        this.spotB.visible = false;
        this.spotC.visible = false;
    }

    setCanBVisibility(value = true) {
        this.canB.visible = value;
        this.spotB.visible = value;

        this.spotA.visible = false;
        this.spotC.visible = false;
    }

    setCanCVisibility(value = true) {
        this.canC.visible = value;
        this.spotC.visible = value;

        this.spotA.visible = false;
        this.spotB.visible = false;
    }

    setSpotVisibility(a = false, b = false, c = false) {
        this.spotA.visible = a;
        this.spotB.visible = b;
        this.spotC.visible = c;
    }

    setCurtainVisibility(value = true) {
        this.curtain.visible = value;
    }

    moveCurtain(dy) {
        this.curtain.y -= Math.ceil(dy);
    }
}