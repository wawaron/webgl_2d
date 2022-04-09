"use strict";

let mCanvas = null;
let mGL = null;
function get() { return mGL; }

function init(htmlCanvasID) {
    mCanvas = document.getElementById(htmlCanvasID);
    if (mCanvas == null) {
        throw new Error("Error: HTML5 canvas not found");
    }

    mGL = mCanvas.getContext("webgl2") || mCanvas.getContext("experimental-webgl2");
    if (mGL === null) {
        document.write("<br><b>WebGL2 is not supported by the browser</b>");
        return;
    }
}

export { get, init };
