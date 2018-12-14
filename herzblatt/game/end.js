/**
 * Created by Martin on 30.04.2017.
 */

var won;
var endSelOption;
var currentText;

endState={
    init: function () {

        won = true;
        for(i = 0; i < 3; ++i){
            won &= (selAns[i] === winAns[i]);
        }

        endSelOption = 0;
        currentText = "";
    },

    preload: function () {
        game.load.text('winText', 'assets/dialogues/winScreenText');
        game.load.text('lostText', 'assets/dialogues/gameOverText');

        game.load.image('dialogueBG', 'assets/dialogueBG.png');
        game.load.image('dialogueButton', 'assets/dialogueButton.png');
        endNarr = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 1100, align: "justify" }
        endChar = { font: "16px Sans Serif", fill: "#000000", wordWrap: true, wordWrapWidth: 1100, align: "justify" }

        outro1audio = game.add.audio('outro1');
        outro2audio = game.add.audio('outro2');
        outro3audio = game.add.audio('outro3');
    },

    create: function() {
        // set background
        endBG = game.add.sprite(0,0, 'scene4');
        endBG.scale.setTo(1280/endBG.width, 720/endBG.height);

        //split text file
        var helpText
        if(won)
            helpText = game.cache.getText('winText');
        else
            helpText = game.cache.getText('lostText');
        endText = helpText.split("\n");

        // create dialog bg
        endBox = this.game.add.sprite(0, game.height, 'dialogueBG');
        endBox.anchor.set(0,1);
        endBox.width = game.width;
        endBox.height = 240;
        //dialogueBGBox.inputEnabled = true;
        endBoxTxt1 = game.add.text(endBox.x + (game.width - 1100)/2, endBox.y - endBox.height + 25, "", endNarr);
        endBoxTxt1.anchor.set(0,0);
        endBoxTxt2 = game.add.text(endBox.x + (game.width - 1100)/2, endBox.y - endBox.height + 60+1*45, "", endChar);
        endBoxTxt2.anchor.set(0,0);

        endBox.visible = true;
        endBoxTxt1.visible = true;
        endBoxTxt2.visible = false;

        miss_maple = game.add.sprite(game.world.centerX, game.world.centerY-100, 'miss_maple');
        miss_maple.anchor.set(0.5,0.5);
        miss_maple.visible=false;

        this.playEnd();
        this.game.input.onDown.add(this.playEnd, this);
    },

    update:function () {
        //this.game.input.onDown.add(this.playEnd, this);
    },

    playEnd:function () {
        if(endSelOption !== -1) {
            var outText = endText[endSelOption].split("$");
            var tmpStep = outText[0].charCodeAt(0)-48;

            if (endSelOption === 0) {
                endBoxTxt1.setText(outText[1]);
            } else {
                currentText += outText[1] + "\n";
                if (!won) // end game
                    endSelOption = -2;
                else if (endSelOption == 2)
                    endSelOption = -2;

                endBoxTxt2.setText(currentText);
                endBoxTxt2.visible = true;
            }

            endSelOption++;
        }
        if(won) {
            switch (endSelOption) {
                case 1:
                    backgroundmusic.volume=0.15;
                    outro1audio.play();
                    break;
                case 2:
                    outro1audio.stop();
                    outro2audio.play();
                    break;
                case -1:
                    outro2audio.stop();
                    outro3audio.play();
                    miss_maple.visible=true;
                    break;
                default:
                    break;
            }
        }

    },

};