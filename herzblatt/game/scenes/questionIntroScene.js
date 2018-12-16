var ANOUNCER_TEXTS = 4;
var ANOUNCER_VAR_SIZE = 2;
var ANOUNCER_VAR_TEXTS = 4;

// TODO(martin: keyboard support for this scene

var questionIntroScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function questionIntroScene ()
        {
            Phaser.Scene.call(this, { key: 'questionIntroScene' });

            this.HudDiagBGCon = new HudDiagBase(this);
            this.nextButtonCon = new NextButtonComponent(this);
            this.charDisplayCon = new CharDisplayComponent(this);
            this.introAudioCon = new IntroAudio(this);
            this.readIntroText();

            this.anouncer_lvl = 0;
            this.audio_played = false;
        },

    preload: function ()
    {
        this.load.image('qibg', 'assets/pics/questionIntroSceneBG.jpg');

        // Load Background
        g_loadAllBG(this);

        // Load Diag
        this.HudDiagBGCon.preload();
        this.nextButtonCon.preload();
        this.charDisplayCon.preload();
        this.introAudioCon.preload()
    },

    create: function ()
    {
        // Create Background
        g_addAllBG(this);

        // Create Diag
        this.HudDiagBGCon.createBase();
        this.nextButtonCon.create();
        this.charDisplayCon.create();
        this.introAudioCon.create();

        // Generate Intro Text
        this.genIntroText();

        this.add.text(100, 100, 'questionIntroSceneBG.jpg\n\nIntro to game. Click to continue.');

        // this.input.once('pointerdown', function () {
        //     this.scene.start('bachelorScene');
        // }, this);
        var that = this;
        this.nextButton.on('pointerdown', function(pointer) {
            console.log("Pressed NEXT.");

            if (++that.anouncer_lvl >= ANOUNCER_TEXTS){
                that.scene.start('bachelorScene');
            } else {
                that.audio_played = false;
            }
        });
    },

    update: function() {

        // Display Text and play Audio
        if (!this.audio_played) {
            console.log(g_gameState.characterIndex);

            switch (this.anouncer_lvl) {
                case 0:
                    this.charDisplayCon.setCanAVisibility();
                    this.introAudioCon.playAnnouncerAudio(this.anouncer_lvl);
                    if (g_gameState.characterIndex === 0) {
                        this.HudDiagBGCon.setDiagText(this.anouncer_texts[0] + this.anouncer_var_texts[0][this.rand_player]);
                        // this.introAudioCon.playAnnouncerVarAudio(0, this.rand_player, 5.0);
                    } else {
                        this.HudDiagBGCon.setDiagText(this.anouncer_texts[0] + this.anouncer_var_texts[1][this.rand_c1]);
                        // this.introAudioCon.playAnnouncerAudio(1, this.rand_c1);
                    }
                    break;
                case 1:
                    this.charDisplayCon.setCanBVisibility();
                    if (g_gameState.characterIndex === 1)
                        this.HudDiagBGCon.setDiagText(this.anouncer_texts[1]  + this.anouncer_var_texts[0][this.rand_player]);
                    else{
                        if (g_gameState.characterIndex === 0)
                            this.HudDiagBGCon.setDiagText(this.anouncer_texts[1] + this.anouncer_var_texts[1][this.rand_c1]);
                        else
                            this.HudDiagBGCon.setDiagText(this.anouncer_texts[1] + this.anouncer_var_texts[1][this.rand_c2]);
                    }
                    break;
                case 2:
                    this.charDisplayCon.setCanCVisibility();
                    if (g_gameState.characterIndex === 2)
                        this.HudDiagBGCon.setDiagText(this.anouncer_texts[2] + this.anouncer_var_texts[0][this.rand_player]);
                    else
                        this.HudDiagBGCon.setDiagText(this.anouncer_texts[2] + this.anouncer_var_texts[1][this.rand_c2]);
                    break;
                case 3:
                    this.charDisplayCon.setCurtainVisibility();
                    this.HudDiagBGCon.setDiagText(this.anouncer_texts[3]);
                    break;
                default:
                    break;
            }
            this.audio_played = true;
        }
    },

    // update: function() {
    //     if (this.anouncer_lvl > 0 && this.his.introAudioCon.audIsPlaying(this.anouncer_lvl))
    // },

    readIntroText: function () {
        this.anouncer_texts = new Array(ANOUNCER_TEXTS);
        this.anouncer_var_texts = new Array(ANOUNCER_VAR_SIZE);

        for (var i = 0; i < ANOUNCER_TEXTS; i++) {
            var input_text =  $('tw-passagedata[name="I' + (i+1) + '"]').html();

            switch (i) {
                case 0:
                    this.readIntro1(input_text);
                    break;
                case 1:
                    this.readIntro2(input_text);
                    break;
                case 2:
                    this.anouncer_texts[3] = input_text;
                    break;
                default:
                    break;
            }
        }
    },

    readIntro1: function (full_text) {
        var split_text = full_text.split("\n");
        this.anouncer_texts[0] = split_text[0];

        this.anouncer_var_texts[0] = new Array(ANOUNCER_VAR_TEXTS);
        for (var i = 0; i < ANOUNCER_VAR_TEXTS; i++) {
            var help_text = split_text[2 + i].split("-&gt;");
            var var_text = help_text[0].replace("[[","");;
            this.anouncer_var_texts[0][i] = var_text;
        }
    },

    readIntro2: function (full_text) {
        var split_text = full_text.split("\n");
        this.anouncer_texts[1] = split_text[0];
        this.anouncer_texts[2] = split_text[1];

        this.anouncer_var_texts[1] = new Array(ANOUNCER_VAR_TEXTS);
        for (var i = 0; i < ANOUNCER_VAR_TEXTS; i++) {
            var help_text = split_text[3 + i].split("-&gt;");
            var var_text = help_text[0].replace("[[","");;
            this.anouncer_var_texts[1][i] = var_text;
        }
    },

    genIntroText: function () {
        this.rand_player = g_getFRandom(ANOUNCER_VAR_TEXTS);
        this.rand_c1 = Candidates[0].charType;
        this.rand_c2 = Candidates[1].charType;

    },
// =======
//         this.input.once('pointerdown', function () {
//             this.scene.start('bachelorScene');
//         }, this);
//     }
// >>>>>>> master

});
