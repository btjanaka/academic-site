function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var gl; // The webgl context.

var a_coords_loc; // Location of the a_coords attribute variable in the shader program.

var a_coords_buffer; // Buffer to hold the values for a_coords.

var a_normal_loc; // Location of a_normal attribute.

var a_normal_buffer; // Buffer for a_normal.

var index_buffer; // Buffer to hold vertex indices from model.
// Locations of uniform variables in the shader program

var u_diffuseColor;
var u_specularColor;
var u_specularExponent;
var u_sunlightPosition;
var u_sunlightOn;
var u_streetLampPosition;
var u_streetLampOn;
var u_leftHeadlightPosition;
var u_rightHeadlightPosition;
var u_headlightDirection;
var u_headlightsOn;
var u_shouldGlow;
var u_modelview;
var u_projection;
var u_normalMatrix;
var projection = mat4.create();
var modelview;
var normalMatrix = mat3.create(); // Derived from modelview; transforms normal vectors.
// Determined empirically.

var defaultView = mat4.create();
defaultView[0] = 0.9995833135482293;
defaultView[1] = 0.013607273073579325;
defaultView[2] = 0.025456657193019497;
defaultView[3] = 0;
defaultView[4] = -0.025484098542111575;
defaultView[5] = 0.8301858078129865;
defaultView[6] = 0.5569040179666492;
defaultView[7] = 0;
defaultView[8] = -0.013555810467758334;
defaultView[9] = -0.5573207035678862;
defaultView[10] = 0.8301866497223305;
defaultView[11] = 0;
defaultView[12] = 0;
defaultView[13] = 0;
defaultView[14] = -15;
defaultView[15] = 1;

function newModelView() {
  return mat4.clone(defaultView);
} //
// Utilities
//

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function mat4TimesVec4(m, v) {
  return [
    m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12] * v[3],
    m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13] * v[3],
    m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * v[3],
    m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * v[3]
  ];
}

//
// Drawing
//

var colors = {
  brown: [0.6, 0.3, 0.0, 1],
  darkGray: [0.3, 0.3, 0.3, 1.0],
  forestGreen: [0.13, 0.55, 0.12, 1.0],
  gray: [0.7, 0.7, 0.7, 1.0],
  red: [1.0, 0.0, 0.0, 1.0],
  yellow: [1.0, 1.0, 0.0, 1.0]
};
var models = {
  road: {
    model: ring(2.2, 3.5),
    color: {
      diffuse: colors.gray
    }
  },
  grass: {
    model: uvCylinder(4.0, 0.5),
    color: {
      diffuse: colors.forestGreen
    }
  },
  tree: {
    model: uvCone(0.3, 0.8),
    color: {
      diffuse: colors.forestGreen
    }
  },
  trunk: {
    model: uvCylinder(0.15, 0.3),
    color: {
      diffuse: colors.brown
    }
  },
  sun: {
    model: uvSphere(0.3),
    rotation: {
      deg: 0.0,
      inc: 1.0,
      rad: 0.0
    },
    color: {
      diffuse: colors.yellow,
      glow: true
    },
    light: {
      pos: [5, 0, 0, 0],
      on: true
    }
  },
  lampPole: {
    model: uvCylinder(0.07, 0.8),
    color: {
      diffuse: colors.darkGray
    }
  },
  streetLamp: {
    model: uvSphere(0.16),
    color: {
      diffuse: colors.darkGray,
      glow: true
    },
    light: {
      pos: [0, 0.88, 0, 1],
      on: false
    }
  },
  carBody: {
    model: cube(1, 1, 1),
    rotation: {
      deg: 0.0,
      inc: -3.0,
      rad: 0.0
    },
    color: {
      diffuse: colors.red
    }
  },
  carRoof: {
    model: cube(1, 1, 1),
    color: {
      diffuse: colors.red
    }
  },
  carAxle: {
    model: uvCylinder(0.04, 1.1),
    color: {
      diffuse: colors.gray
    }
  },
  carWheel: {
    model: uvTorus(0.2, 0.3),
    color: {
      diffuse: colors.darkGray
    }
  },
  carWheelSpoke: {
    model: uvCylinder(0.02, 0.4),
    rotation: {
      deg: 0.0,
      inc: 15.0,
      rad: 0.0
    },
    color: {
      diffuse: colors.darkGray
    }
  },
  carHeadlight: {
    model: uvCylinder(0.05, 0.01),
    color: {
      diffuse: colors.yellow,
      glow: true
    },
    light: {
      on: false
    }
  }
}; // Copies model data to the appropriate buffers and draws the scene.

