"use strict";

import engine from "../engine/index.js";
import MyGame from "./client.js";
import SceneFileParser from "./util/scene_file_parser.js";

class BlueLevel extends engine.Scene {
    constructor() {
        super();
        this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
        this.mCue = "assets/sounds/blue_level_cue.wav";        
        this.mSceneFile = "assets/blue_level.xml";
        this.mSQSet = [];
        this.mCamera = null;
    }

    init() {
        let sceneParser = new SceneFileParser(engine.xml.get(this.mSceneFile));
        this.mCamera = sceneParser.parseCamera();
        sceneParser.parseSquares(this.mSQSet);
        engine.audio.playBackground(this.mBackgroundAudio, 0.5);
    }

    draw() {
        this.mCamera.setViewAndCameraMatrix();
        let i;
        for (i = 0; i < this.mSQSet.length; i++) {
            this.mSQSet[i].draw(this.mCamera);
        }
    }

    update() {
        let transform = this.mSQSet[1].getTransform();
        let deltaX = 0.05;
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            engine.audio.playCue(this.mCue, 0.5);
            transform.incXPosBy(deltaX);
            if (transform.getXPos() > 30) {
                transform.setPosition(12, 60);
            }
        }

        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            engine.audio.playCue(this.mCue, 1.0);
            transform.incXPosBy(-deltaX);
            if (transform.getXPos() < 11) {
                this.next();
            }
        }

        if (engine.input.isKeyPressed(engine.input.keys.Q))
            this.stop();
    }

    
    next() {
        super.next();
        let nextLevel = new MyGame();  // load the next level
        nextLevel.start();
    }

    load() {
        engine.xml.load(this.mSceneFile);
        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCue);
    }

    unload() {
        engine.audio.stopBackground();
        engine.xml.unload(this.mSceneFile);
        engine.audio.unload(this.mBackgroundAudio);
        engine.audio.unload(this.mCue);        
    }
}

export default BlueLevel;
