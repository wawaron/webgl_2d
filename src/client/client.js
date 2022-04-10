"use strict";

import engine from "../engine/index.js";

class Client {
    constructor(htmlCanvasID) {
        engine.init(htmlCanvasID);

        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1.0, 1.0, 1.0, 1.0]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1.0, 0.0, 0.0, 1.0]);

        engine.clearCanvas([0.0, 0.0, 0.0, 1.0]);

        let trsMatrix = mat4.create();

        mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.25, 0.25, 0.0));
        mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
        mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(1.2, 1.2, 1.0));
        this.mWhiteSq.draw(trsMatrix);

        mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.25, -0.25, 0.0));
        mat4.rotateZ(trsMatrix, trsMatrix, -.785);
        mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.4, 0.4, 1.0));
        this.mRedSq.draw(trsMatrix);
    }
}

window.onload = function() {
    new Client("GLCanvas");
};
