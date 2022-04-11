"use strict";

const kUPS = 60;
const kMPF = 1000 / kUPS;

let mPrevTime;
let mLagTime;
let mLoopRunning = false;
let mCurrentScene = null;
let mFrameID = -1;

function loopOnce() {
    if (mLoopRunning) {
        mFrameID = requestAnimationFrame(loopOnce);
        mCurrentScene.draw();

        let currentTime = performance.now();
        let elapsedTime = currentTime - mPrevTime;
        mPrevTime = currentTime;
        mLagTime += elapsedTime;

        while ((mLagTime >= kMPF) && mLoopRunning) {
            mCurrentScene.update();
            mLagTime -= kMPF;
        }
    }
}

function start(scene) {
    if (mLoopRunning) {
        throw new Error("Loop is already running");
    }

    mCurrentScene = scene;
    mCurrentScene.init();

    mPrevTime = performance.now();
    mLagTime = 0.0;
    mLoopRunning = true;
    mFrameID = requestAnimationFrame(loopOnce);
}

function stop() {
    mLoopRunning = false;
    cancelAnimationFrame(mFrameID);
}

export { start, stop };
