/**
 * Created by Martin on 28.04.2017.
 */


var room04State = {

    create: function () {
        game.stage.backgroundColor = '#c02461';

        visitedR[3]=1;
        // background
        background = game.add.sprite(0,0, 'scene4');
        background.scale.setTo(1280/background.width, 720/background.height);
        game.world.sendToBack(background);
        backgroundSound = game.add.audio('scene4sound');
        backgroundSound.volume = 0.2;
        backgroundSound.play();

        // get start text
        var startText = $('tw-passagedata[name="R' + level + '_1"]').html();
        helpText = startText.split("\n");

        // create buttons
        options = helpText.length;
        posX = Math.floor(dialogueBGBox.x + (game.width - 1100)/2);
        posY = Math.floor(dialogueBGBox.y - dialogueBGBox.height + 50);

        accuseStartText[0] = helpText[0];
        accuseStartText[1] = helpText[1];

        var k = 2, l = 0;
        var first = true;
        for (k=2; k < options; k++){
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

        for ( i = 0; i < options; i++){
            // create button
            var diagSplit = diagText[i].split("-&gt;");
            buttonFollow[i] = diagSplit[1].replace("]]","");

            diagSplit[0] = diagSplit[0].replace("[[","");
            if(diagSplit[0].startsWith("*")){
                diagSplit[0] = diagSplit[0].replace("*","");
                var depends = diagSplit[0].split("*");
                diagSplit[0] = depends[1];

                winAns[0] = i;
            }

            questID[i] = i;
            buttonText[i].setText(diagSplit[0]);
            buttonText[i].visible = false;
        }

        options = tmpoptions;

        accuseButton.visible = true;
        accuseButtonTxt.visible = true;
        accuseButtonTxt.setText("Accuse");

    },

    update: function () {

    },

    startDialogue: function() {
        //deactivate buttons
        leftButton.visible = false;
        rightButton.visible = false;
        inventoryButton.visible = false;

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

    render: function() {
        this.game.debug.text('Stage: Dining Hall' , 20, 20, 'black', 'Segoe UI');
    }
};