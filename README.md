# Snowlines
A project to delineate off-glacial mountain snowline altitudes at 30m resolution using [Landsat](https://landsat.gsfc.nasa.gov/) 4-8 and compare to climate/meteorology ([ERA5 Land Hourly Reanalysis](https://confluence.ecmwf.int/display/CKB/ERA5-Land%3A+data+documentation)) both through space and time. Specifically, this project looks at the Southern Norwegian mountains and tests the wider applicability of the linear spectral unmixing-based algorithm to Canada. All scripts, however, will work 'anywhere' in world - wherever the datasets can take you, however performance is not guaranteed. The project is split between processing imagery and climate data on [Google Earth Engine](https://earthengine.google.com/) and data analysis, statistics, and graphing in R. The algorithm (snow cover area) has been valdiated to show similar summertime performance to the MOD10A1 product (MODIS).

## Earth Engine Code
[Go to: Earth Engine Repository](https://code.earthengine.google.com/?accept_repo=users/lauriequincey/snowlines)

Clicking the above link will redirect to the Earth Engine java script code editor and will allow users to view and run the processing code of this study. Written on Earth Engine Code Editor Web-based IDE (JavaScript) v0.1.276. 

- "controller" and "bulCkontroller" contain the manual input settings and filler code needed to run the modules and export the data.
- "snowlines.js" contains the main algorithm for delineating snowlines from Landsats 4-8 at 30m resolution.
- "climate.js" processes climate data from the ERA5 Land Hourly Reanalysis dataset at 11,312m latitudinal resolution for each season.
- "imagery.js" collects the imagery for the date, transect, and satellite provided.
- "validation.js" validates the algorithm's performance at recovering snow cover extent against the widely used MOD10A1 product (MODIS psuedo FSC snow cover product).
- "sun.js" retrieves sun elevations for each date used in the snowlines.js script. Provides additional data for validation analyses.
- "transect.js" generates the geodesic transect from a line geometry. Is referenced by other scripts. 
- "ui.js" contains the source code for the snowlines application, see below.

## Beta Snowlines Application is Live!
[Go to: Snowlines Beta Application](https://lauriequincey.users.earthengine.app/view/snowlines-beta)

Resolve snowlines without any code, 'anywhere' in the world, in a matter of minutes.

As the original algorithm was created for use in Norway and in Summer, performance in other places of the world and seasons varies.

Note:
- The end result from running this produces a red coloured snow-edge.
- You will have to zoom the map viewer to see the results in full detail/without approximations if you are analysing larger than a local area. Why? - Earth Engine analyses are run to the output scale, not input scale. See: https://developers.google.com/earth-engine/guides/scale and https://developers.google.com/earth-engine/guides/projections.

## Analysis Code
Analysis scripts can be found under the "analysis" folder. They are written in R (v4.1.1).

## License
Currently, this repository comes with absolutely no license, meaning default copyright laws apply - [what does this mean?](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)
