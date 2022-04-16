"use strict";

import * as map from "../core/resource_map.js";

let unload = map.unload;
let has = map.has;

function decodeResource(data) {
    return data.arrayBuffer();
}

function parseResource(data) {
    return mAudioContext.decodeAudioData(data);
}

function load(path) {
    return map.loadDecodeParse(path, decodeResource, parseResource);
}

let mAudioContext = null;
let mBackgroundAudio = null;
let mBackgroundGain = null;
let mCueGain = null;
let mMasterGain = null;
let kDefaultInitGain = 0.1;

function init() {
    try {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        mAudioContext = new AudioContext();

        mMasterGain = mAudioContext.createGain();
        mMasterGain.connect(mAudioContext.destination);
        mMasterGain.gain.value = kDefaultInitGain;

        mBackgroundGain = mAudioContext.createGain();
        mBackgroundGain.connect(mMasterGain);
        mBackgroundGain.gain.value = 1.0;

        mCueGain = mAudioContext.createGain();
        mCueGain.connect(mMasterGain);
        mCueGain.gain.value = 1.0;
    } catch (e) {
        throw new Error("Error during audio module initialization");
    }
}

function playCue(path, volume) {
    let source = mAudioContext.createBufferSource();
    source.buffer = map.get(path);
    source.start(0);
    source.connect(mCueGain);
    mCueGain.gain.value = volume;
}

function playBackground(path, volume) {
    if (has(path)) {
        stopBackground();
        mBackgroundAudio = mAudioContext.createBufferSource();
        mBackgroundAudio.buffer = map.get(path);
        mBackgroundAudio.loop = true;
        mBackgroundAudio.start(0);
        mBackgroundAudio.connect(mBackgroundGain);
        setBackgroundVolume(volume);
    }
}

function stopBackground() {
    if  (mBackgroundAudio !== null) {
        mBackgroundAudio.stop(0);
        mBackgroundAudio = null;
    }
}

function isBackgroundPlaying() {
    return (mBackgroundAudio !== null);
}

function setBackgroundVolume(volume) {
    if (mBackgroundGain !== null) {
        mBackgroundGain.gain.value = volume;
    }
}

function incBackgroundVolume(increment) {
    if (mBackgroundGain !== null) {
        mBackgroundGain.gain.value += increment;
        if (mBackgroundGain.gain.value < 0) {
            setBackgroundVolume(0);
        }
    }
}

function setMasterVolume(volume) {
    if (mMasterGain !== null) {
        mMasterGain.gain.value = volume;
    }
}

function incMasterVolume(increment) {
    if (mMasterGain !== null) {
        mMasterGain.gain.value += increment;
        if (mMasterGain.gain.value < 0) {
            mMasterGain.gain.value = 0;
        }
    }
}

function cleanUp() {
    mAudioContext.close();
    mAudioContext = null;
}

export { cleanUp, has, incBackgroundVolume, incMasterVolume, init, isBackgroundPlaying, load,
    playBackground, playCue, setBackgroundVolume, setMasterVolume, stopBackground, unload,
};
