

// CONSTANS

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

// Dialogue Spriets
// var DiagText;
// var DiagButtons = new Array(NO_DBUTTONS);
// var diagButtonText = new Array(NO_DBUTTONS);
// var DiagTextSyle;
// var DiagButTextStyle;


// Dialogue Variables

var dialogueScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function dialogueScene ()
        {
            Phaser.Scene.call(this, { key: 'dialogueScene' });

            // Load Text Styles


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


        // predefine dialogue box
        console.log(this.height);
        dialogueBGBox = this.add.sprite(0, gameHeight, 'dialogueBG').setOrigin(0,1);
        dialogueBGBox.displayWidth = gameWidth;
        dialogueBGBox.displayHeight = 240;
        //dialogueBGBox.inputEnabled = true;
        DiagText = this.add.text(dialogueBGBox.x + (gameWidth - textWidth)/2, dialogueBGBox.y - dialogueBGBox.displayHeight + 25, Questions[0].question, DiagTextSyle);
        DiagText.setOrigin(0,0);
        //diag exit button
        // diagExitButton = this.add.button(game.width - 50, dialogueBGBox.y - dialogueBGBox.height + 50, 'cls_button', this.diagExit, this);
        // diagExitButton.anchor.set(0,1);
        // diagExitButton.scale.set(0.5);


        dialogueBGBox.visible = true;
        DiagText.visible = true;
        // diagExitButton.visible = false;

        posX = Math.floor(dialogueBGBox.x + (gameWidth - textWidth)/2);
        posY = Math.floor(dialogueBGBox.y - dialogueBGBox.displayHeight + 50);
        // create dialogue buttons
        possibleAnswers = 2;
        for ( i = 0; i < NO_DBUTTONS; i++){

            DiagButtons[i] = this.add.sprite(posX,posY,'dialogueButton',).setOrigin(0,0).setInteractive();
            DiagButtons[i].on('pointerdown', this.onButtonClick.bind(this,i));
            DiagButtons[i].alpha = 0.3;

            DiagButtonText[i] = this.add.text(posX+10, posY+10, Questions[0].getAnswer(i), diaButStyle);

            DiagButtons[i].visible = true;
            DiagButtonText[i].visible = true;

            posY += 45;
        }
    },

    onButtonClick: function(button) {
        console.log('Button clicked ' + button );
    },



});