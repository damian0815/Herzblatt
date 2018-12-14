/**
 * Created by Martin on 28.04.2017.
 */

var diaStyle;   // style for text
var diaButStyle;
var buttonText = [4];
var dialogueButton = [4]; // dialogue buttons
var buttonFollow = [4]; // follow ids
var questID = [4]; // saves the coressponding questID (if some is not shown)
var diagExitButton;
var diagText;
var options; // # of options
var speechLvl; // 1 or 2 or 3 for level of speech -- 1 start - 2 npc resp - 3 npc quest

var popup;
var popupItem1;
var popupItem2;
var popupItem3;
var popupItem4;
var tween=null;
var leftButton;
var rightButton;
var inventoryButton;
var textinpopup;
var nritems=8;
var items = [nritems];

var animationSpeed;
var dialogActive;

var xoffset=10;
var yoffset=110;

var cookie00;
var cookie01;
var cookie02;
var cookie03;
var cookie04;

var winAns;
var selAns;
var accuseCnt;
var accuseStartText = [2];

var preGameState = {

    init: function(){

        winAns = [0,0,0];
        selAns = [3];
        animationSpeed = [2, 2, 2, 4];
        dialogActive = 0;
        accuseCnt = 0;

        diaStyle =  { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" };
        diaButStyle = { font: "16px Sans Serif", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" }
        speechLvl = 0;
    },

    preload: function(){
        game.load.image('dialogueBG', 'assets/dialogueBG.png');
        game.load.image('dialogueButton', 'assets/dialogueButton.png');

        game.load.spritesheet('cookie01', 'assets/cookies/EsmeraldaGallettaSprite.png',450,450);
        game.load.spritesheet('cookie02', 'assets/cookies/FrancescaBiscottoSprite.png',450,450);
        game.load.spritesheet('cookie03', 'assets/cookies/ReverendSloaneSconeSprite.png',450,450);
        game.load.spritesheet('cookie04', 'assets/cookies/WoodyWaferSprite.png',450,450);
    },

    create: function () {
        // create buttons
        this.createButtons();

        // switch to correct room
        var room = 'room0' + level;
        game.state.start(room,false);

        ////// BEGIN FROM BUTTONS

        //  pop-up window
        popup = this.game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        popup.anchor.set(0.5,0.5);
        popup.visible = false;
        popup.scale.set(0.1);
        var pw = (popup.width / 2);
        var ph = (popup.height / 2);

        /*
         FOR ITEM --- START
         */
        //ITEM 1
        popupItem1 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItem1.visible=false;
        popupItem1.anchor.set(0.5);
        popupItem1.inputEnabled = true;
        popupItem1.scale.set(0.1);
        var pw2 = (popupItem1.width/2);
        var ph2 = (popupItem1.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "\"Hmmm, Victor's last meal. I hope it was worth...every last...penne.\"", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'pasta');
        objectinpopuop.scale.setTo(200/objectinpopuop.width, 200/objectinpopuop.height);
        objectinpopuop.anchor.set(0.5,0.5);
        popupItem1.addChild(textinpopup);
        popupItem1.addChild(textbox);
        popupItem1.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItem1closeClick, this);
        popupItem1.addChild(itemcloseButton);

        //ITEM 2
        popupItem2 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItem2.visible=false;
        popupItem2.anchor.set(0.5);
        popupItem2.inputEnabled = true;
        popupItem2.scale.set(0.1);
        var pw2 = (popupItem2.width/2);
        var ph2 = (popupItem2.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "\"I doubt it was the Unicorn Union that ended Victor.\"", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'unicorn');
        objectinpopuop.scale.setTo(200/objectinpopuop.width, 200/objectinpopuop.height);
        objectinpopuop.anchor.set(0.5,0.5);
        popupItem2.addChild(textinpopup);
        popupItem2.addChild(textbox);
        popupItem2.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItem2closeClick, this);
        popupItem2.addChild(itemcloseButton);

        //ITEM 3
        popupItem3 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItem3.visible=false;
        popupItem3.anchor.set(0.5);
        popupItem3.inputEnabled = true;
        popupItem3.scale.set(0.1);
        var pw2 = (popupItem3.width/2);
        var ph2 = (popupItem3.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "\"Aha. Junk.\"", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'VR');
        objectinpopuop.scale.setTo(200/objectinpopuop.width, 200/objectinpopuop.height);
        objectinpopuop.anchor.set(0.5,0.5);
        popupItem3.addChild(textinpopup);
        popupItem3.addChild(textbox);
        popupItem3.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItem3closeClick, this);
        popupItem3.addChild(itemcloseButton);

        //ITEM 4
        popupItem4 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItem4.visible=false;
        popupItem4.anchor.set(0.5);
        popupItem4.inputEnabled = true;
        popupItem4.scale.set(0.1);
        var pw2 = (popupItem4.width/2);
        var ph2 = (popupItem4.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "\"Ahh. This is, I must say, a damn fine cup of coffee.\"", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'coffee');
        objectinpopuop.scale.setTo(200/objectinpopuop.width, 200/objectinpopuop.height);
        objectinpopuop.anchor.set(0.5,0.5);
        popupItem4.addChild(textinpopup);
        popupItem4.addChild(textbox);
        popupItem4.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItem4closeClick, this);
        popupItem4.addChild(itemcloseButton);
        //ITEM 5
        popupItem5 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItem5.visible=false;
        popupItem5.anchor.set(0.5);
        popupItem5.inputEnabled = true;
        popupItem5.scale.set(0.1);
        var pw2 = (popupItem5.width/2);
        var ph2 = (popupItem5.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "A notice from Victor the Victim’s butler reveals that at the time of the murder, the Lindwurm statue was in the basement for polishing.", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'lindwurm');
        objectinpopuop.scale.setTo(200/objectinpopuop.width, 200/objectinpopuop.height);
        objectinpopuop.anchor.set(0.5,0.5);
        popupItem5.addChild(textinpopup);
        popupItem5.addChild(textbox);
        popupItem5.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItem5closeClick, this);
        popupItem5.addChild(itemcloseButton);
        //ITEM 6
        popupItem6 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItem6.visible=false;
        popupItem6.anchor.set(0.5);
        popupItem6.inputEnabled = true;
        popupItem6.scale.set(0.1);
        var pw2 = (popupItem6.width/2);
        var ph2 = (popupItem6.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "Forensics analysis reveals that the crumble patterns at the crime scene correspond to the measurements of a medium-sized syringe.", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'milk_syringe');
        objectinpopuop.scale.setTo(200/objectinpopuop.width, 200/objectinpopuop.height);
        objectinpopuop.anchor.set(0.5,0.5);
        popupItem6.addChild(textinpopup);
        popupItem6.addChild(textbox);
        popupItem6.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItem6closeClick, this);
        popupItem6.addChild(itemcloseButton);
        //ITEM 7
        popupItem7 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItem7.visible=false;
        popupItem7.anchor.set(0.5);
        popupItem7.inputEnabled = true;
        popupItem7.scale.set(0.1);
        var pw2 = (popupItem7.width/2);
        var ph2 = (popupItem7.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "After careful investigation, you have to conclude that the cookie cutter is blunt and rusty.", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'cookie_cutter');
        objectinpopuop.scale.setTo(200/objectinpopuop.width, 200/objectinpopuop.height);
        objectinpopuop.anchor.set(0.5,0.5);
        popupItem7.addChild(textinpopup);
        popupItem7.addChild(textbox);
        popupItem7.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItem7closeClick, this);
        popupItem7.addChild(itemcloseButton);
        //ITEM 8
        popupItem8 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItem8.visible=false;
        popupItem8.anchor.set(0.5);
        popupItem8.inputEnabled = true;
        popupItem8.scale.set(0.1);
        var pw2 = (popupItem8.width/2);
        var ph2 = (popupItem8.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "Marcia the Cook swears that the measuring spoon was in the dishwasher at the time of the murder.", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'spoon');
        objectinpopuop.scale.setTo(200/objectinpopuop.width, 200/objectinpopuop.height);
        objectinpopuop.anchor.set(0.5,0.5);
        popupItem8.addChild(textinpopup);
        popupItem8.addChild(textbox);
        popupItem8.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItem8closeClick, this);
        popupItem8.addChild(itemcloseButton);

        //Anexia CEO hint
        popupItemHint1 = game.add.sprite(game.world.centerX, game.world.centerY, 'object_background');
        popupItemHint1.visible=false;
        popupItemHint1.anchor.set(0.5);
        popupItemHint1.inputEnabled = true;
        popupItemHint1.scale.set(0.1);
        var pw2 = (popupItemHint1.width/2);
        var ph2 = (popupItemHint1.height/2);
        textinpopup=this.game.add.sprite(-pw2*10+30, 50, 'txtbackground');
        textinpopup.anchor.set(0,0);
        var style = { font: "32px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textinpopup.width, align: "center"};
        textbox = game.add.text(0, 0, "Alexander Windbichler\nCEO, ANEXIA Internetdienstleistungs GmbH\n\"Thats not very useful but nice to know.\"", style);
        textbox.anchor.set(0.5,0.5);
        //position vom text im popup
        textbox.x = Math.floor(pw2*10-510);
        textbox.y = Math.floor(ph2*10-140);
        var objectinpopuop=game.make.sprite(0,-ph2*10/2, 'picture');
        objectinpopuop.scale.set(1);//veraendert die groesse vom object im popup
        objectinpopuop.anchor.set(0.5,0.5);
        popupItemHint1.addChild(textinpopup);
        popupItemHint1.addChild(textbox);
        popupItemHint1.addChild(objectinpopuop);
        itemcloseButton = this.game.make.sprite(pw2*10-20, -ph2*10+20, 'cls_button');
        itemcloseButton.inputEnabled = true;
        itemcloseButton.scale.set(1);
        itemcloseButton.anchor.set(1,0);
        itemcloseButton.input.priorityID = 1;
        itemcloseButton.input.useHandCursor = true;
        itemcloseButton.events.onInputDown.add(this.actionOnItemHint1closeClick, this);
        popupItemHint1.addChild(itemcloseButton);
        /*
         FOR ITEM --- END
         */

        closeButton = this.game.make.sprite(pw*10-20, -ph*10+20, 'cls_button');
        closeButton.inputEnabled = true;
        closeButton.anchor.set(1,0);
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(this.actionOnInventoryExitClick, this);
        //  Add the "close button" to the popup window image
        popup.addChild(closeButton);

        //repeat for every item                                    i
        items[0] = this.game.make.sprite(-(popup.width / 2) * 10 + 0 * 60 + 20 + xoffset, -(popup.height / 2) * 10 + 80+yoffset, 'pasta');
        items[0].scale.setTo(50/items[0].width, 50/items[0].height);
        items[0].inputEnabled = true;
        items[0].visible= false;
        items[0].input.priorityID = 1;
        items[0].input.useHandCursor = true;
        items[0].events.onInputDown.add(this.actionOnItem1Click, this);
        popup.addChild(items[0]);
        items[1] = this.game.make.sprite(-(popup.width / 2) * 10 + 1 * 60 + 20 + xoffset, -(popup.height / 2) * 10 + 80+yoffset, 'unicorn');
        items[1].scale.setTo(50/items[1].width, 50/items[1].height);
        items[1].inputEnabled = true;
        items[1].visible= false;
        items[1].input.priorityID = 1;
        items[1].input.useHandCursor = true;
        items[1].events.onInputDown.add(this.actionOnItem2Click, this);
        popup.addChild(items[1]);
        items[2] = this.game.make.sprite(-(popup.width / 2) * 10 + 2 * 60 + 20 + xoffset, -(popup.height / 2) * 10 + 80+yoffset, 'VR');
        items[2].scale.setTo(50/items[2].width, 50/items[2].height);
        items[2].inputEnabled = true;
        items[2].visible= false;
        items[2].input.priorityID = 1;
        items[2].input.useHandCursor = true;
        items[2].events.onInputDown.add(this.actionOnItem3Click, this);
        popup.addChild(items[2]);
        items[3] = this.game.make.sprite(-(popup.width / 2) * 10 + 3 * 60 + 20 + xoffset, -(popup.height / 2) * 10 + 80+yoffset, 'coffee');
        items[3].scale.setTo(50/items[3].width, 50/items[3].height);
        items[3].inputEnabled = true;
        items[3].visible= false;
        items[3].input.priorityID = 1;
        items[3].input.useHandCursor = true;
        items[3].events.onInputDown.add(this.actionOnItem4Click, this);
        popup.addChild(items[3]);
        items[4] = this.game.make.sprite(-(popup.width / 2) * 10 + 0 * 60 + 20 + xoffset, -(popup.height / 2) * 10 + 20+yoffset, 'lindwurm');
        items[4].scale.setTo(50/items[4].width, 50/items[4].height);
        items[4].inputEnabled = true;
        items[4].visible= false;
        items[4].input.priorityID = 1;
        items[4].input.useHandCursor = true;
        items[4].events.onInputDown.add(this.actionOnItem5Click, this);
        popup.addChild(items[4]);
        items[5] = this.game.make.sprite(-(popup.width / 2) * 10 + 1 * 60 + 20 + xoffset, -(popup.height / 2) * 10 + 20+yoffset, 'milk_syringe');
        items[5].scale.setTo(50/items[5].width, 50/items[5].height);
        items[5].inputEnabled = true;
        items[5].visible= false;
        items[5].input.priorityID = 1;
        items[5].input.useHandCursor = true;
        items[5].events.onInputDown.add(this.actionOnItem6Click, this);
        popup.addChild(items[5]);
        items[6] = this.game.make.sprite(-(popup.width / 2) * 10 + 2 * 60 + 20 + xoffset, -(popup.height / 2) * 10 + 20+yoffset, 'cookie_cutter');
        items[6].scale.setTo(50/items[6].width, 50/items[6].height);
        items[6].inputEnabled = true;
        items[6].visible= false;
        items[6].input.priorityID = 1;
        items[6].input.useHandCursor = true;
        items[6].events.onInputDown.add(this.actionOnItem7Click, this);
        popup.addChild(items[6]);
        items[7] = this.game.make.sprite(-(popup.width / 2) * 10 + 3 * 60 + 20 + xoffset, -(popup.height / 2) * 10 + 20+yoffset, 'spoon');
        items[7].scale.setTo(50/items[7].width, 50/items[7].height);
        items[7].inputEnabled = true;
        items[7].visible= false;
        items[7].input.priorityID = 1;
        items[7].input.useHandCursor = true;
        items[7].events.onInputDown.add(this.actionOnItem8Click, this);
        popup.addChild(items[7]);

        for(var i=0;i<nritems;i++){
            if(found[i]==true){
                items[i].visible=true;
            }
        }

        //Audio

        ////// END FROM BUTTONS

        // predefine dialogue box
        dialogueBGBox = this.game.add.sprite(0, game.height, 'dialogueBG');
        dialogueBGBox.anchor.set(0,1);
        dialogueBGBox.width = game.width;
        dialogueBGBox.height = 240;
        //dialogueBGBox.inputEnabled = true;
        dialogueText = game.add.text(dialogueBGBox.x + (game.width - 1100)/2, dialogueBGBox.y - dialogueBGBox.height + 25, "other rooms", diaStyle);
        dialogueText.anchor.set(0,0);
        //diag exit button
        diagExitButton = this.game.add.button(game.width - 50, dialogueBGBox.y - dialogueBGBox.height + 50, 'cls_button', this.diagExit, this);
        diagExitButton.anchor.set(0,1);
        diagExitButton.scale.set(0.5);


        dialogueBGBox.visible = false;
        dialogueText.visible = false;
        diagExitButton.visible = false;


        posX = Math.floor(dialogueBGBox.x + (game.width - 1100)/2);
        posY = Math.floor(dialogueBGBox.y - dialogueBGBox.height + 50);
        // create dialogue buttons
        for ( i = 0; i < possibleAnswers; i++){

            dialogueButton[i] = game.add.button(posX,posY,'dialogueButton',this.onButtonClick.bind(this,i), this);
            dialogueButton[i].alpha = 0.3;

            buttonText[i] = game.add.text(posX+10, posY+10, "", diaButStyle);

            dialogueButton[i].visible = false;
            buttonText[i].visible = false;

            posY += 45;
        }

        posX = Math.floor(game.width - (game.width - 1100)/2 - 110);
        posY = Math.floor(dialogueBGBox.y - dialogueBGBox.height + 50+3*45);
        accuseButton = game.add.button(posX,posY,'dialogueButton', this.accuseClick, this);
        accuseButton.alpha = 1;
        accuseButton.scale.set(0.1,1);

        accuseButtonTxt = game.add.text(posX+10, posY+10, "", introButStyle);

        accuseButton.visible = false;
        accuseButtonTxt.visible = false;
    },

    accuseClick: function () {
        //deactivate buttons
        leftButton.visible = false;
        rightButton.visible = false;
        inventoryButton.visible = false;

        dialogueText.setText(accuseStartText[accuseCnt]);
        // enable dialogue
        dialogueBGBox.visible=true;
        dialogueText.visible=true;
        diagExitButton.visible=true;

        if(accuseCnt === 0){
            accuseButtonTxt.setText("next");
            accuseCnt++;
        } else {
            accuseButton.visible = false;
            accuseButtonTxt.visible = false;
            // enable user buttons
            for (i = 0; i < options; ++i){
                dialogueButton[i].visible = true;
                buttonText[i].visible = true;
            }
        }


    },

    ///// CHANGED BY BUTTONS
    createButtons: function () {
        //create buttons
        leftButton = this.game.add.button(50, game.world.centerY, 'arrowleft', this.actionOnLeftClick, this);
        leftButton.anchor.set(0.5,0.5);
        leftButton.scale.set(0.5);
        rightButton = this.game.add.button(game.width-50, game.world.centerY, 'arrowright', this.actionOnRightClick, this);
        rightButton.anchor.set(0.5,0.5);
        rightButton.scale.set(0.5);
        inventoryButton = this.game.add.button(game.width, 0, 'inventory', this.actionOnInventoryClick, this);
        inventoryButton.anchor.set(1,0);
    },


    /////// DIALOUGE START
    onButtonClick: function (button) {
        // disable dialouge
        dialogueText.visible = false;
        // disable buttons
        for (i = 0; i < possibleAnswers; ++i){
            dialogueButton[i].visible = false;
            buttonText[i].visible = false;
        }

        if(level === 4) {
            // set clicked button
            selAns[speechLvl] = button;
            if (speechLvl === 2){
                game.state.start('end');
            }
            this.accuseSpeech(button);
            speechLvl++;

        } else {
            switch (speechLvl){
                case 0:
                    this.speechLvl0(button);
                    ++speechLvl;
                    break;
                case 1:
                    this.speechLvl1();
                    ++speechLvl;
                    break;
                case 2:
                    this.speechLvl2(button);
                    ++speechLvl;
                    break;
                default:
                    this.diagExit();
                    break;
            }
        }

    },

    accuseSpeech:function(button) {

        //get next
        var follow = buttonFollow[button];
        var diagRawText = $('tw-passagedata[name="' + follow + '"]').html();
        helpText = diagRawText.split("\n");

        options = helpText.length;
        dialogueText.setText("");

        var k = 0, l = 0;
        var first = true;
        for (k=0; k < options; k++){
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

        for ( i = 0; i < options && speechLvl !== 1; i++){
            // create button
            var diagSplit = diagText[i].split("-&gt;");
                buttonFollow[i] = diagSplit[1].replace("]]","");

            diagSplit[0] = diagSplit[0].replace("[[","");
            if(diagSplit[0].startsWith("*")){
                diagSplit[0] = diagSplit[0].replace("*","");
                var depends = diagSplit[0].split("*");
                diagSplit[0] = depends[1];

                winAns[speechLvl+1] = i;
            }

            questID[i] = i;
            buttonText[i].setText(diagSplit[0]);
            buttonText[i].visible = true;
            dialogueButton[i].visible = true;
        }

        for ( i = 0; i < options && speechLvl === 1; i++){
            // create button
            var diagSplit = diagText[i].replace("]]","");

            diagSplit = diagSplit.replace("[[","");
            if(diagSplit.startsWith("*")){
                diagSplit = diagSplit.replace("*","");
                var depends = diagSplit.split("*");
                diagSplit = depends[1];

                winAns[speechLvl+1] = i;
            }

            questID[i] = i;
            buttonText[i].setText(diagSplit);
            buttonText[i].visible = true;
            dialogueButton[i].visible = true;
        }

        dialogueBGBox.visible=true;
        dialogueText.visible=true;


        options = tmpoptions;
    },

    speechLvl0:function (button) {
        // get next text
        var follow = buttonFollow[button];
        var answerRawText = $('tw-passagedata[name="' + follow + '"]').html();

        // set which button has been clicked
        var questAns = questID[button];
        diagClicked[level-1][0][questAns] = 1;

        // parse text
        var answerText = answerRawText.split("\n");

        dialogueText.setText(answerText[0]);
        dialogueText.visible = true;

        var i = 1;
        while(!answerText[i].startsWith("[[")){
            ++i;
        }

        var buttonTexts = answerText[i].split("-&gt;")
        buttonFollow[0] = buttonTexts[1].replace("]]","");

        buttonText[3].setText(buttonTexts[0].replace("[[",""));
        buttonText[3].visible = true;
        dialogueButton[3].visible = true;
    },

    speechLvl1:function () {
        // get next text
        var follow = buttonFollow[0];
        var diagRawText = $('tw-passagedata[name="' + follow + '"]').html();
        helpText = diagRawText.split("\n");

        options = helpText.length;
        dialogueText.setText(helpText[0]);

        var k = 1, l = 0;
        var first = true;
        for (k=1; k < options; k++){
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
            dialogueButton[i-k].visible = true;
            buttonText[i-k].visible = true;
        }

        dialogueBGBox.visible=true;
        dialogueText.visible=true;

        options = tmpoptions;
    },

    speechLvl2:function (button) {
        // get next text
        var follow = buttonFollow[button];
        var answerRawText = $('tw-passagedata[name="' + follow + '"]').html();

        // set which button has been clicked
        var questAns = questID[button];
        diagClicked[level-1][1][questAns] = 1;

        // parse text
        var answerText = answerRawText.split("\n");

        dialogueText.setText(answerText[0]);
        dialogueText.visible = true;

        var i = 1;
        while(!answerText[i].startsWith("[[")){
            ++i;
        }

        var buttonTexts = answerText[i].split("-&gt;")
        var quitText = buttonTexts[0].replace("[[","");
        var gainedItem;

        if (quitText.startsWith("*")){
            gainedItem = quitText.replace("*","");
            gainedItem = quitText.split("*");

            //TODO:add object to inventory here

            buttonText[3].setText(gainedItem[1]);
        } else {
            buttonText[3].setText(quitText);
        }

        buttonText[3].visible = true;
        dialogueButton[3].visible = true;
    },

    diagExit:function() {
        //disable dialog window
        dialogueBGBox.visible = false;
        dialogueText.visible = false;
        diagExitButton.visible = false;
        // disable buttons
        for (i = 0; i < possibleAnswers; ++i){
            dialogueButton[i].visible = false;
            buttonText[i].visible = false;
        }

        //reactivate buttons
        leftButton.visible = true;
        rightButton.visible = true;
        inventoryButton.visible = true;

        //stop animation
        switch (level){
            case 2:
                cookie01.animations.stop();
                cookie01.frame = 0;
                cookie01.scale.set(0.7);
                break;
            case 3:
                cookie02.animations.stop();
                cookie02.frame = 0;
                cookie02.scale.set(0.7);
                break;
            case 5:
                cookie03.animations.stop();
                cookie03.frame = 0;
                cookie03.scale.set(0.7);
                break;
            case 6:
                cookie04.animations.stop();
                cookie04.frame = 0;
                cookie04.scale.set(0.7);
                break;

            default:
                break;
        }

        // reset variables
        speechLvl = 0;
    },

    /////// DIALOUGE END

    /**
     * Actionhandler for left button
     */
    actionOnLeftClick: function() {
        level = level-1<1 ? rooms : --level;
        backgroundSound.stop();
        clickSound.play();
        game.state.start('preGame');
    },

    /**
     * Actionhandler for right button
     */
    actionOnRightClick: function() {
        level = level+1>rooms ? 1 : ++level;
        backgroundSound.stop();
        clickSound.play();
        game.state.start('preGame');
    },

    /**
     * Actionhandler for inventory button
     */
    actionOnInventoryClick: function(){
        if ((tween !== null && tween.isRunning) || popup.scale.x === 1)
        {
            return;
        }
        popup.visible=true;
        closeButton.inputEnabled=true;
        closeButton.visible=true;
        items[2].inputEnabled = true;

        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;

        this.disableitembuttons();

        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for inventory exit button
     */
    actionOnInventoryExitClick: function(){
        if (tween && tween.isRunning || popup.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popup.visible = false;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible=true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },

    /**
     * Actionhandler for item 1 click
     */
    actionOnItem1Click: function(){
        if ((tween !== null && tween.isRunning) || popupItem1.scale.x === 1)
        {
            return;
        }
        popupItem1.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItem1.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item 1 close button
     */
    actionOnItem1closeClick: function(){
        if (tween && tween.isRunning || popupItem1.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItem1.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItem1.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },
    /**
     * Actionhandler for item 2 click
     */
    actionOnItem2Click: function(){
        if ((tween !== null && tween.isRunning) || popupItem2.scale.x === 1)
        {
            return;
        }
        popupItem2.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItem2.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item 2 close button
     */
    actionOnItem2closeClick: function(){
        if (tween && tween.isRunning || popupItem2.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItem2.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItem2.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },
    /**
     * Actionhandler for item 3 click
     */
    actionOnItem3Click: function(){
        if ((tween !== null && tween.isRunning) || popupItem3.scale.x === 1)
        {
            return;
        }
        popupItem3.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItem3.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item 3 close button
     */
    actionOnItem3closeClick: function(){
        if (tween && tween.isRunning || popupItem3.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItem3.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItem3.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },
    /**
     * Actionhandler for item 4 click
     */
    actionOnItem4Click: function(){
        if ((tween !== null && tween.isRunning) || popupItem4.scale.x === 1)
        {
            return;
        }
        popupItem4.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItem4.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item 4 close button
     */
    actionOnItem4closeClick: function(){
        if (tween && tween.isRunning || popupItem4.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItem4.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItem4.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },
    /**
     * Actionhandler for item 5 click
     */
    actionOnItem5Click: function(){
        if ((tween !== null && tween.isRunning) || popupItem5.scale.x === 1)
        {
            return;
        }
        popupItem5.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItem5.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item 5 close button
     */
    actionOnItem5closeClick: function(){
        if (tween && tween.isRunning || popupItem5.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItem5.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItem5.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },
    /**
     * Actionhandler for item 6 click
     */
    actionOnItem6Click: function(){
        if ((tween !== null && tween.isRunning) || popupItem6.scale.x === 1)
        {
            return;
        }
        popupItem6.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItem6.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item 6 close button
     */
    actionOnItem6closeClick: function(){
        if (tween && tween.isRunning || popupItem6.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItem6.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItem6.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },
    /**
     * Actionhandler for item 7 click
     */
    actionOnItem7Click: function(){
        if ((tween !== null && tween.isRunning) || popupItem7.scale.x === 1)
        {
            return;
        }
        popupItem7.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItem7.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item 7 close button
     */
    actionOnItem7closeClick: function(){
        if (tween && tween.isRunning || popupItem7.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItem7.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItem7.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },
    /**
     * Actionhandler for item 8 click
     */
    actionOnItem8Click: function(){
        if ((tween !== null && tween.isRunning) || popupItem8.scale.x === 1)
        {
            return;
        }
        popupItem8.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItem8.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item 8 close button
     */
    actionOnItem8closeClick: function(){
        if (tween && tween.isRunning || popupItem8.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItem8.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItem8.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
    },
    /**
     * Actionhandler for item hint 1 click
     */
    actionOnItemHint1Click: function(){
        if ((tween !== null && tween.isRunning) || popupItemHint1.scale.x === 1)
        {
            return;
        }
        popupItemHint1.visible=true;
        leftButton.inputEnabled = false;
        leftButton.visible = false;
        rightButton.inputEnabled = false;
        rightButton.visible = false;
        inventoryButton.inputEnabled = false;
        inventoryButton.visible=false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = false;
        }
        closeButton.inputEnabled=false;
        closeButton.visible=false;

        this.disableitembuttons();
        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        clickSound.play();
        tween = game.add.tween(popupItemHint1.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    },

    /**
     * Actionhandler for item hint 1 close button
     */
    actionOnItemHint1closeClick: function(){
        if (tween && tween.isRunning || popupItemHint1.scale.x === 0.1)
        {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        clickSound.play();
        tween = game.add.tween(popupItemHint1.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
        popupItemHint1.visible = false;
        for(var i=0;i<nritems;i++) {
            items[i].inputEnabled = true;
        }
        closeButton.inputEnabled=true;
        closeButton.visible= true;
        leftButton.inputEnabled = true;
        leftButton.visible = true;
        rightButton.inputEnabled = true;
        rightButton.visible = true;
        inventoryButton.inputEnabled = true;
        inventoryButton.visible=true;

        this.enableitembuttons();
        try {
            picture.visible = true;
            item1Button.visible=true;
        }catch (err){

        }
    },
    update: function () {
        if(dialogActive == 1){
            leftButton.visible = false;
            rightButton.visible = false;
        }
    },

    disableitembuttons: function(){
        switch (level){
            case 1:
                cookie00.visible = false;
                item5Button.visible=false;
                item6Button.visible=false;
                item7Button.visible=false;
                item8Button.visible=false;
                break;
            case 2:
                cookie01.visible = false;
                item1Button.visible=false;
                break;
            case 3:
                cookie02.visible = false;
                item2Button.visible=false;
                break;
            case 5:
                cookie03.visible = false;
                item3Button.visible=false;
                break;
            case 6:
                cookie04.visible = false;
                item4Button.visible=false;
                picture.visible=false;
                break;
            default:
                break;
        }
    },

    enableitembuttons: function () {
        switch (level){
            case 1:
                cookie00.visible = true;
                item5Button.visible=true;
                item6Button.visible=true;
                item7Button.visible=true;
                item8Button.visible=true;
                break;
            case 2:
                cookie01.visible = true;
                item1Button.visible=true;
                break;
            case 3:
                cookie02.visible = true;
                item2Button.visible=true;
                break;
            case 5:
                cookie03.visible = true;
                item3Button.visible=true;
                break;
            case 6:
                cookie04.visible = true;
                item4Button.visible=true;
                picture.visible=true;
                break;
            default:
                break;
        }
    }
    /*render: function() {
        this.game.debug.text('Stage: ' + level, 20, 20, 'black', 'Segoe UI');
    }*/
};