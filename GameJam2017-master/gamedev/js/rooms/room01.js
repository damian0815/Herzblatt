/**
 * Created by Martin on 28.04.2017.
 */



var room01State = {
    init:function () {
        visitedR[level-1] = 1;
    },

    create: function () {
        game.stage.backgroundColor = '#44ff62';

        visitedR[0]=1;
        // background
        background = this.game.add.sprite(0,0,'scene1');
        background.scale.setTo(1280/background.width, 720/background.height);
        item5Button = this.game.add.button(592, background.height-165, 'lindwurm', this.click5, this);
        item5Button.scale.setTo(50/item5Button.width, 50/item5Button.height);
        game.world.sendToBack(item5Button);
        item6Button = this.game.add.button(749, background.height-454, 'milk_syringe', this.click6, this);
        item6Button.scale.setTo(50/item6Button.width, 50/item6Button.height);
        game.world.sendToBack(item6Button);
        item7Button = this.game.add.button(561, background.height-406, 'cookie_cutter', this.click7, this);
        item7Button.scale.setTo(50/item7Button.width, 50/item7Button.height);
        game.world.sendToBack(item7Button);
        item8Button = this.game.add.button(828, background.height-497, 'spoon', this.click8, this);
        item8Button.scale.setTo(50/item8Button.width, 50/item8Button.height);
        game.world.sendToBack(item8Button);
        game.world.sendToBack(background);
        backgroundSound = game.add.audio('scene1sound');
        backgroundSound.volume = 0.2;
        backgroundSound.play();

        cookie00 = this.game.add.sprite(game.world.centerX, game.world.centerY, 'victim');
        cookie00.anchor.set(0.5, 0.1);
        cookie00.scale.set(0.55);

    },

    update: function () {
    },

    click5: function () {
        items[4].visible=true;
        found[4] = true;
        preGameState.actionOnItem5Click();
    },
    click6: function () {
        items[5].visible=true;
        found[5] = true;
        preGameState.actionOnItem6Click();
    },
    click7: function () {
        items[6].visible=true;
        found[6] = true;
        preGameState.actionOnItem7Click();
    },
    click8: function () {
        items[7].visible=true;
        found[7] = true;
        preGameState.actionOnItem8Click();
    },
    render: function() {
        this.game.debug.text('Stage: Corridor', 20, 20, 'black', 'Segoe UI');
    }
};