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

        this.mWhiteSq.getTransform().setPosition(-0.25, 0.25);
        this.mWhiteSq.getTransform().setRotationInRad(0.2);
        this.mWhiteSq.getTransform().setSize(1.2, 1.2);
        this.mWhiteSq.draw();

        this.mRedSq.getTransform().setXPos(0.25);
        this.mRedSq.getTransform().setYPos(-0.25);
        this.mRedSq.getTransform().setRotationInDegree(45);
        this.mRedSq.getTransform().setWidth(0.4);
        this.mRedSq.getTransform().setHeight(0.4);
        this.mRedSq.draw();
    }
}

window.onload = function() {
    new Client("GLCanvas");
};
