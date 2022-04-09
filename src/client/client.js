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
        this.mWhiteSq.draw();
        this.mRedSq.draw();
    }
}

window.onload = function() {
    new Client("GLCanvas");
};
