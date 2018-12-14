/**
 * Created by Martin on 28.04.2017.
 */

var room02State = {

    create: function () {
        game.stage.backgroundColor = '#4c67c0';

        visitedR[1]=1;
        //background
        background = game.add.sprite(0,0, 'scene2');
        background.scale.setTo(1280/background.width, 720/background.height);
        item1Button = this.game.add.button(685, background.height-323, 'pasta', this.click, this);
        item1Button.scale.setTo(50/item1Button.width, 50/item1Button.height);
        game.world.sendToBack(item1Button);
        game.world.sendToBack(background);
        backgroundSound = game.add.audio('scene2sound');
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

        k=0;
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
        cookie01 = game.add.button(game.width/4,(game.height-textHeight)/2,'cookie01', this.startDialogue, this);
        cookie01.frame = 0;
        cookie01.anchor.set(0.5,0.5);
        cookie01.scale.set(0.7);

        cookie01.animations.add('C1_ani', [0,1], animationSpeed[0], true);
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
        cookie01.animations.play('C1_ani');

        // set bigger scale
        cookie01.scale.set(1);

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
        items[0].visible=true;
        found[0] = true;
        cookie02.visible=false;
        item1Button.visible=false;
        preGameState.actionOnItem1Click();
    },

    render: function() {
        this.game.debug.text('Stage: Cigar Room' , 20, 20, 'black', 'Segoe UI');
    }
};