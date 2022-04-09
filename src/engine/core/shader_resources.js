"use strict";

import SimpleShader from "../simple_shader.js";

let kSimpleVS = "src/glsl/simple_vs.glsl";
let kSimpleFS = "src/glsl/simple_fs.glsl";
let mConstColorShader = null;

function createShaders() {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

function init() {
    createShaders();
}

function getConstColorShader() { return mConstColorShader; }

export { getConstColorShader, init };
