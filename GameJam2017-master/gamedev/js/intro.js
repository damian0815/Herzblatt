/**
 * Created by Martin on 30.04.2017.
 */

var introStep;
var introSelOption;
var introText;
var introBox;
var introBoxTxt;
var introButton;
var introButtonTxt;
var currentText;
var introBG;
var downPossible;

var introState={
    init:function () {
        introStep = 0;
        introSelOption = 0;
        currentText = "";
        downPossible = true;
    },

    preload:function () {
        game.load.text('introText', 'assets/dialogues/introText');
        game.load.image('dialogueBG', 'assets/dialogueBG.png');
        game.load.image('dialogueButton', 'assets/dialogueButton.png');
        introStyle = { font: "16px Sans Serif", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" }
        introButStyle = { font: "16px Sans Serif", fill: "#000000", wordWrap: true, wordWrapWidth: 110, align: "justify" }
    },

    create:function () {
        // set background
        introBG = game.add.sprite(0,0, 'homescreen');
        introBG.scale.setTo(1280/introBG.width, 720/introBG.height);

        //split text file
        var helpText = game.cache.getText('introText');
        introText = helpText.split("\n");

        // create dialog bg
        introBox = this.game.add.sprite(0, game.height, 'dialogueBG');
        introBox.anchor.set(0,1);
        introBox.width = game.width;
        introBox.height = 240;
        //dialogueBGBox.inputEnabled = true;
        introBoxTxt = game.add.text(introBox.x + (game.width - 1100)/2, introBox.y - introBox.height + 25, "", introStyle);
        introBoxTxt.anchor.set(0,0);

        posX = Math.floor(game.width - (game.width - 1100)/2 - 110);
        posY = Math.floor(introBox.y - introBox.height + 50+3*45);
        // create dialogue button
        introButton = game.add.button(posX,posY,'dialogueButton', this.onClick, this);
        introButton.alpha = 0.3;
        introButton.scale.set(0.1,1);

        introButtonTxt = game.add.text(posX+10, posY+10, "", introButStyle);

        introButton.visible = false;
        introButtonTxt.visible = false;
        introBox.visible = false;
        introText.visible = false;
        intro1audio = game.add.audio('intro1');
        intro2audio = game.add.audio('intro2');
        intro3audio = game.add.audio('intro3');
        intro4audio = game.add.audio('intro4');
        intro5audio = game.add.audio('intro5');

        miss_maple = game.add.sprite(game.world.centerX, game.world.centerY-100, 'miss_maple');
        miss_maple.anchor.set(0.5,0.5);
        miss_maple.visible=false;
    },

    update:function () {
        if (downPossible)
            this.game.input.onDown.add(this.updateIntro, this);
    },

    updateIntro:function () {
        switch(introStep){
            case 0:
                introBox.visible = true;
                introBoxTxt.visible = true;
                this.playIntro();
                introSelOption++;
                break;
            case 1:
                this.playIntro();
                introSelOption++;
                break;
            case 2:
                downPossible = false;
                introStep++;
                this.playTutorial();
                break;
            default:
                break;
        }
    },

    playIntro:function () {
        var outText = introText[introSelOption].split("$");
        var tmpStep = outText[0].charCodeAt(0)-48;

        if (tmpStep === introStep){
            currentText +=  outText[1] + "\n";
        }
        else {
            introStep = tmpStep;
            currentText = outText[1] + "\n";
        }

        introBoxTxt.setText(currentText);
        if (introStep === 1)
            introBG.loadTexture('scene1');

        switch(introSelOption){
            case 0:
                backgroundmusic.volume=0.15;
                intro1audio.play();
                break;
            case 1:
                intro1audio.stop();
                intro2audio.play();
                break;
            case 2:
                intro2audio.stop();
                intro3audio.play();
                break;
            case 3:
                intro3audio.stop();
                intro4audio.play();
                break;
            case 4:
                intro4audio.stop();
                intro5audio.play();
                miss_maple.visible=true;
                break;
            default:
                break;
        }
    },

    playTutorial:function(){
        intro5audio.stop();
        miss_maple.visible=false;
        backgroundmusic.volume=0.5;
        introButtonTxt.setText("Next");
        introButton.visible = true;
        introButtonTxt.visible = true;
        var outText = introText[introSelOption++].split("$");
        currentText = outText[1] + "\n";

        introBoxTxt.setText(currentText);
    },

    onClick:function(){
        if (introSelOption === introText.length) {
            game.state.start('preGame');
        } else {
            var outText = introText[introSelOption].split("$");
            currentText += outText[1] + "\n";
            if(introSelOption === introText.length-1) {
                introButtonTxt.setText("Start");
            }

            introBoxTxt.setText(currentText);
            introSelOption++;
        }

    }


};