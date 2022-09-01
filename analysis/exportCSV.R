# Import ####
dataList <- list(
  data.endOfAblationSeasonDates = readRDS("~/snowlines/data/data.end_of_ablation_season_dates.rds"),
  data.snowlinesRegional = readRDS("~/snowlines/data/data.snowlines_rsla.rds"),
  data.snowlinesGradients = readRDS("~/snowlines/data/data.snowlines_gradients.rds"),
  data.snowlinesKitkatlaRegional = readRDS("~/snowlines/data/data.kitkatla_rsla.rds"),
  data.climateTime = readRDS("~/snowlines/data/data.climate_time.rds"),
  stat.images = readRDS("~/snowlines/data/data.image_stats.rds"),
  stat.imagesMatrix = readRDS("~/snowlines/data/data.image_stats_matrix.rds"),
  stat.snowlineSpatial = readRDS("~/snowlines/outputs/snowline space/stat.snowline_spatial_analysis_melted.rds"),
  stat.snowlineRegional = readRDS("~/snowlines/outputs/snowline rsla/stat.rsla_analysis.rds"),
  stat.snowlineGradient = readRDS("~/snowlines/outputs/snowline gradient/stat.gradient_analysis.rds"),
  stat.climateSpace = readRDS("~/snowlines/outputs/climate space/stat.climate_spatial_analysis_melted.rds"),
  stat.climateTime = readRDS("~/snowlines/outputs/climate time/stat.climate_time_analysis_melted.rds")
)

# Export
for (name in names(dataList)) {
  tempData = dataList[name]
  write.csv(x = tempData[1],#apply(tempData[1], 2, as.character),
            file = paste0("~/snowlines/exports/", name, ".csv"))
}
