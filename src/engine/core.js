"use strict";

import SimpleShader from "./simple_shader.js";
import * as vertexBuffer from "./vertex_buffer.js";

let mGL = null;
function getGL() { return mGL; }

let mShader = null;
function createShader() {
    mShader = new SimpleShader("src/glsl/simple_vs.glsl", "src/glsl/simple_fs.glsl");
}

function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);
    mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
    if (mGL === null) {
        document.write("<br><b>WebGL2 is not supported by the browser</b>");
        return;
    }
}

function init(htmlCanvasID) {
    initWebGL(htmlCanvasID);
    vertexBuffer.init();
    createShader();
}

function clearCanvas(color) {
    mGL.clearColor(color[0], color[1], color[2], color[3]);
    mGL.clear(mGL.COLOR_BUFFER_BIT);
}

function drawSquare(color) {
    mShader.activate(color);
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

export { clearCanvas, drawSquare, getGL, init };
