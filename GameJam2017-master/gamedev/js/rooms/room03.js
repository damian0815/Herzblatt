/**
 * Created by Martin on 29.04.2017.
 */


var room03State = {
    create: function () {
        game.stage.backgroundColor = '#83c097';

        visitedR[2]=1;
        // background
        background = game.add.sprite(0,0, 'scene3');
        background.scale.setTo(1280/background.width, 720/background.height);
        item2Button = this.game.add.button(1174, background.height-491, 'unicorn', this.click, this);
        item2Button.scale.setTo(50/item2Button.width, 50/item2Button.height);
        game.world.sendToBack(item2Button);
        game.world.sendToBack(background);
        backgroundSound = game.add.audio('scene3sound');
        backgroundSound.volume = 0.2;
        backgroundSound.play();

        // get start text
        var startText = $('tw-passagedata[name="R' + level + '_1"]').html();
        helpText = startText.split("\n");

        // create buttons
        options = helpText.length;
        /*posX = Math.floor(dialogueBGBox.x + (game.width - 1100)/2);
         posY = Math.floor(dialogueBGBox.y - dialogueBGBox.height + 50);*/

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

        k = 0;
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
        cookie02 = game.add.button(game.width/4,(game.height-textHeight)/2,'cookie02', this.startDialogue, this);
        cookie02.frame = 0;
        cookie02.anchor.set(0.5,0.5);
        cookie02.scale.set(0.7);

        cookie02.animations.add('C2_ani', [0,1], animationSpeed[1], true);
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
        cookie02.animations.play('C2_ani');

        // set bigger scale
        cookie02.scale.set(1);

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

    click: function(){
        items[1].visible=true;
        found[1] = true;
        cookie01.visible=false;
        item2Button.visible=false;
        preGameState.actionOnItem2Click();
    },

    render: function() {
        this.game.debug.text('Stage: Balcony' , 20, 20, 'black', 'Segoe UI');
    }
};