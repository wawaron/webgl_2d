attribute vec3 aVertexPosition;
uniform mat4 uModelTransformMatrix;

void main(void) {
    gl_Position = uModelTransformMatrix * vec4(aVertexPosition, 1.0);
}
