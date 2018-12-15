

// DEFINE VARIABLES AND CONSTANTS
var NO_QUESTIONS = 3;
var NO_CANDIDATES = 3;
var NO_DBUTTONS = 3;
var NO_TOTQUEST = 3;

var DEBUG = true;

// ENUMS
var DiagStateEnum = Object.freeze({"quest":1, "answ_npc":2, "answ_pc":3, "resp":4});
var CandidatesEnum = Object.freeze({"npc":0, "pc1":1, "pc2":2});


// The loading Scene, where all features should be loaded yet nothing displayed
var Questions = new Array(NO_QUESTIONS); // questions to be asked with possible answers
var AskedQuestions = new Array(NO_QUESTIONS);
var NoAskedQuestions;
var Bachelor;
var Player;
var Candidates = new Array(NO_CANDIDATES-1);

// Dialog Variables
var QuestNo;
var CandidateSequ = new Array(NO_CANDIDATES);
var CandSeqNo;
var DiagState;
var DiagText;
// var DiagButtons = new Array(NO_DBUTTONS);
// var diagButtonText = new Array(NO_DBUTTONS);
var DiagTextSyle;
var DiagButTextStyle;

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
            rand_type = rand_type === 0 ? 1 : rand_type; // correct the  possibility of getting 0
            Bachelor.charType = rand_type;
            console.log("Created Bachelor with type " + rand_type);

            // Initialize Candidates
            for (var i = 0; i < Candidates.length; i++) {
                rand_type = Math.ceil(Math.random() * 4); // random value between 1 and 4
                rand_type = rand_type === 0 ? 1 : rand_type; // correct the  possibility of getting 0
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
                AskedQuestions[i] = false;
                this.decomposeDialogue(help_text1, i);
                this.decomposeResponses(help_text2, i);

            }

            // Set Dialoge Texts
            DiagTextSyle =  { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" };
            DiagButTextStyle = { font: "16px Sans Serif", fill: "#000000", wordWrap: true, wordWrapWidth: textWidth, align: "justify" };


            // Initialize random bachelor question sequence
            QuestNo = Math.floor(Math.random() * NO_QUESTIONS);
            QuestNo = QuestNo === NO_QUESTIONS ? NO_QUESTIONS-1 : QuestNo;
            NoAskedQuestions++;
            DiagState = DiagStateEnum.quest;
            console.log("Starting with Question " + QuestNo);

            // Initialize random candidate sequence
            var sequ_npc = Math.floor(Math.random() * 3); // random value between 1 and 4
            sequ_npc = sequ_npc === 3 ? 2 : sequ_npc; // correct the  possibility of getting 0
            var sequ_pc1 = Math.round(Math.random());
            var sequ_pc2 = 1 - sequ_pc1;
            switch (sequ_npc) {
                case 0:
                    sequ_pc1 += 1;
                    sequ_pc2 += 1;
                    break;
                case 1:
                    if (sequ_pc1 === 0)
                        sequ_pc2 += 1;
                    else
                        sequ_pc1 += 1;
                    break;
                default:
                    break;
            }

            CandidateSequ[sequ_npc] = CandidatesEnum.npc;
            CandidateSequ[sequ_pc1] = CandidatesEnum.pc1;
            CandidateSequ[sequ_pc2] = CandidatesEnum.pc2;
            CandSeqNo = 0;

            console.log(CandidateSequ);
        },

    preload: function ()
    {

        this.load.image('title', 'assets/pics/title.jpg');
        this.load.image('play', 'assets/buttons/play.png');
    },

    create: function ()
    {
        this.add.sprite(400, 200, 'title');

        this.add.text(100, 100, 'Loading');

        var playButton = this.add.sprite(400, 500, 'play').setInteractive();
        var that = this;
        playButton.on('pointerover', function(pointer) {
            this.setTint(0xffaaaa);
        });
        playButton.on('pointerout', function(pointer) {
            this.clearTint();
        });
        playButton.on('pointerdown', function(pointer) {
            console.log('Clicked play, going to bachelorScene');
            that.scene.start('bachelorScene');
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
