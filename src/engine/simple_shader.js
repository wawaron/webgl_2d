"use strict";

import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

class SimpleShader {
    constructor(vertexShaderID, fragmentShaderID) {
        this.mCompileShader = null;
        this.mVertexPositionRef = null;

        let gl = core.getGL();
        this.mVertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

        this.mCompiledShader = gl.createProgram();
        gl.attachShader(this.mCompiledShader, this.mVertexShader);
        gl.attachShader(this.mCompiledShader, this.mFragmentShader);
        gl.linkProgram(this.mCompiledShader);

        if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
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

function loadAndCompileShader(id, shaderType) {
    let shaderSource = null;
    let compiledShader = null;

    let shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;

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
