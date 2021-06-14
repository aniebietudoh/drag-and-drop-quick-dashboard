const pixiPhotoSetup = (pEl, image1, image2) => {
    let app = new PIXI.Application({width: 200, height: 160});
    pEl.appendChild(app.view);

    let img = new PIXI.Sprite.from(image1);
    img.width = 200;
    img.height = 160;
    app.stage.addChild(img);

    let depthMap = new PIXI.Sprite.from(image2);
    app.stage.addChild(depthMap);

    let displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
    app.stage.filters = [displacementFilter];

    window.onmousemove = function(e) {
        displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) /20;
        displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) /20;
    };
}


// Tried to implement the 3d photo using direct webGl API
// will come back to it later
const webglPhotoSetup = (parentEl, image1, image2) => {
    var img = new Image();
    img.src = image1;

    var depth = new Image();
    depth.src = image2;

    let canvas = document.createElement("canvas");
    canvas.height = 160;
    canvas.width = 160;

    let gl = canvas.getContext("webgl");

    Object.assign(canvas.style, {
        maxWidth: "160px",
        maxHeight: "160px",
        objectFit: "contain",
    })

    parentEl.appendChild(canvas);

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1, -1, 1,
        1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    let vshader = `
    attribute vec2 pos;
    letying vec2 vpos;
    void main(){
        vpos = pos*-0.5 + vec2(0.5);
        gl_Position = vec4(pos, 0.0, 1.0);
    }
    `
    let vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vshader);
    gl.compileShader(vs);

    let fshader = `
    precision highp float;
    uniform sampler2D img;
    uniform sampler2D depth;
    uniform vec2 mouse;
    letying vec2 vpos;
    void main(){
        float dp = -0.5 + texture2D(depth, vpos).x;
        gl_FragColor = texture2D(img, vpos + mouse * 0.2 * dp);
    }
    `
    let fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fshader);
    gl.compileShader(fs);

    let program = gl.createProgram();
    gl.attachShader(program, fs);
    gl.attachShader(program, vs);
    gl.linkProgram(program);
    gl.useProgram(program);


    function setTexture(im,name, num) {
        let texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + num);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
        gl.uniform1i(gl.getUniformLocation(program, name), num);
    }

    setTexture(img, "img", 0);
    setTexture(depth, "depth", 1);

    loop();

    function loop() {
        gl.clearColor(0.25, 0.65, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(()=>loop());
    }

    let mouseLoc = gl.getUniformLocation(program, "mouse");
    canvas.onmousemove = function (d) {
        let mpos = [-0.5 + d.layerX / canvas.width, 0.5 - d.layerY / canvas.width]
        gl.uniform2fv(mouseLoc, new Float32Array(mpos));
    }
}

export { pixiPhotoSetup }