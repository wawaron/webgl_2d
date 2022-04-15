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

function cleanUp() {
    if ((mGL == null) || (mCanvas == null)) {
        throw new Error("Engine is not initialized");
    }
    mGL = null;
    mCanvas.style.position = "fixed";
    mCanvas.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
    mCanvas = null;
    document.body.innerHTML += "<br><br><h1>End of Game</h1><h1>GL System Shut Down</h1>";
}

export { cleanUp, get, init };
