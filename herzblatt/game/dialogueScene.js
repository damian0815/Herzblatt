

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

var dialogueScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function dialogueScene ()
        {
            Phaser.Scene.call(this, { key: 'dialogueScene' });

            winAns = [0,0,0];
            selAns = [3];
            animationSpeed = [2, 2, 2, 4];
            dialogActive = 0;
            accuseCnt = 0;

            diaStyle =  { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" };
            diaButStyle = { font: "16px Sans Serif", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" }
            speechLvl = 0;

            this.questions = [2];
            this.questions[0] = new Question("Who let the dogs out");
            this.questions[0].addAnswer(new Answer("Who Who Who", -10, 10));
            this.questions[0].addAnswer(new Answer("You You You", 10, -10));
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
        dialogueText = this.add.text(dialogueBGBox.x + (gameWidth - textWidth)/2, dialogueBGBox.y - dialogueBGBox.displayHeight + 25, this.questions[0].question, diaStyle);
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

            buttonText[i] = this.add.text(posX+10, posY+10, this.questions[0].getAnswerManner(i), diaButStyle);

            dialogueButton[i].visible = true;
            buttonText[i].visible = true;

            posY += 45;
        }
    },

    onButtonClick: function(button) {
        console.log('Button clicked ' + button );
    }



});