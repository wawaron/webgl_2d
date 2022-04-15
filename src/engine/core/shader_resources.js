"use strict";

import * as text from "../resources/text.js";
import * as map from "./resource_map.js";
import SimpleShader from "../simple_shader.js";

let kSimpleVS = "src/glsl/simple_vs.glsl";
let kSimpleFS = "src/glsl/simple_fs.glsl";
let mConstColorShader = null;

function createShaders() {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

function init() {
    let loadPromise = new Promise(
        async function(resolve) {
            await Promise.all([
                text.load(kSimpleFS),
                text.load(kSimpleVS)
            ]);
            resolve();
        }).then(
        function resolve() { createShaders(); }
    );
    map.pushPromise(loadPromise);
}

function getConstColorShader() { return mConstColorShader; }

function cleanUp() {
    mConstColorShader.cleanUp();
    text.unload(kSimpleVS);
    text.unload(kSimpleFS);
}

export { cleanUp, getConstColorShader, init };
