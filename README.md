# Snowlines
A project to delineate off-glacial mountain snowline altitudes at 30m resolution using Landsats 4-8 and compare to climate (ERA5 Land Hourly Reanalysis) both through space and time. Specifically, this project looks at Southern Norwegian mountains and tests the wider applicability of the novel linear spectral unmixing-based algorithm developed here to Alaska. 

## Earth Engine Code
[Go to: Earth Engine Repository](https://code.earthengine.google.com/?accept_repo=users/lauriequincey/snowlines)

Clicking the above link will redirect to the Earth Engine java script code editor and will allow users to view and run the code files of this study.

**Within this Earth Engine repository the finished scripts can be found in the folder "snowlines". These are the same scripts pushed to this github repo ("earth engine" folder).**

- "snowlines.js" contains the main algorithm for delineating snowlines from Landsats 4-8 at 30m resolution.
- "climate.js" processes climate data from the ERA5 Land Hourly Reanalysis dataset at 11,312m resolution for each season.
- "validation.js" validates the algorithm's performance at recovering snow cover extent against the widely used MOD10A1 product (MODIS psuedo FSC snow cover product).
- "sun.js" retrieves sun elevations for each date used in the snowlines.js script. Provides additional data for validation analysis.
- "ui.js" contains the source code for the snowlines application, see below. 

## Beta Snowlines Application is Live!
[Go to: Snowlines Beta Application](https://lauriequincey.users.earthengine.app/view/snowlines-beta)

Analyse spatial snowline altitudes without any code, 'anywhere' in the world, in a matter of minutes.

Note: The end result from running this produces a red coloured snowline. You will have to manually zoom in to see the extent of the delineation as, for speed, Earth Engine applies an adaptive resolution to the viewer.
