"use strict";

import engine from "../../engine/index.js";

class SceneFileParser {
    constructor(xml) {
        this.xml = xml;
    }

    parseCamera() {
        let camElm = getElm(this.xml, "Camera");
        let cx = Number(camElm[0].getAttribute("CenterX"));
        let cy = Number(camElm[0].getAttribute("CenterY"));
        let w = Number(camElm[0].getAttribute("Width"));
        let viewport = camElm[0].getAttribute("Viewport").split(" ");
        let bgColor = camElm[0].getAttribute("BgColor").split(" ");
    
        let j;
        for (j = 0; j < 4; j++) {
            bgColor[j] = Number(bgColor[j]);
            viewport[j] = Number(viewport[j]);
        }
    
        let cam = new engine.Camera(vec2.fromValues(cx, cy), w, viewport);
        cam.setBackgroundColor(bgColor);
        return cam;
    }

    parseSquares(sqSet) {
        let elm = getElm(this.xml, "Square");
        let i, j, x, y, w, h, r, c, sq;
        
        for (i = 0; i < elm.length; i++) {
            x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
            y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
            w = Number(elm.item(i).attributes.getNamedItem("Width").value);
            h = Number(elm.item(i).attributes.getNamedItem("Height").value);
            r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
            c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
            sq = new engine.Renderable();

            for (j = 0; j < 4; j++) {
                c[j] = Number(c[j]);
            }

            sq.setColor(c);
            sq.getTransform().setPosition(x, y);
            sq.getTransform().setRotationInDegree(r);
            sq.getTransform().setSize(w, h);
            sqSet.push(sq);
        }
    }
}

function getElm(xmlContent, tagElm) {
    let elm = xmlContent.getElementsByTagName(tagElm);
    if (elm.length === 0) {
        console.error("Element is not found: " + elm);
    }
    return elm;
}

export default SceneFileParser;