function installModel(model) {
  // Color
  var d = model.color.diffuse;
  gl.uniform4f(u_diffuseColor, d[0], d[1], d[2], d[3]);
  gl.uniform1f(u_shouldGlow, model.color.glow ? 1.0 : 0.0); // Positions

  var modelData = model.model;
  gl.bindBuffer(gl.ARRAY_BUFFER, a_coords_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_coords_loc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_coords_loc);
  gl.bindBuffer(gl.ARRAY_BUFFER, a_normal_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexNormals, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_normal_loc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_normal_loc);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);
} // Assigns computed values to the uniforms for the model, view and projection
// transform.

function update_uniform(modelview, projection, modelName) {
  // Get the matrix for transforming normal vectors from the modelview matrix,
  // and send matrices to the shader program.
  mat3.normalFromMat4(normalMatrix, modelview);
  gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);
  gl.uniformMatrix4fv(u_modelview, false, modelview);
  gl.uniformMatrix4fv(u_projection, false, projection);
  gl.drawElements(
    gl.TRIANGLES,
    models[modelName].model.indices.length,
    gl.UNSIGNED_SHORT,
    0
  );
} // Loads the given model and applies transformations to it. |transformations| is
// a list where each element is a list of [function, transformationArgument].

function loadModel(name, transformations) {
  installModel(models[name]);
  modelview = newModelView();

  for (var i = 0; i < transformations.length; ++i) {
    transformations[i][0](modelview, modelview, transformations[i][1]);
  }

  update_uniform(modelview, projection, name);
  return modelview;
}

function drawTree(scale, position) {
  loadModel("tree", [
    [mat4.translate, position],
    [mat4.translate, [0, scale * 0.7, 0]],
    [mat4.rotateX, -Math.PI / 2],
    [mat4.scale, [scale, scale, scale]]
  ]);
  loadModel("trunk", [
    [mat4.translate, position],
    [mat4.translate, [0, scale * 0.15, 0]],
    [mat4.rotateX, -Math.PI / 2],
    [mat4.scale, [scale, scale, scale]]
  ]);
}

