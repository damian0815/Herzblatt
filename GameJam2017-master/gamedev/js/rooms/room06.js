/**
 * Created by Martin on 28.04.2017.
 */

var room06State = {
    create: function () {
        game.stage.backgroundColor = '#373046';

        visitedR[5]=1;
        //background
        background = game.add.sprite(0,0, 'scene6');
        background.scale.setTo(1280/background.width, 720/background.height);
        item4Button = this.game.add.button(1049, background.height-488, 'coffee', this.click, this);
        item4Button.scale.setTo(50/item4Button.width, 50/item4Button.height);
        picture = this.game.add.button(325, 134, 'picture', this.hint1, this);
        picture.scale.set(0.6);
        game.world.sendToBack(item4Button);
        game.world.sendToBack(picture);
        game.world.sendToBack(background);
        backgroundSound = game.add.audio('scene6sound');
        backgroundSound.volume = 0.2;
        backgroundSound.play();

        // get start text
        var startText = $('tw-passagedata[name="R' + level + '_1"]').html();
        helpText = startText.split("\n");

        // create buttons
        options = helpText.length;
        posX = Math.floor(dialogueBGBox.x + (game.width - 1100)/2);
        posY = Math.floor(dialogueBGBox.y - dialogueBGBox.height + 50);

        dialogueText.setText(helpText[0]);

        var k = 1, l = 0;
        var first = true;
        for (k=1; k < options; k++){
            if (helpText[k].startsWith("    "))
                helpText[k].replace("    ","");
            if (helpText[k].startsWith("\t"))
                helpText[k].replace("\t","");
            if (helpText[k].startsWith("[[") && first){
                diagText = [options - k];
                diagText[l++] = helpText[k];
                first = false;
            } else if (helpText[k].startsWith("[[")) {
                diagText[l++] = helpText[k];
            }
        }

        options = diagText.length;
        tmpoptions = options;

        k= 0;
        for ( i = 0; i < options; i++){
            // create button
            var diagSplit = diagText[i].split("-&gt;");
            buttonFollow[i-k] = diagSplit[1].replace("]]","");

            diagSplit[0] = diagSplit[0].replace("[[","");
            if(diagSplit[0].startsWith("*")){
                diagSplit[0] = diagSplit[0].replace("*","");
                var depends = diagSplit[0].split("*");
                diagSplit[0] = depends[1];

                var depRoom = depends[0].charAt(1).charCodeAt(0)-48;
                var depSpeech = depends[0].charAt(3).charCodeAt(0)-48;
                var depDia = depends[0].charAt(5).charCodeAt(0)-48;

                //check if dependency has been reached
                if(diagClicked[depRoom-1][depSpeech-1][depDia-1] !== 1){
                    tmpoptions--;
                    k++;
                    continue;
                }
            }

            questID[i-k] = i;
            buttonText[i-k].setText(diagSplit[0]);
            buttonText[i-k].visible = false;
        }

        options = tmpoptions;

        // add cookie
        cookie04 = game.add.button(game.width/2,(game.height-textHeight)/2,'cookie04', this.startDialogue, this);
        cookie04.frame = 0;
        cookie04.anchor.set(0.5,0.5);
        cookie04.scale.set(0.7);

        cookie04.animations.add('C4_ani', [0,1,2,3], animationSpeed[3], true);
    },

    update: function () {

    },

    startDialogue: function() {
        //deactivate buttons
        leftButton.visible = false;
        rightButton.visible = false;
        inventoryButton.visible = false;
        //TODO: deactivate items

        // animation
        dialogActive = 1;
        cookie04.animations.play('C4_ani');

        // set bigger scale
        cookie04.scale.set(1);

        // enable dialogue
        dialogueBGBox.visible=true;
        dialogueText.visible=true;
        diagExitButton.visible=true;

        // enable user buttons
        for (i = 0; i < options; ++i){
            dialogueButton[i].visible = true;
            buttonText[i].visible = true;
        }

    },

    hint1: function(){
        preGameState.actionOnItemHint1Click();
    },
    click: function(){
        items[3].visible=true;
        found[3] = true;
        item4Button.visible=false;
        picture.visible=false;
        preGameState.actionOnItem4Click();
    },

    render: function() {
        this.game.debug.text('Stage: Bathroom' , 20, 20, 'black', 'Segoe UI');
    }
};