"use strict";

import engine from "../engine/index.js";
import BlueLevel from "./blue_level.js";

class Client extends engine.Scene {
    constructor() {
        super();
        this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
        this.mCue = "assets/sounds/my_game_cue.wav";
        this.mCamera = null;
        this.mHero = null;
        this.mSupport = null;
    }

    load() {
        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCue);
    }

    unload() {
        engine.audio.stopBackground();
        engine.audio.unload(this.mBackgroundAudio);
        engine.audio.unload(this.mCue);
    }

    init() {
        this.mCamera = new engine.Camera(
            vec2.fromValues(20, 60),
            20,
            [20, 40, 600, 300]
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

        this.mSupport = new engine.Renderable();
        this.mSupport.setColor([0.8, 0.2, 0.2, 1]);
        this.mSupport.getTransform().setPosition(20, 60);
        this.mSupport.getTransform().setSize(5, 5);

        this.mHero = new engine.Renderable();
        this.mHero.setColor([0, 0, 1, 1]);
        this.mHero.getTransform().setPosition(20, 60);
        this.mHero.getTransform().setSize(2, 3);

        engine.audio.playBackground(this.mBackgroundAudio, 1.0);
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();
        this.mSupport.draw(this.mCamera);
        this.mHero.draw(this.mCamera);    
    }

    update() {
        let transform = this.mHero.getTransform();
        let deltaX = 0.05;

        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            engine.audio.playCue(this.mCue, 0.5);
            engine.audio.incBackgroundVolume(0.05);
            transform.incXPosBy(deltaX);
            if (transform.getXPos() > 30) {
                transform.setPosition(12, 60);
            }
        }

        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            engine.audio.playCue(this.mCue, 1.5);
            engine.audio.incBackgroundVolume(-0.05);
            transform.incXPosBy(-deltaX);
            if (transform.getXPos() < 11) {
                this.next();
            }
        }

        if (engine.input.isKeyPressed(engine.input.keys.Q)) {
            this.stop();
        }
    }

    next() {
        super.next();
        let nextLevel = new BlueLevel();
        nextLevel.start();
    }
}

window.onload = function() {
    engine.init("GLCanvas");
    let client = new Client();
    client.start();
};

export default Client;
