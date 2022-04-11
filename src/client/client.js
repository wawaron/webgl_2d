"use strict";

import * as glSys from "../engine/core/gl.js";
import engine from "../engine/index.js";

class Client {
    constructor(htmlCanvasID) {
        engine.init(htmlCanvasID);

        this.mBlueSq = new engine.Renderable();
        this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0.25, 0.25, 1]);
        this.mTLSq = new engine.Renderable();
        this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
        this.mTRSq = new engine.Renderable();
        this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
        this.mBRSq = new engine.Renderable();
        this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
        this.mBLSq = new engine.Renderable();
        this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);

        engine.clearCanvas([0.9, 0.9, 0.9, 1]);

        let gl = glSys.get();
        gl.viewport(20, 40, 600, 300);
        gl.scissor(20, 40, 600, 300);
        gl.enable(gl.SCISSOR_TEST);
        engine.clearCanvas([0.8, 0.8, 0.8, 1.0]);
        gl.disable(gl.SCISSOR_TEST);

        let cameraCenter = vec2.fromValues(20, 60);
        let wcSize = vec2.fromValues(20, 10);
        let cameraMatrix = mat4.create();
        mat4.scale(cameraMatrix, mat4.create(), vec3.fromValues(2.0/wcSize[0], 2.0/wcSize[1], 1.0));
        mat4.translate(cameraMatrix, cameraMatrix, vec3.fromValues(-cameraCenter[0], -cameraCenter[1], 0));

        this.mBlueSq.getTransform().setPosition(20, 60);
        this.mBlueSq.getTransform().setRotationInRad(0.2);
        this.mBlueSq.getTransform().setSize(5, 5);
        this.mBlueSq.draw(cameraMatrix);

        this.mRedSq.getTransform().setPosition(20, 60);
        this.mRedSq.getTransform().setSize(2, 2);
        this.mRedSq.draw(cameraMatrix);

        this.mTLSq.getTransform().setPosition(10, 65);
        this.mTLSq.draw(cameraMatrix);

        this.mTRSq.getTransform().setPosition(30, 65);
        this.mTRSq.draw(cameraMatrix);

        this.mBRSq.getTransform().setPosition(30, 55);
        this.mBRSq.draw(cameraMatrix);

        this.mBLSq.getTransform().setPosition(10, 55);
        this.mBLSq.draw(cameraMatrix);
    }
}

window.onload = function() {
    new Client("GLCanvas");
};
