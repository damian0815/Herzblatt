/**
 * Created by Martin on 28.04.2017.
 */

var bootState = {
    //init system needed vars
    init: function () {
        level=1;
        rooms = 6;
        diagLevels = 2;
        possibleAnswers = 4;
        textHeight = 240;
        textWidth = 1100;

        diagClicked = [rooms];

        for (i = 0; i < rooms; ++i) {
            diagClicked[i] = [diagLevels];
            for(j = 0; j < diagLevels; ++j) {
                diagClicked[i][j] = [possibleAnswers];
                for(k = 0; k < possibleAnswers; ++k) {
                    diagClicked[i][j][k] = 0;
                }
            }
        }

        visitedR = [rooms];
        for (i = 0; i < rooms; ++i){
            visitedR[i] = 0;
        }
    },

    //start preloading
    create: function () {
        game.state.start('preLoad');
    }
};