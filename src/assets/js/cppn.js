/* global tf */

// Provides methods for using a TensorFlow CPPN.
const CPPN = (function () {
  // Generates a new model. outputMode is either "grey" or "rgb".
  function newModel(latentSize, hiddenDim, hiddenLayers, outputMode) {
    const inputDim = latentSize + 3; // 3 for x, y, r.
    const outputDim = outputMode == "grey" ? 1 : 3;
    const model = tf.sequential();

    let curDim = inputDim;
    for (let i = 0; i < hiddenLayers; ++i) {
      model.add(
        tf.layers.dense({
          inputShape: [curDim],
          units: hiddenDim,
          useBias: false,
          activation: "tanh",
          weights: [tf.randomNormal([curDim, hiddenDim])],
        })
      );
      curDim = hiddenDim;
    }
    model.add(
      tf.layers.dense({
        inputShape: [curDim],
        units: outputDim,
        useBias: false,
        activation: "sigmoid",
        weights: [tf.randomNormal([curDim, outputDim])],
      })
    );

    return model;
  }

  function randomLatentVec(latentSize) {
    return tf.randomUniform([latentSize], -1, 1);
  }

  // Generates an image from the model and draws it onto the given imageData --
  // imageData is taken from a canvas.
  function drawImage(model, latentVec, width, height, outputMode, imageData) {
    return tf.tidy(() => {
      const latent = latentVec.expandDims(0).tile([width, 1]);
      const ys = tf.linspace(-1, 1, width);
      const xs = tf.linspace(-1, 1, height).expandDims(1);
      const ones = tf.ones([width, 1]);

      // Calculate and set each row.
      ys.dataSync().forEach((y, yIdx) => {
        const yFull = ones.mul(tf.scalar(y));
        const r = tf.add(xs.square(), yFull.square()).sqrt();
        const inputs = tf.concat([latent, xs, yFull, r], 1);
        const output = model.predict(inputs).arraySync();

        const start = yIdx * width * 4;
        const end = (yIdx + 1) * width * 4;
        let outIdx = 0;
        for (let i = start; i < end; i += 4) {
          const pixel =
            outputMode == "grey"
              ? [output[outIdx][0], output[outIdx][0], output[outIdx][0]]
              : output[outIdx];
          imageData.data[i] = pixel[0] * 255.0;
          imageData.data[i + 1] = pixel[1] * 255.0;
          imageData.data[i + 2] = pixel[2] * 255.0;
          imageData.data[i + 3] = 255;

          ++outIdx;
        }
      });
    });
  }

  return {
    newModel,
    randomLatentVec,
    drawImage,
  };
})();

// Interactivity.
(function () {
  // Model vars.
  let hiddenLayers = 8;
  let hiddenDim = 16;
  let outputMode = "grey";
  let model;
  let latentSize = 2;
  const maxLatentSize = 16;
  let latentVec = CPPN.randomLatentVec(maxLatentSize).dataSync();

  function restart() {
    model = CPPN.newModel(latentSize, hiddenDim, hiddenLayers, outputMode);
  }

  // Initialize model.
  restart();

  // Sets up the label value to change when the slider changes.
  function linkVal(slider, valId) {
    const val = document.getElementById(valId);
    slider.oninput = () => {
      val.innerHTML = slider.value;
    };
  }

  //
  // Set up controls.
  //

  const widthSlider = document.getElementById("output-width");
  linkVal(widthSlider, "output-width-val");

  const heightSlider = document.getElementById("output-height");
  linkVal(heightSlider, "output-height-val");

  const hiddenLayerSlider = document.getElementById("hidden-layers");
  linkVal(hiddenLayerSlider, "hidden-layers-val");
  hiddenLayerSlider.onchange = () => {
    hiddenLayers = parseInt(hiddenLayerSlider.value, 10);
    restart();
  };

  const hiddenDimSlider = document.getElementById("hidden-dim");
  linkVal(hiddenDimSlider, "hidden-dim-val");
  hiddenDimSlider.onchange = () => {
    hiddenDim = parseInt(hiddenDimSlider.value, 10);
    restart();
  };

  const modeSelector = document.getElementById("output-mode");
  modeSelector.onchange = () => {
    outputMode = modeSelector.value;
    restart();
  };

  // Controls for setting latent vectors.
  const latentSliders = [];
  const latentControls = [];
  const latentControlsDiv = document.getElementById("latent-controls");
  for (let i = 0; i < maxLatentSize; ++i) {
    const label = document.createElement("label");
    label.setAttribute("class", "control-label");
    label.setAttribute("for", `latent-${i}`);
    label.innerHTML = `Latent ${i + 1}: ${latentVec[i].toFixed(2)}`;

    const slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", -100);
    slider.setAttribute("max", 100);
    slider.setAttribute("value", latentVec[i] * 100);
    slider.setAttribute("step", 1);
    slider.setAttribute("class", "slider");
    slider.setAttribute("id", `latent-${i}`);
    slider.oninput = () => {
      latentVec[i] = slider.value / 100.0;
      label.innerHTML = `Latent ${i + 1}: ${latentVec[i].toFixed(2)}`;
    };

    const control = document.createElement("div");
    control.appendChild(label);
    control.appendChild(slider);

    // Hide controls that are not being used.
    if (i >= latentSize) control.style.display = "none";

    latentControlsDiv.appendChild(control);
    latentControls.push(control);
    latentSliders.push(slider);
  }

  const latentSizeSlider = document.getElementById("latent-size");
  linkVal(latentSizeSlider, "latent-size-val");
  latentSizeSlider.onchange = () => {
    // Make the latent controls appear when the slider value changes.
    latentSize = parseInt(latentSizeSlider.value, 10);
    for (let i = 0; i < maxLatentSize; ++i) {
      if (i < latentSize) {
        latentControls[i].style.display = "block";
      } else {
        latentControls[i].style.display = "none";
      }
    }
    restart();
  };

  //
  // Buttons.
  //

  document.getElementById("button-restart").onclick = restart;

  document.getElementById("button-randomize").onclick = () => {
    latentVec = CPPN.randomLatentVec(maxLatentSize).dataSync();
    for (let i = 0; i < maxLatentSize; ++i) {
      latentSliders[i].value = latentVec[i] * 100;
      latentSliders[i].oninput();
    }
  };

  const canvas = document.getElementById("output-image");
  const ctx = canvas.getContext("2d");

  // Redraw the image when the draw button is clicked.
  const drawButton = document.getElementById("button-draw");
  drawButton.onclick = () => {
    const width = parseInt(widthSlider.value, 10);
    const height = parseInt(heightSlider.value, 10);
    const imageData = ctx.createImageData(width, height);

    canvas.width = width;
    canvas.height = height;

    CPPN.drawImage(
      model,
      tf.tensor1d(latentVec.slice(0, latentSize)),
      width,
      height,
      outputMode,
      imageData
    );
    ctx.putImageData(imageData, 0, 0);
  };
  drawButton.onclick(); // Automatically draw when the page is loaded.

  // Save the image when the save button is clicked.
  const saveButton = document.getElementById("button-save");
  saveButton.onclick = () => {
    saveButton.download = "image.png";
    saveButton.href = canvas
      .toDataURL("image/png")
      .replace(/^data:image\/[^;]/, "data:application/octet-stream");
  };
})();
