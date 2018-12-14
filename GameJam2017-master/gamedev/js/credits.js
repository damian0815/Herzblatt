/**
 * Created by JostStefan on 29.04.2017.
 */
var sprite;
var text;
var offset=10;
var myStringArray = ["Game studio\nCrumbleMonster","Game Idea\nMathias Lux", "GRAPHICS\nElisabeth Millonig\nGernot Mihelcic\nEmir Sinanovic\nKristina Wogatai","Music\nPeter Hafele", "NARRATIVE\nErat Vanessa\nLippitz Armin\nMicconig Elisabeth","NARRATIVE\nWissiak Alexandra\nWogatai Kristina", "PROGRAMMING\nStefan Jost\nGernot Mihelcic\nMartin Scheiber\nEmir Sinanovic","This game was developed\nduring the 4th Klagenfurt\nGame Jam","Sponsored by\nANEXIA","No cookies were\nharmed during the\nmaking of this game"];
var i=0;
var button;

var creditState = {
    create: function() {
        backgroundSound.play();
        background = game.add.sprite(game.world.centerX, game.world.centerY, 'homescreen');
        background.anchor.set(0.5,0.5);
        background.scale.setTo(1280/background.width, 720/background.height);
        game.stage.backgroundColor = 0x5d5d5d;

        shadow = game.add.sprite(game.world.centerX, 720, 'cloud');
        shadow.anchor.set(0.5);
        shadow.tint = 0x000000;
        shadow.alpha = 0.6;

        sprite = game.add.sprite(game.world.centerX, 720, 'cloud');
        sprite.inputEnabled = true;
        sprite.anchor.set(0.55);

        var style = { font: "32px Arial", fill: "#b9130e", align: "center" };

        text = game.add.text(game.world.centerX,720, myStringArray[i], style);
        text.anchor.set(0.5,0.5);
        game.physics.enable(sprite, Phaser.Physics.ARCADE);

        //for button
        button = game.add.button(1200,30 , 'cls_button', this.backtomain, this);
        button.input.useHandCursor = true;
    },

    update: function() {
        sprite.body.velocity.y = 0;
        sprite.animations.play('run', 15, true);
        sprite.y -= 3;
        //damit der schatten "nachfliegt"
        shadow.x = sprite.x + offset.x;
        shadow.y = sprite.y + offset.y;
        if (sprite.y < -sprite.width)
        {
            sprite.y = 720;
            i++;
            text.setText(myStringArray[i]);
            if(i==9){i=0};///Abbruchbedingung zurueck ins Menue
        }
        //fuer die Aktualisierung der Textposition
        text.x=sprite.x;
        text.y=sprite.y;
    },

    backtomain: function(){
        //funktion um zum Hauptmenue zurueckzukehren
        backgroundSound.stop();
        game.state.start('home');
    },
}