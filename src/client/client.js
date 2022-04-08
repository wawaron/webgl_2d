"use strict";

import * as engine from "../engine/core.js";

class Client {
    constructor(htmlCanvasID) {
        engine.init(htmlCanvasID);
        engine.clearCanvas([0.0, 0.0, 0.0, 1.0]);
        engine.drawSquare();
    }
}

window.onload = function() {
    new Client("GLCanvas");
};
