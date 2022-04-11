attribute vec3 aVertexPosition;
uniform mat4 uModelTransformMatrix;
uniform mat4 uCameraTransformMatrix;

void main(void) {
    gl_Position = uCameraTransformMatrix * uModelTransformMatrix * vec4(aVertexPosition, 1.0);
}
