"use strict";

import * as glSys from "./core/gl.js";

const eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eWidth: 2,
    eHeight: 3
});

class Camera {
    constructor(wcCenter, wcWidth, viewportArray) {
        this.mWCCenter = wcCenter;
        this.mWCWidth = wcWidth;
        this.mViewport = viewportArray;
        this.mCameraMatrix = mat4.create();
        this.mBGColor = [0.8, 0.8, 0.8, 1.0];
    }

    getWCCenter() { return this.mWCCenter; }
    setWCCenter(xPos, yPos) {
        this.mWCCenter[0] = xPos;
        this.mWCCenter[1] = yPos;
    }

    getWCWidth() { return this.mWCWidth; }
    setWCWidth(width) { this.mWCWidth = width; }

    getWCHeight() {
        let ratio = this.mViewport[eViewport.eHeight] / this.mViewport[eViewport.eWidth];
        return this.getWCWidth() * ratio;
    }

    getViewport() { return this.mViewport; }
    setViewport(viewportArray) { this.mViewport = viewportArray; }

    getBackgroundColor() { return this.mBGColor; }
    setBackgroundColor(newColor) { this.mBGColor = newColor; }

    getCameraMatrix() { return this.mCameraMatrix; }
    setViewAndCameraMatrix() {
        let gl = glSys.get();
        gl.viewport(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
        gl.scissor(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
        gl.clearColor(this.mBGColor[0], this.mBGColor[1], this.mBGColor[2], this.mBGColor[3]);
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        let center = this.getWCCenter();
        mat4.scale(
            this.mCameraMatrix,
            mat4.create(),
            vec3.fromValues(2.0 / this.getWCWidth(), 2.0 / this.getWCHeight(), 1.0)
        );
        mat4.translate(
            this.mCameraMatrix,
            this.mCameraMatrix,
            vec3.fromValues(-center[0], -center[1], 0)
        );
    }
}

export default Camera;
