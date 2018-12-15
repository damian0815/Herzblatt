
class ReactionOverlayComponent {

    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.image('reactionPositive', 'assets/ui/reactionPositive.png');
        this.scene.load.image('reactionNeutral', 'assets/ui/reactionNeutral.png');
        this.scene.load.image('reactionNegative', 'assets/ui/reactionNegative.png');
    }

    create() {
        this.positive = this.scene.add.image(0, 0, 'reactionPositive');
        this.positive.setAlpha(0);

        this.neutral = this.scene.add.image(0, 0, 'reactionNeutral');
        this.neutral.setAlpha(0);

        this.negative = this.scene.add.image(0, 0, 'reactionNegative');
        this.negative.setAlpha(0);
    }

    showPositiveReaction() {
        this.setRandomPosition(this.positive);
        this.positive.setAlpha(1);
        this.hideAfterDelay(this.positive);
    }

    showNeutralReaction() {
        this.setRandomPosition(this.neutral);
        this.neutral.setAlpha(1);
        this.hideAfterDelay(this.neutral);
    }

    showNegativeReaction() {
        this.setRandomPosition(this.negative);
        this.negative.setAlpha(1);
        this.hideAfterDelay(this.negative);
    }

    setRandomPosition(reaction) {
        reaction.x = Phaser.Random.Between(200, 300);
        reaction.y = Phaser.Random.Between(200, 300);
    }

    hideAfterDelay(reaction) {
        this.scene.time.delayedCall(3000, this.hide, [reaction], this);
    }

    hide(reaction) {
        reaction.setAlpha(0);
    }
}
