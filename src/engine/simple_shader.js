"use strict";

import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

class SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        this.mCompileShader = null;
        this.mVertexPositionRef = null;

        let gl = core.getGL();
        this.mVertexShader = loadAndCompileShader(vertexShaderPath, gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

        this.mCompiledShader = gl.createProgram();
        gl.attachShader(this.mCompiledShader, this.mVertexShader);
        gl.attachShader(this.mCompiledShader, this.mFragmentShader);
        gl.linkProgram(this.mCompiledShader);

        if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            throw new Error("Failed to link shader: " + vertexShaderPath + " <--> " + fragmentShaderPath);
        }

        this.mVertexPositionRef = gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");
    }

    activate() {
        let gl = core.getGL();
        gl.useProgram(this.mCompiledShader);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mVertexPositionRef);
    }
}

function loadAndCompileShader(filePath, shaderType) {
    let xmlReq = null;
    let shaderSource = null;
    let compiledShader = null;

    xmlReq = new XMLHttpRequest();
    xmlReq.open("GET", filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        throw new Error("The index.html file must be loaded from a web-server");
    }

    shaderSource = xmlReq.responseText;
    if (shaderSource === null) {
        throw new Error("Failed to load shader: " + filePath);
    }

    let gl = core.getGL();
    compiledShader = gl.createShader(shaderType);
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A shader compiling error occured: " +
            gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
}

export default SimpleShader;
