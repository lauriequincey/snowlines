# Snowlines
A project to delineate off-glacial mountain snowline altitudes at 30m resolution using Landsats 4-8 and compare to climate (ERA5 Land Hourly Reanalysis) both through space and time. Specifically, this project looks at the Southern Norwegian mountains and tests the wider applicability of the linear spectral unmixing-based algorithm to Alaska. All scripts, however, will work 'anywhere' in world - wherever the datasets can take you. In the spirit of science, all of the code is openly accessable. The project is split between processing imagery and climate data on Google Earth Engine and data analysis, statistics, and graphing in R.

## Earth Engine Code
[Go to: Earth Engine Repository](https://code.earthengine.google.com/?accept_repo=users/lauriequincey/snowlines)

Clicking the above link will redirect to the Earth Engine java script code editor and will allow users to view and run the code files of this study. Written on Earth Engine Code Editor Web-based IDE (JavaScript) v0.1.276. 

**Within this Earth Engine repository the finished scripts can be found in the folder "snowlines". These are the same scripts pushed to this github repo ("earth engine" folder).**

- "snowlines.js" contains the main algorithm for delineating snowlines from Landsats 4-8 at 30m resolution.
- "climate.js" processes climate data from the ERA5 Land Hourly Reanalysis dataset at 11,312m resolution for each season.
- "validation.js" validates the algorithm's performance at recovering snow cover extent against the widely used MOD10A1 product (MODIS psuedo FSC snow cover product).
- "sun.js" retrieves sun elevations for each date used in the snowlines.js script. Provides additional data for validation analyses.
- "ui.js" contains the source code for the snowlines application, see below. 

## Beta Snowlines Application is Live!
[Go to: Snowlines Beta Application](https://lauriequincey.users.earthengine.app/view/snowlines-beta)

Resolve snowlines without any code, 'anywhere' in the world, in a matter of minutes.

Note:
- The end result from running this produces a red coloured snow-edge.
- Glaciers and ice caps are masked, however, an unmasked snow-edge is also available in the map layers.
- You will likely have to zoom the map viewer to see the snow-edge result in full detail if you are analysing larger than a local area. Why? - Earth Engine analyses are run to the output scale, not input scale. See: https://developers.google.com/earth-engine/guides/scale.

## Analysis Code
Analysis scripts can be found under the "analysis" folder. They are written in R (v4.1.1).
