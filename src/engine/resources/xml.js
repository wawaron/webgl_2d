"use strict";

import * as map from "../core/resource_map.js";

let unload = map.unload;
let has = map.has;
let get = map.get;

let mParser = new DOMParser();

function decodeXML(data) {
    return data.text();
}

function parseXML(text) {
    return mParser.parseFromString(text, "text/xml");
}

function load(path) {
    return map.loadDecodeParse(path, decodeXML, parseXML);
}

export { get, has, load, unload };
