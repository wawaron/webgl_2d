"use strict";

import * as map from "../core/resource_map.js";

let unload = map.unload;
let has = map.has;
let get = map.get;

function decodeText(data) {
    return data.text();
}

function parseText(text) {
    return text;
}

function load(path) {
    return map.loadDecodeParse(path, decodeText, parseText);
}

export { get, has, load, unload };
