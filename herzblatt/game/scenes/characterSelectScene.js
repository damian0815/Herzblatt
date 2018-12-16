

var characterSelectScene = new Phaser.Class({

    Extends: Phaser.Scene,

    kNumCharacters: 3,
    kXPositions: [ 302, 660, 945 ],
    kYPositions: [ 589/2, 589/2, 589/2 ],

    initialize:

        function characterSelectScene ()
        {
            Phaser.Scene.call(this, { key: 'characterSelectScene' });
        },

    preload: function ()
    {
        this.load.image('csbg', 'assets/pics/characterSelectBG.png');
        this.load.image('select', 'assets/pics/characterSelectHighlight.png');
        this.load.image('overlay', 'assets/pics/black_square.png')

        g_loadClick(this);
        g_loadSwish(this);

        //this.load.image('personADescription', 'assets/pics/characterADescription.png');
        //this.load.image('personBDescription', 'assets/pics/characterBDescription.png');
        //this.load.image('personCDescription', 'assets/pics/characterCDescription.png');
    },

    create: function ()
    {
        this.add.sprite(640, 360, 'csbg').setAlpha(1);

        for (var i = 0; i < this.kXPositions.length; i++) {
            var sprite = this.add.sprite(this.kXPositions[i], 589 / 2).setAlpha(0.1);
            sprite.displayWidth = 250;
            sprite.displayHeight = 589;
            sprite.setInteractive();

            var that = this;
            switch (i) {
                case 0:
                    sprite.on('pointerover', function (pointer) {
                        that.selectCharacter(0);
                    });
                    break;
                case 1:
                    sprite.on('pointerover', function (pointer) {
                        that.selectCharacter(1);
                    });
                    break;
                case 2:
                    sprite.on('pointerover', function (pointer) {
                        that.selectCharacter(2);
                    });
                    break;
                default:
                    break;
            }

            sprite.on('pointerdown', function(pointer) {
                that.pressedEnter(that);
            })

        }


        this.add.sprite(0, 500, 'personADescription').setAlpha(0);
        this.add.sprite(0, 500, 'personBDescription').setAlpha(0);
        this.add.sprite(0, 500, 'personCDescription').setAlpha(0);

        this.setupHighlight();

        this.selectCharacter(Phaser.Math.Between(0,2));

        this.setupKeyboardEvents();
    },

    selectCharacter: function(characterIndex)
    {
        this.selectedCharacterIndex = characterIndex;

        this.highlight.x = this.kXPositions[characterIndex];
        this.highlight.y = this.kYPositions[characterIndex];

        /*
        for (var i=0; i<this.kNumCharacters; i++) {
            personDescriptions[i].alpha = 0;
        }

        personDescriptions[characterIndex].alpha = 1;
        personDescriptions[characterIndex].x = this.kXPositions[characterIndex];*/
    },

    setupHighlight: function() {
        // additive blending
        var renderer = this.sys.game.renderer;
        var gl = renderer.gl;
        var additiveMode = [ gl.ONE, gl.ONE, gl.ONE, gl.ONE ];
        var additiveEquation = gl.FUNC_ADD;
        var blendModeIndex = renderer.addBlendMode(additiveMode, additiveEquation);
        this.highlight = this.add.sprite(0, 0, 'select').setBlendMode(blendModeIndex);
    },

    setupKeyboardEvents: function() {

        var that = this;


        this.input.keyboard.on('keydown_LEFT', function () {
            var currentIndex = that.selectedCharacterIndex;
            var newIndex = currentIndex - 1;
            if (newIndex == -1) {
                newIndex = that.kNumCharacters - 1;
            }
            g_playSwish(that);
            that.selectCharacter(newIndex);
        }, this);

        this.input.keyboard.on('keydown_RIGHT', function () {
            var currentIndex = that.selectedCharacterIndex;
            var newIndex = currentIndex + 1;
            if (newIndex == that.kNumCharacters) {
                newIndex = 0;
            }
            g_playSwish(that);
            that.selectCharacter(newIndex);
        }, this);

        this.input.keyboard.on('keydown_ENTER', function () {
            // var currentIndex = that.selectedCharacterIndex;
            // g_gameState.characterIndex = currentIndex;
            // g_playClick(that);
            // that.scene.start('questionIntroScene');
            that.pressedEnter(that);
        }, this);
    },

    pressedEnter: function(scene) {
        var currentIndex = scene.selectedCharacterIndex;
        g_gameState.characterIndex = currentIndex;
        g_playClick(scene);
        // scene.scene.start('questionIntroScene');
        scene.scene.start('loadingScene');
    }
});