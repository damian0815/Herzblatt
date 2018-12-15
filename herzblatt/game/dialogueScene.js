

// Button Variables
var diaStyle;   // style for text
var diaButStyle;
var buttonText = [3];
var dialogueButton = [3]; // dialogue buttons
var buttonFollow = [4]; // follow ids
var questID = [4]; // saves the coressponding questID (if some is not shown)
var diagText;
var options; // # of options
var speechLvl; // 1 or 2 or 3 for level of speech -- 1 start - 2 npc resp - 3 npc quest

var animationSpeed;
var dialogActive;

var xoffset=10;
var yoffset=110;

//var questions = new Array(20);

// Dialogue Variables

var dialogueScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function dialogueScene ()
        {
            Phaser.Scene.call(this, { key: 'dialogueScene' });

            this.readDialogues();

            winAns = [0,0,0];
            selAns = [3];
            animationSpeed = [2, 2, 2, 4];
            dialogActive = 0;
            accuseCnt = 0;

            diaStyle =  { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" };
            diaButStyle = { font: "16px Sans Serif", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" }
            speechLvl = 0;

        },

    preload: function ()
    {
        this.load.image('dialogueBG', 'assets/buttons/dialogueBG.png');
        this.load.image('dialogueButton', 'assets/buttons/dialogueButton.png');
        this.load.image('spar', 'assets/pics/spar.PNG');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'spar').setAlpha(0.8);

        // this.input.once('pointerdown', function () {
        //
        //     console.log('From characterSelectScene to titleScene');
        //
        //     this.scene.start('titleScene');
        //
        // }, this);

        // predefine dialogue box
        console.log(this.height);
        dialogueBGBox = this.add.sprite(0, gameHeight, 'dialogueBG').setOrigin(0,1);
        dialogueBGBox.displayWidth = gameWidth;
        dialogueBGBox.displayHeight = 240;
        //dialogueBGBox.inputEnabled = true;
        dialogueText = this.add.text(dialogueBGBox.x + (gameWidth - textWidth)/2, dialogueBGBox.y - dialogueBGBox.displayHeight + 25, questions[0].question, diaStyle);
        dialogueText.setOrigin(0,0);
        //diag exit button
        // diagExitButton = this.add.button(game.width - 50, dialogueBGBox.y - dialogueBGBox.height + 50, 'cls_button', this.diagExit, this);
        // diagExitButton.anchor.set(0,1);
        // diagExitButton.scale.set(0.5);


        dialogueBGBox.visible = true;
        dialogueText.visible = true;
        // diagExitButton.visible = false;

        posX = Math.floor(dialogueBGBox.x + (gameWidth - textWidth)/2);
        posY = Math.floor(dialogueBGBox.y - dialogueBGBox.displayHeight + 50);
        // create dialogue buttons
        possibleAnswers = 2;
        for ( i = 0; i < possibleAnswers; i++){

            dialogueButton[i] = this.add.sprite(posX,posY,'dialogueButton',).setOrigin(0,0).setInteractive();
            dialogueButton[i].on('pointerdown', this.onButtonClick.bind(this,i));
            dialogueButton[i].alpha = 0.3;

            buttonText[i] = this.add.text(posX+10, posY+10, questions[0].getAnswer(i), diaButStyle);

            dialogueButton[i].visible = true;
            buttonText[i].visible = true;

            posY += 45;
        }
    },

    onButtonClick: function(button) {
        console.log('Button clicked ' + button );
    },


    readDialogues :function() {
        // //get start text
        // var startText = $('tw-passagedata[name="Question1"]').html();
        // helpText = startText.split("\n");
        //
        // // debug
        // console.log(helpText[0]);
        //
        // // Add Question
        // Questions[0] = new Question(helpText[0]);
        // console.log(Questions[0].question);
        //
        // options = helpText.length;
        //
        // var pos_answers;
        //
        // var k = 1, l = 0;
        // var first = true;
        // for (k=1; k < options; k++){
        //     if (helpText[k].startsWith("    "))
        //         helpText[k].replace("    ","");
        //     if (helpText[k].startsWith("\t"))
        //         helpText[k].replace("\t","");
        //     if (helpText[k].startsWith("[[") && first){
        //         pos_answers = [options - k];
        //         pos_answers[l++] = helpText[k];
        //         first = false;
        //     } else if (helpText[k].startsWith("[[")) {
        //         pos_answers[l++] = helpText[k];
        //     }
        // }
        //
        // console.log(pos_answers);
        //
        // // Create Foll/Manner/Text from pos_ans
        // for (i = 0; i < pos_answers.length; ++i) {
        //     var split_text = pos_answers[i].split("-&gt;");
        //     var split_ans = split_text[0].split("==");
        //     var ans_text = split_ans[0].replace("[[","");
        //     var mf_text = split_ans[1].split("=");
        //     var fool = parseInt(mf_text[0]);
        //     var manner = parseInt(mf_text[1]);
        //
        //     console.log(ans_text);
        //     console.log(manner);
        //     console.log(fool);
        //
        //
        //     Questions[0].addAnswer(new Answer(ans_text, manner, fool));
        // }



    }


});