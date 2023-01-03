# threejs-light-setups

ThreeJS Light Setups is a simple package intended for recreating array-based lighting with some nice parameters that simplify the setup and calculations. This is most useful for showing 3D products within the browser in even, symmetrical lighting conditions.
![Demo GIF of rotating skull](https://raw.githubusercontent.com/ianlatchmansingh/threejs-light-setups-package/main/demo.gif)

## Dependencies

This package requires ThreeJS.

## Usage

Use `npm install threejs-light-setups` in your terminal and working directory to get started.

### Import

    import * as THREE from "three";
    import threeLight from "threejs-light-setups";

### Parameters

The parameters below enable you to dramatically change the character of the light array. Currently, the light type is set to [Point Light](https://threejs.org/docs/?q=point#api/en/lights/PointLight). You can send the parameters via a Javascript Object as shown:

    const lightSettings = {
        type: "ring",
        scene: scene,
        size: 2,
        points: 20,
        altitude: 1,
        temp: -50,
        intensity: 0.1,
        shadows: true,
        debug: true,
        };
    threeLight(lightSettings);

#### Type (String)

Choose from either `"ring"` or `"grid"`.
Ring lights are arranged in a circular shape and populate along the edge loop.
Grid lights are arranged in a squared grid and populate for every subdivision vertex.
_Defaults to `"ring"`_

#### Scene (String)

The variable name of the ThreeJS Scene to which the lights are being added.
_Defaults to `"scene"`_

#### Size (Float)

The virtual size of the light setup.
_Defaults to `1`_

#### Points (Integer)

The number of lights to appear within the selected Type.
_`"ring"` defaults to 8, with a minimum of 3 and a maximum of 256._
_`"grid"` defaults to 4, recommended minimum of 4 but calculates to the nearest square._

#### Altitude (Float)

The distance of the lights from the origin (`0, 0, 0`)
_Defaults to `0`_

#### Temperature (Float)

The warmth or coolness of the lights.
Values from `-100` to `-1` will produce warmer temperatures.
Values from `1` to `100` will produce warmer temperatures.
A value of `0` will produce a flat white light.
All temperatures are subject to linear mapping that increase lightness too `100%` as the value approaches 0.
_Defaults to `0`_

#### Intensity (Float)

The intensity of each light.
_Defaults to `0.2`_

#### Casts Shadows (Boolean)

Whether or not the lights cast shadows. [View ThreeJS documentation](https://threejs.org/docs/index.html#api/en/lights/PointLight.castShadow) for more details.
_Defaults to `false`_

#### Debug Mode (Boolean)

Turns on some cubic meshes with Basic materials to show light positions.
_Defaults to `false`_

## SLA

This package is maintained as a "best effort" SLA.

## Roadmap

- Light Types
- Light Targets
- 3-Point Studio Light Setup
- Cyclorama
