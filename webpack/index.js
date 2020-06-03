// Bootstrap stylesheet
import "bootstrap/dist/css/bootstrap.min.css";

import Clock from "./components/Clock/Clock";
import NQueens from "./components/NQueens/NQueens";
import React from "react";
import Resistance from "./components/Resistance/Resistance";
import { render } from "react-dom";

// Mapping from different id's to React components.
const REACT_COMPONENTS = {
  clock: <Clock />,
  resistance: <Resistance />,
  nqueens: <NQueens />,
};

// Mounts React components at various points on the page. All mount points are
// of the class `react`, and their `id` indicates which component to mount.
function mountReactComponents() {
  const reactMountPoints = document.getElementsByClassName("react");
  for (let i = 0; i < reactMountPoints.length; ++i) {
    const mountPoint = reactMountPoints[i];
    const component = REACT_COMPONENTS[mountPoint.id];
    if (component !== undefined) render(component, mountPoint);
  }
}

mountReactComponents();