function draw() {
  var _gl2, _gl3, _gl4;

  gl.clearColor(0.0, 0.0, 0.0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(projection, Math.PI / 4, 1, 10, 20); // Ground

  loadModel("road", [
    [mat4.translate, [0, 0.01, 0]],
    [mat4.rotateX, (3 * Math.PI) / 2]
  ]);
  loadModel("grass", [
    [mat4.translate, [0, -0.25, 0]],
    [mat4.rotateX, Math.PI / 2]
  ]); // Trees

  drawTree(1.0, [-0.4, 0, -0.5]); // Left of lamp

  drawTree(1.3, [0.7, 0, 0]); // Right of lamp

  drawTree(1.3, [-1.2, 0, 1.2]); // Edge of island

  drawTree(0.6, [-1.0, 0, 3.6]); // Front left edge

  drawTree(0.9, [-2.0, 0, -3.2]); // Back left edge

  drawTree(0.7, [0.4, 0, -3.7]); // Back right edge, left

  drawTree(0.6, [1.1, 0, -3.5]); // Back right edge, right

  drawTree(0.7, [3.7, 0, -0.5]); // Right edge, back

  drawTree(1.0, [3.8, 0, 0]); // Right edge, middle

  drawTree(0.6, [3.65, 0, 0.35]); // Right edge, front
  // Car

  var carRadius = 2.7;
  var sharedCarTransform = [
    [mat4.rotateY, models["carBody"].rotation.rad],
    [mat4.translate, [-carRadius, 0, 0]]
  ];
  loadModel(
    "carBody",
    [].concat(sharedCarTransform, [
      [mat4.translate, [0, 0.4, 0]],
      [mat4.scale, [0.8, 0.3, 1.3]]
    ])
  );
  loadModel(
    "carRoof",
    [].concat(sharedCarTransform, [
      [mat4.translate, [0, 0.6, 0]],
      [mat4.scale, [0.8, 0.2, 0.6]]
    ])
  );
  loadModel(
    "carAxle",
    [].concat(sharedCarTransform, [
      [mat4.translate, [0, 0.35, -0.4]],
      [mat4.rotateY, Math.PI / 2]
    ])
  );
  loadModel(
    "carAxle",
    [].concat(sharedCarTransform, [
      [mat4.translate, [0, 0.35, 0.4]],
      [mat4.rotateY, Math.PI / 2]
    ])
  ); // Car wheels

  var wheelPositions = [
    [-0.5, 0.35, 0.4],
    [-0.5, 0.35, -0.4],
    [0.5, 0.35, -0.4],
    [0.5, 0.35, 0.4]
  ];
  var numSpokes = 3;

  for (var i = 0; i < wheelPositions.length; ++i) {
    loadModel(
      "carWheel",
      [].concat(sharedCarTransform, [
        [mat4.translate, wheelPositions[i]],
        [mat4.rotateY, Math.PI / 2]
      ])
    );

    for (var j = 0; j < numSpokes; ++j) {
      loadModel(
        "carWheelSpoke",
        [].concat(sharedCarTransform, [
          [mat4.translate, wheelPositions[i]],
          [mat4.rotateY, -Math.PI / 2],
          [mat4.rotateZ, models["carWheelSpoke"].rotation.rad],
          [mat4.rotateZ, (j * Math.PI) / numSpokes],
          [mat4.rotateY, Math.PI / 2]
        ])
      );
    }
  } // Headlights

  var headlightUniforms = [u_leftHeadlightPosition, u_rightHeadlightPosition];
  var headlightPositions = [
    [-0.25, 0.35, -0.655],
    [0.25, 0.35, -0.655]
  ];

  for (var i = 0; i < 2; ++i) {
    var _gl;

    modelview = loadModel(
      "carHeadlight",
      [].concat(sharedCarTransform, [[mat4.translate, headlightPositions[i]]])
    );
    vec4.transformMat4(headlightPositions[i], [0, 0, 0, 1], modelview);

    (_gl = gl).uniform4f.apply(
      _gl,
      [headlightUniforms[i]].concat(_toConsumableArray(headlightPositions[i]))
    );
  }

  var headlightNormalMatrix = mat3.create();
  mat3.normalFromMat4(headlightNormalMatrix, modelview);
  var headlightDirection = new Float32Array(3);
  vec3.transformMat3(headlightDirection, [0, 0, -1], headlightNormalMatrix);

  (_gl2 = gl).uniform3f.apply(
    _gl2,
    [u_headlightDirection].concat(_toConsumableArray(headlightDirection))
  );

  gl.uniform1i(u_headlightsOn, models["carHeadlight"].light.on); // Sun

  loadModel("sun", [
    [mat4.rotateZ, models["sun"].rotation.rad],
    [mat4.translate, [5, 0, 0]]
  ]);

  (_gl3 = gl).uniform4f.apply(
    _gl3,
    [u_sunlightPosition].concat(_toConsumableArray(models["sun"].light.pos))
  );

  gl.uniform1i(u_sunlightOn, models["sun"].light.on); // Street lamp

  loadModel("lampPole", [
    [mat4.translate, [0, 0.4, 0]],
    [mat4.rotateX, Math.PI / 2]
  ]);
  modelview = loadModel("streetLamp", [[mat4.translate, [0, 0.88, 0]]]);
  vec4.transformMat4(models["streetLamp"].light.pos, [0, 0, 0, 1], modelview);

  (_gl4 = gl).uniform4f.apply(
    _gl4,
    [u_streetLampPosition].concat(
      _toConsumableArray(models["streetLamp"].light.pos)
    )
  );

  gl.uniform1i(u_streetLampOn, models["streetLamp"].light.on);
} // Applies changes to the scene (but does not render any of the changes).

function animate() {
  // Turn off animation if the car is not being shown.
  if (!window.showing_car) return;
  var rotationMultiplier = 1.0; // Rotations

  for (var name in models) {
    var m = models[name];
    if (!m.rotation) continue;
    m.rotation.deg =
      (m.rotation.deg + rotationMultiplier * m.rotation.inc) % 360.0;
    m.rotation.rad = degToRad(m.rotation.deg);
  } // Lights

  models["sun"].light.pos = [
    5 * Math.cos(models["sun"].rotation.rad),
    5 * Math.sin(models["sun"].rotation.rad),
    5,
    0
  ];

  if (models["sun"].rotation.deg > 180.0) {
    models["sun"].color.diffuse = colors.gray;
    models["sun"].color.glow = false;
    models["sun"].light.on = false;
    models["streetLamp"].color.diffuse = colors.yellow;
    models["streetLamp"].light.on = true;
    models["carHeadlight"].light.on = true;
    models["carHeadlight"].color.diffuse = colors.yellow;
    models["carHeadlight"].color.glow = true;
  } else {
    models["sun"].color.diffuse = colors.yellow;
    models["sun"].color.glow = true;
    models["sun"].light.on = true;
    models["streetLamp"].color.diffuse = colors.darkGray;
    models["streetLamp"].light.on = false;
    models["carHeadlight"].light.on = false;
    models["carHeadlight"].color.diffuse = colors.gray;
    models["carHeadlight"].color.glow = false;
  }
} //
// WebGL setup
//

/* Initialize the WebGL context.  Called from init() */

function initGL() {
  var prog = createProgram(gl, "vshader-source", "fshader-source");
  gl.useProgram(prog);
  a_coords_loc = gl.getAttribLocation(prog, "a_coords");
  a_normal_loc = gl.getAttribLocation(prog, "a_normal");
  u_modelview = gl.getUniformLocation(prog, "modelview");
  u_projection = gl.getUniformLocation(prog, "projection");
  u_normalMatrix = gl.getUniformLocation(prog, "normalMatrix");
  u_sunlightPosition = gl.getUniformLocation(prog, "sunlightPosition");
  u_sunlightOn = gl.getUniformLocation(prog, "sunlightOn");
  u_streetLampPosition = gl.getUniformLocation(prog, "streetLampPosition");
  u_streetLampOn = gl.getUniformLocation(prog, "streetLampOn");
  u_leftHeadlightPosition = gl.getUniformLocation(
    prog,
    "leftHeadlightPosition"
  );
  u_rightHeadlightPosition = gl.getUniformLocation(
    prog,
    "rightHeadlightPosition"
  );
  u_headlightDirection = gl.getUniformLocation(prog, "headlightDirection");
  u_headlightsOn = gl.getUniformLocation(prog, "headlightsOn");
  u_shouldGlow = gl.getUniformLocation(prog, "shouldGlow");
  u_diffuseColor = gl.getUniformLocation(prog, "diffuseColor");
  u_specularColor = gl.getUniformLocation(prog, "specularColor");
  u_specularExponent = gl.getUniformLocation(prog, "specularExponent");
  a_coords_buffer = gl.createBuffer();
  a_normal_buffer = gl.createBuffer();
  index_buffer = gl.createBuffer();
  gl.enable(gl.DEPTH_TEST);
  gl.uniform3f(u_specularColor, 0.5, 0.5, 0.5);
  gl.uniform1f(u_specularExponent, 10);
} // Creates a program for use in the WebGL context gl, and returns the
// identifier for that program.

function createProgram(gl, vertexShaderID, fragmentShaderID) {
  function getTextContent(elementID) {
    // This nested function retrieves the text content of an
    // element on the web page.  It is used here to get the shader
    // source code from the script elements that contain it.
    var element = document.getElementById(elementID);
    var node = element.firstChild;
    var str = "";

    while (node) {
      if (node.nodeType == 3)
        // this is a text node
        str += node.textContent;
      node = node.nextSibling;
    }

    return str;
  }

  try {
    var vertexShaderSource = getTextContent(vertexShaderID);
    var fragmentShaderSource = getTextContent(fragmentShaderID);
  } catch (e) {
    throw "Error: Could not get shader source code from script elements.";
  }

  var vsh = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vsh, vertexShaderSource);
  gl.compileShader(vsh);

  if (!gl.getShaderParameter(vsh, gl.COMPILE_STATUS)) {
    throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
  }

  var fsh = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fsh, fragmentShaderSource);
  gl.compileShader(fsh);

  if (!gl.getShaderParameter(fsh, gl.COMPILE_STATUS)) {
    throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, vsh);
  gl.attachShader(prog, fsh);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw "Link error in program:  " + gl.getProgramInfoLog(prog);
  }

  return prog;
} // Initializes everything once the page loads.

function startup() {
  try {
    var canvas = document.getElementById("myGLCanvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      throw "Browser does not support WebGL";
    }
  } catch (e) {
    document.getElementById("canvas-holder").innerHTML =
      "<p>Sorry, could not get a WebGL graphics context.</p>";
    return;
  }

  try {
    initGL(); // initialize the WebGL graphics context
  } catch (e) {
    document.getElementById("canvas-holder").innerHTML =
      "<p>Sorry, could not initialize the WebGL graphics context:" + e + "</p>";
    return;
  }

  window.showing_car = false;
  tick();
}

function tick() {
  setTimeout(function () {
    requestAnimFrame(tick);
    draw();
    animate();
  }, 50);
}
