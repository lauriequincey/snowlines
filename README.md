# Snowlines
_Quincey, L., Anderson, K., Reynolds, D. J., & Harrison, S. (2024). Summer snowline altitude gradients in Western Norway are influenced by maritime climate. Geografiska Annaler: Series A, Physical Geography, 1–22. [https://doi.org/10.1080/04353676.2024.2321426](https://doi.org/10.1080/04353676.2024.2321426)_

A project to delineate off-glacial mountain snowline altitude dynamics at sub-regional scales using [Landsat missions](https://landsat.gsfc.nasa.gov/) 4-8 with comparison to climate ([ERA5 Land Hourly Reanalysis](https://confluence.ecmwf.int/display/CKB/ERA5-Land%3A+data+documentation)) both through space and time. Specifically, this project looks at the Southern Norwegian mountains and tests the wider applicability of the linear spectral unmixing-based algorithm to Canada. All scripts, however, will work 'anywhere' in world - wherever the datasets can take you, however performance is not guaranteed. The project is split between processing imagery and climate data on [Google Earth Engine](https://earthengine.google.com/) and data analysis, statistics, and graphing in R. The algorithm (snow cover area) has been valdiated to show similar high sun elevation performance to the [MOD10A1 product](https://nsidc.org/data/mod10a1/versions/6) (MODIS). An interactive web application (Google Earth Engine Apps) is also available [here](https://lauriequincey.users.earthengine.app/view/snowlines) and can be accessed by anyone. For further information see this project's corrosponding journal article.

## Earth Engine Code
[Go to: Earth Engine Repository](https://code.earthengine.google.com/?accept_repo=users/lauriequincey/snowlines)

Clicking the above link will redirect to the Earth Engine java script code editor and will allow users to view and run the processing code of this study. Written on Earth Engine Code Editor Web-based IDE (JavaScript) v0.1.318.

- "controller" and "bulkController" contain the manual input settings and filler code needed to run the modules and export the data.
- "snowlines" contains the main algorithm for delineating snowlines from Landsats 4-9 at 30m resolution.
- "climate" processes climate data from the ERA5 Land Hourly Reanalysis dataset at 11,132m latitudinal resolution for each season.
- "imagery" collects the imagery for the date, transect, and satellite provided.
- "validation" validates the algorithm's performance at recovering snow cover extent against the widely used MOD10A1 product (MODIS psuedo FSC snow cover product).
- "transect" generates the geodesic transect from a line geometry.
- "ui" contains the code for the snowlines application, see below.

## Snowlines Application
[Go to: Snowlines Application](https://lauriequincey.users.earthengine.app/view/snowlines)

Resolve snowlines without any code in a matter of minutes for the study transect and experiment by using it anywhere in the world. As the original algorithm was created for use in Norway and in summer (high sun elevations), performance varies in other places of the world and seasons.

## Analysis Code
Analysis scripts can be found under the "analysis" folder. They are written in R (v4.1.1).
