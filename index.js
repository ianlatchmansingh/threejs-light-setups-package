import * as THREE from "three";

function threeLight(settings) {
  // Variable Setup for defaults
  var scene = new THREE.Scene();
  const defaults = {
    type: "ring",
    scene: scene,
    size: 1,
    points: 8,
    altitude: 0,
    temp: 0,
    intensity: 0.2,
    shadows: false,
    debug: false,
  };

  const userSettings = Object.assign({}, defaults, settings);

  // Construct Ring Geometry
  const curve = new THREE.EllipseCurve(
    0,
    0, // ax, ay
    userSettings.size,
    userSettings.size,
    0,
    2 * Math.PI,
    false,
    0
  );

  // Construct Grid Geometry
  // Get nearest truncated square root for point value
  let gLength = Math.floor(
    Math.sqrt(THREE.MathUtils.clamp(userSettings.points, 4, 256))
  );
  // offsets to align over origin
  let gOffset = userSettings.size / 2;
  // increment size per unit
  let gInc = userSettings.size / gLength;

  // Collect / Create Geometry Points
  let p = [];
  if (userSettings.type === "ring") {
    p = curve.getPoints(userSettings.points);
  } else if (userSettings.type === "grid") {
    for (let x = 1; x < gLength + 1; x++) {
      for (let y = 1; y < gLength + 1; y++) {
        let vert = {};
        vert.x = x * gInc - gOffset - gInc / 2;
        vert.y = y * gInc - gOffset - gInc / 2;
        p.push(vert);
      }
    }
  }

  // Color Math
  let temp = THREE.MathUtils.clamp(userSettings.temp, -100, 100);
  let lightness = 50;
  let warmMin = 20;
  let warmMax = 60;
  let coolMin = 170;
  let coolMax = 210;
  // Warm Spectrum
  if (userSettings.temp < 0) {
    temp = THREE.MathUtils.mapLinear(temp, -100, 0, warmMin, warmMax);
    lightness = THREE.MathUtils.mapLinear(temp, warmMin, warmMax, 50, 100);
  } else if (userSettings.temp > 0) {
    temp = THREE.MathUtils.mapLinear(temp, 0, 100, coolMin, coolMax);
    lightness = THREE.MathUtils.mapLinear(temp, coolMin, coolMax, 100, 50);
  } else if (userSettings.temp === 0) {
    temp = 0;
    lightness = 100;
  }
  const lightColor = new THREE.Color(
    "hsl(" + temp + ", 100%," + lightness + "%)"
  );

  // Light Factory
  let lights = [];
  let debug = [];

  //   if (userSettings.type === "ring") {
  for (let i = 0; i < p.length; i++) {
    let light = new THREE.PointLight(lightColor, userSettings.intensity, 100);
    light.position.set(p[i].x, userSettings.altitude, p[i].y);
    light.castShadow = userSettings.shadows;
    lights.push(light);

    // Debug Mode
    if (userSettings.debug) {
      let geoDebug = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      let matDebug = new THREE.MeshBasicMaterial(0xffffff);
      let cubeDebug = new THREE.Mesh(geoDebug, matDebug);
      cubeDebug.position.set(p[i].x, userSettings.altitude, p[i].y);
      debug.push(cubeDebug);
    }
  }

  // Add to Scene
  for (let i = 0; i < lights.length; i++) {
    userSettings.scene.add(lights[i]);
    userSettings.debug && userSettings.scene.add(debug[i]);
  }
}

export default threeLight;
