"use strict";

import * as loop from "../engine/core/loop.js";
import engine from "../engine/index.js";
import SceneFileParser from "./util/scene_file_parser.js";

class Client {
    constructor(htmlCanvasID) {
        this.mSceneFile = "assets/scene.xml";
        this.mSqSet = [];
        this.mCamera = null;
    }

    init() {
        let sceneParser = new SceneFileParser(engine.xml.get(this.mSceneFile));
        this.mCamera = sceneParser.parseCamera();
        sceneParser.parseSquares(this.mSqSet);  
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();
        let i;
        for (i = 0; i < this.mSqSet.length; i++) {
            this.mSqSet[i].draw(this.mCamera);
        }
    }

    update() {
        let transform = this.mSqSet[0].getTransform();
        let deltaX = 0.05;

        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            if (transform.getXPos() > 30) {
                transform.setPosition(10, 60);
            }
            transform.incXPosBy(deltaX);
        }
        if (engine.input.isKeyClicked(engine.input.keys.Up)) {
            transform.incRotationByDegree(1);
        }

        transform = this.mSqSet[1].getTransform();
        if (engine.input.isKeyPressed(engine.input.keys.Down)) {
            if (transform.getWidth() > 5) {
                transform.setSize(2, 2);
            }
            transform.incSizeBy(0.05);
        }
    }

    load() {
        engine.xml.load(this.mSceneFile);
    }

    unload() {
        engine.xml.unload(this.mSceneFile);
    }
}

window.onload = function() {
    engine.init("GLCanvas");
    let client = new Client();
    loop.start(client);
};
