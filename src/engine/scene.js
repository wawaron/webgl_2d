"use strict";

import * as loop from "./core/loop.js";
import engine from "./index.js";

const kAbstractClassError = new Error("Abstract Class");
const kAbstractMethodError = new Error("Abstract Method");

class Scene {
    constructor() {
        if (this.constructor === Scene) {
            throw kAbstractClassError;
        }
    }

    async start() {
        await loop.start(this);
    }

    next() {
        loop.stop();
        this.unload();
    }

    stop() {
        loop.stop();
        this.unload();
        engine.cleanUp();
    }

    init() {}
    load() {}
    unload() {}
    draw() { throw kAbstractMethodError; }
    update() { throw kAbstractMethodError; }
}

export default Scene;
