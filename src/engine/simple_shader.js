"use strict";

import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";

class SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        this.mCompiledShader = null;
        this.mVertexPositionRef = null;
        this.mPixelColorRef = null;
        this.mModelMatrixRef = null;
        this.mCameraMatrixRef = null;

        let gl = glSys.get();
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
        this.mPixelColorRef = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
        this.mModelMatrixRef = gl.getUniformLocation(this.mCompiledShader, "uModelTransformMatrix");
        this.mCameraMatrixRef = gl.getUniformLocation(this.mCompiledShader, "uCameraTransformMatrix");
    }

    activate(pixelColor, trsMatrix, cameraMatrix) {
        let gl = glSys.get();
        gl.useProgram(this.mCompiledShader);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mVertexPositionRef);
        gl.uniform4fv(this.mPixelColorRef, pixelColor);
        gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
        gl.uniformMatrix4fv(this.mCameraMatrixRef, false, cameraMatrix);
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

    let gl = glSys.get();
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
