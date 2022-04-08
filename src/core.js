"use strict";

import * as vertexBuffer from "./vertex_buffer.js";
import * as simpleShader from "./shader_support.js";

let mGL = null;
function getGL() { return mGL; }

function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);
    mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
    if (mGL === null) {
        document.write("<br><b>WebGL2 is not supported by the browser</b>");
        return;
    }
    mGL.clearColor(0.0, 0.0, 0.0, 1.0);

    vertexBuffer.init();
    simpleShader.init("VertexShader", "FragmentShader");
}

function clearCanvas() {
    mGL.clear(mGL.COLOR_BUFFER_BIT);
}

function drawSquare() {
    simpleShader.activate();
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

window.onload = function() {
    initWebGL("GLCanvas");
    clearCanvas();
    drawSquare();
};

export { getGL };
