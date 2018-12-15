

// DEFINE VARIABLES AND CONSTANTS
var NO_QUESTIONS = 3;
var NO_CANDIDATES = 3;

var DEBUG = true;


// The loading Scene, where all features should be loaded yet nothing displayed

var Questions = new Array(NO_QUESTIONS); // questions to be asked with possible answers
var Bachelor;
var Player;
var Candidates = new Array(NO_CANDIDATES-1);

var loadingScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function loadingScene ()
        {
            Phaser.Scene.call(this, { key: 'loadingScene' });

            // Initialize Bachelor and Player
            Player = new Person(-1);
            Bachelor = new Person(0, true);
            var rand_type = Math.ceil(Math.random() * 4); // random value between 1 and 4
            Bachelor.charType = rand_type;
            console.log("Created Bachelor with type " + rand_type);

            // Initialize Candidates
            for (var i = 0; i < Candidates.length; i++) {
                rand_type = Math.ceil(Math.random() * 4); // random value between 1 and 4
                Candidates[i] = new Person(rand_type, false);
                console.log("Created Candidate " + i + " with type " + rand_type);
            }

            // Load Questions
            for (let i = 0; i < NO_QUESTIONS; i++) {
                // Get Start Text
                var input_text =  $('tw-passagedata[name="Q' + (i+1) + '"]').html();
                var res_text =  $('tw-passagedata[name="A' + (i+1) + '"]').html();
                var help_text1 = input_text.split("\n");
                var help_text2 = res_text.split("\n");

                // Debug
                if (DEBUG) {
                    console.log(help_text1);
                    console.log(help_text2);
                }

                // Add Question
                Questions[i] = new Question(help_text1[0]);
                this.decomposeDialogue(help_text1, i);
                this.decomposeResponses(help_text2, i)

            }

        },

    preload: function ()
    {

        this.load.image('title', 'assets/pics/title.jpg');
        this.load.image('play', 'assets/buttons/play.png');
    },

    create: function ()
    {
        this.add.sprite(400, 200, 'title');

        this.add.text(100, 100, 'Herzblatt');
        this.add.text(100, 400, 'A game by Some People for Klagenfurt Winter Game Jam 2018');

        var playButton = this.add.sprite(400, 500, 'play').setInteractive();
        var that = this;
        playButton.on('pointerover', function(pointer) {
            this.setTint(0xffaaaa);
        });
        playButton.on('pointerout', function(pointer) {
            this.clearTint();
        });
        playButton.on('pointerdown', function(pointer) {
            console.log('Clicked play, going to characterSelectScene');
            that.scene.start('characterSelectScene');
        });
    },

    /**
     *
     * @param diag_text complete text
     * @param idx_q Index of question
     */
    decomposeDialogue: function (diag_text, idx_q) {

        // Get Answer Lines
        var pos_answers;
        var options = diag_text.length;
        var first = true;
        for (var k=1, l = 0; k < options; k++) {
            if (diag_text[k].startsWith("    "))
                diag_text[k].replace("    ","");
            if (diag_text[k].startsWith("\t"))
                diag_text[k].replace("\t","");
            if (diag_text[k].startsWith("[[") && first){
                pos_answers = [options - k];
                pos_answers[l++] = diag_text[k];
                first = false;
            } else if (diag_text[k].startsWith("[[")) {
                pos_answers[l++] = diag_text[k];
            }
        }

        // Get Values of Answer line
        for (var j = 0; j < pos_answers.length; ++j) {
            var split_text = pos_answers[j].split("-&gt;");
            var split_ans = split_text[0].split("==");
            var ans_text = split_ans[0].replace("[[","");
            var mf_text = split_ans[1].split("=");
            var fool = parseInt(mf_text[0]);
            var manner = parseInt(mf_text[1]);

            Questions[idx_q].addAnswer(new Answer(ans_text, manner, fool));
        }
    },

    decomposeResponses: function (diag_text, idx_q) {
        // Get Values of Answer line
        for (var j = 0; j < diag_text.length; ++j) {
            var split_text = diag_text[j].split("-&gt;");
            var resp = split_text[1];
            var r_idx = parseInt(split_text[0].replace("==",""));

            Questions[idx_q].addResponse(resp, r_idx);
        }
    },

});
