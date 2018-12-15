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

