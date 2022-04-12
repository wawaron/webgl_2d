"use strict";

import * as loop from "../engine/core/loop.js";
import engine from "../engine/index.js";

class Client {
    constructor(htmlCanvasID) {
        this.mWhiteSq = null;
        this.mRedSq = null;
        this.mCamera = null;
    }

    init() {
        this.mCamera = new engine.Camera(
            vec2.fromValues(20, 60),
            20,
            [20, 40, 600, 300]
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);

        this.mWhiteSq.getTransform().setPosition(20, 60);
        this.mWhiteSq.getTransform().setRotationInRad(0.2);
        this.mWhiteSq.getTransform().setSize(5, 5);
        this.mRedSq.getTransform().setPosition(20, 60);
        this.mRedSq.getTransform().setSize(2, 2);        
    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        this.mCamera.setViewAndCameraMatrix();
        this.mWhiteSq.draw(this.mCamera);
        this.mRedSq.draw(this.mCamera);
    }

    update() {
        let whiteTransform = this.mWhiteSq.getTransform();
        let deltaX = 0.05;
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            if (whiteTransform.getXPos() > 30) {
                whiteTransform.setPosition(10, 60);
            }
            whiteTransform.incXPosBy(deltaX);
        }
        if (engine.input.isKeyClicked(engine.input.keys.Up)) {
            whiteTransform.incRotationByDegree(1);
        }

        let redTransform = this.mRedSq.getTransform();
        if (engine.input.isKeyPressed(engine.input.keys.Down)) {
            if (redTransform.getWidth() > 5) {
                redTransform.setSize(2, 2);
            }
            redTransform.incSizeBy(0.05);
        }
    }
}

window.onload = function() {
    engine.init("GLCanvas");
    let client = new Client();
    loop.start(client);
};
