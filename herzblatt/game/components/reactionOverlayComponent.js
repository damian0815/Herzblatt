var NO_REACTIONS = 5;


class ReactionOverlayComponent {

    constructor(scene) {
        this.scene = scene;

        this.posTexts = new Array(NO_REACTIONS);
        this.medTexts = new Array(NO_REACTIONS);
        this.negTexts = new Array(NO_REACTIONS);

        var in_text = $('tw-passagedata[name="Pos"]').html();
        this.posTexts = in_text.split('\n');
        in_text = $('tw-passagedata[name="Med"]').html();
        this.medTexts = in_text.split('\n');
        in_text = $('tw-passagedata[name="Neg"]').html();
        this.negTexts = in_text.split('\n');

        console.log(this.posTexts);
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
        // TODO(martin): uncomment after sprites addition
        // this.setRandomPosition(this.positive);
        // this.positive.setAlpha(1);

        // set Reaction text
        var rand = g_getFRandom(NO_REACTIONS);
        this.scene.HudDiagBGCon.setDiagText(this.posTexts[rand]);

        this.hideAfterDelay(this.positive);
    }

    showNeutralReaction() {
        // TODO(martin): uncomment after sprites addition
        // this.setRandomPosition(this.neutral);
        // this.neutral.setAlpha(1);

        // set Reaction text
        var rand = g_getFRandom(NO_REACTIONS);
        this.scene.HudDiagBGCon.setDiagText(this.medTexts[rand]);

        this.hideAfterDelay(this.neutral);
    }

    showNegativeReaction() {
        // TODO(martin): uncomment after sprites addition
        // this.setRandomPosition(this.negative);
        // this.negative.setAlpha(1);

        // set Reaction text
        var rand = g_getFRandom(NO_REACTIONS);
        this.scene.HudDiagBGCon.setDiagText(this.negTexts[rand]);

        this.hideAfterDelay(this.negative);
    }

    setRandomPosition(reaction) {
        reaction.x = g_getFRandom(101) + 200; //Phaser.Random.Between(200, 300);
        reaction.y = g_getFRandom(101) + 200; //Phaser.Random.Between(200, 300);
    }

    hideAfterDelay(reaction) {
        this.scene.time.delayedCall(3000, this.hide, [reaction], this);
    }

    hide(reaction) {
        // reaction.setAlpha(0);
    }


}
