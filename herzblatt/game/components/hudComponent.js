// CONSTANTS
// diag background
var DIAG_BG_BASE_HEIGHT = 100;
var DIAG_BG_SMALL_HEIGHT = 2*30+1*45;
var DIAG_BG_BIG_HEIGHT = 2*30+3*45;
var DIAG_BASE_TEXT_MARGIN = 10;
//var DIAG_BASE_TEXT_WIDTH = GAME_WIDTH - 4*DIAG_BASE_TEXT_MARGIN;

// next button
var NEXT_BUT_WIDTH = 200;
var NEXT_BUT_HEIGHT = 40;
var NEXT_BUT_ALPHA = 0.8;
var NEXT_BUT_TEXT_MARGIN = 10;

class StatBar {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.x = x;
        this.y = y;
    }

    preload() {

    }

    create() {
        this.fill = this.scene.add.image(this.x, this.y, 'statBarFill');

        this.bg = this.scene.add.image(this.x, this.y, 'statBarBg');
        this.width = this.fill.width;
        this.height = this.fill.height;

        this.setPercentFill(0);
    }

    setTint(tint) {
        this.fill.tint = tint;
    }

    setPercentFill(fillPct) {
        this.fill.x = this.bg.x - this.bg.width * (1.0 - fillPct) / 2;
        this.fill.scaleX = fillPct;
    }

}


class HudComponent {
    constructor(scene) {
        this.scene = scene;
        this.foolStatBar = new StatBar(scene, 1100, 50, 300, 40);
        this.mannersStatBar = new StatBar(scene, 1100, 100, 300, 40);
    }

    preload() {
        this.scene.load.image('statBarBg', 'assets/ui/statBarBg.png');
        this.scene.load.image('statBarFill', 'assets/ui/statBarFill.png');
        this.foolStatBar.preload();
        this.mannersStatBar.preload();
    }

    create() {
        this.foolStatBar.create();
        this.mannersStatBar.create();
        this.scene.add.text(this.foolStatBar.x - 210, this.foolStatBar.y - 10, 'fool:');
        this.scene.add.text(this.mannersStatBar.x - 240, this.mannersStatBar.y - 10, 'manners:');
    }

    updateStatBars(fool, manners) {
        this.foolStatBar.setPercentFill(fool);
        this.mannersStatBar.setPercentFill(manners);
    }
}

class HudDiagBase {
    constructor(scene) {
        this.scene = scene;

    }

    preload() {
        this.scene.load.image('diagBG', 'assets/pics/diag/diag_base.png');
        this.scene.load.image('diagBigBG', 'assets/pics/diag/diag_big.png');
        this.scene.load.image('diagSmallBG', 'assets/pics/diag/diag_small.png');
    }

    createBase() {
        this.diagBG = this.scene.add.image(0, GAME_HEIGHT-DIAG_BG_BASE_HEIGHT, 'diagBG').setOrigin(0,0);
        this.diagBG.displayHeight = DIAG_BG_BASE_HEIGHT;

        this.diagText = this.scene.add.text(this.diagBG.x + DIAG_BASE_TEXT_MARGIN, this.diagBG.y + DIAG_BASE_TEXT_MARGIN, "Test", DiagTextSyle).setOrigin(0,0);
    }

    createSmall() {
        this.diagBG = this.scene.add.image(0, GAME_HEIGHT-DIAG_BG_SMALL_HEIGHT, 'diagSmallBG').setOrigin(0,0);
        this.diagBG.displayHeight = DIAG_BG_SMALL_HEIGHT;

        this.diagText = this.scene.add.text(this.diagBG.x + DIAG_BASE_TEXT_MARGIN, this.diagBG.y + DIAG_BASE_TEXT_MARGIN, "Test", DiagTextSyle).setOrigin(0,0);
    }

    createBig() {
        this.diagBG = this.scene.add.image(0, GAME_HEIGHT-DIAG_BG_BIG_HEIGHT, 'diagBigBG').setOrigin(0,0);
        this.diagBG.displayHeight = DIAG_BG_BIG_HEIGHT;

        this.diagText = this.scene.add.text(this.diagBG.x + DIAG_BASE_TEXT_MARGIN, this.diagBG.y + DIAG_BASE_TEXT_MARGIN, "Test", DiagTextSyle).setOrigin(0,0);
    }

    getDiagBGx() {
        return this.diagBG.x;
    }

    getDiagBGy() {
        return this.diagBG.y;
    }

    setDiagText(text) {
        this.diagText.setText(text);
    }
}

class NextButtonComponent {
    constructor(scene) {
        this.scene = scene;

    }

    preload() {
        this.scene.load.image('buttonNext', 'assets/buttons/next_new.png');
    }

    create() {
        // Create Button
        this.scene.nextButton = this.scene.add.image(GAME_WIDTH - (NEXT_BUT_WIDTH + 10), GAME_HEIGHT - (NEXT_BUT_HEIGHT + 10), 'buttonNext').setOrigin(0,0).setInteractive();
        this.scene.nextButton.displayWidth = NEXT_BUT_WIDTH;
        this.scene.nextButton.displayHeight = NEXT_BUT_HEIGHT;
        this.scene.nextButton.alpha = NEXT_BUT_ALPHA;

        // Create Text
        this.scene.nextButtonText = this.scene.add.text(this.scene.nextButton.x + NEXT_BUT_TEXT_MARGIN, this.scene.nextButton.y + NEXT_BUT_TEXT_MARGIN, "NEXT", DiagTextSyle);

        this.scene.nextButton.visible = true;
        this.scene.nextButtonText.visible = true;
    }
}

