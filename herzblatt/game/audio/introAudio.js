

class IntroAudio {
    constructor(scene) {
        this.scene = scene;

        this.announcer_audio = new Array(ANOUNCER_TEXTS);
        this.announcer_var_audio = new Array(ANOUNCER_VAR_SIZE);
        this.announcer_var_audio[0] = new Array(ANOUNCER_VAR_TEXTS);
        this.announcer_var_audio[1] = new Array(ANOUNCER_VAR_TEXTS);
    }

    preload() {
        this.scene.load.audio('aud_I1', ['assets/sound/announcer/announcer_Audio  1_custom winter jam.wav']);
        this.scene.load.audio('aud_I2', ['assets/sound/announcer/announcer_Audio  2_custom winter jam.wav']);
        this.scene.load.audio('aud_I3', ['assets/sound/announcer/announcer_Audio  3_custom winter jam.wav']);
        this.scene.load.audio('aud_I4', ['assets/sound/announcer/announcer_Audio  4_custom winter jam.wav']);
        this.scene.load.audio('aud_I5', ['assets/sound/announcer/announcer_Audio  5_custom winter jam.wav']);
        this.scene.load.audio('aud_I6', ['assets/sound/announcer/announcer_Audio  6_custom winter jam.wav']);
        this.scene.load.audio('aud_I7', ['assets/sound/announcer/announcer_Audio  7_custom winter jam.wav']);
        this.scene.load.audio('aud_I8', ['assets/sound/announcer/announcer_Audio  8_custom winter jam.wav']);
        this.scene.load.audio('aud_I9', ['assets/sound/announcer/announcer_Audio  9_custom winter jam.wav']);
        this.scene.load.audio('aud_I10', ['assets/sound/announcer/announcer_Audio  10_custom winter jam.wav']);
        this.scene.load.audio('aud_I11', ['assets/sound/announcer/announcer_Audio  11_custom winter jam.wav']);
        this.scene.load.audio('aud_I12', ['assets/sound/announcer/announcer_Audio  12_custom winter jam.wav']);
    }

    create() {
        this.announcer_audio[0] = this.scene.sound.add('aud_I1', { volume:0.25 });
        this.announcer_audio[1] = this.scene.sound.add('aud_I6', { volume:0.25 });
        this.announcer_audio[2] = this.scene.sound.add('aud_I7', { volume:0.25 });
        this.announcer_audio[3] = this.scene.sound.add('aud_I12', { volume:0.25 });

        this.announcer_var_audio[0][0] = this.scene.sound.add('aud_I2', { volume:0.25,  });
        this.announcer_var_audio[0][1] = this.scene.sound.add('aud_I3', { volume:0.25 });
        this.announcer_var_audio[0][2] = this.scene.sound.add('aud_I4', { volume:0.25 });
        this.announcer_var_audio[0][3] = this.scene.sound.add('aud_I5', { volume:0.25 });

        this.announcer_var_audio[1][0] = this.scene.sound.add('aud_I8', { volume:0.25 });
        this.announcer_var_audio[1][1] = this.scene.sound.add('aud_I9', { volume:0.25 });
        this.announcer_var_audio[1][2] = this.scene.sound.add('aud_I10', { volume:0.25 });
        this.announcer_var_audio[1][3] = this.scene.sound.add('aud_I11', { volume:0.25 });
    }

    playAnnouncerAudio(idx_aud) {
        this.announcer_audio[idx_aud].play();
    }

    playAnnouncerVarAudio(idx_aud, idx_var, delay = 0.0) {
        this.announcer_audio[idx_aud].playDelay(delay);
    }

    audIsPlaying(idx_aud) {
        return this.announcer_audio[idx_aud].isPlaying;
    }
}