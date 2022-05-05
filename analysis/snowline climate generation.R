# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.climate <- readRDS("~/snowlines/data/data.climate.rds")
data.snowlines <- readRDS("~/snowlines/data/data.snowlines.rds")
data.snowlines_rsla <- readRDS("~/snowlines/data/data.snowlines_rsla.rds")

# Manipulate Data ####

# Make list of snowline years
snowlines_dates <- as.list(names(data.snowlines))

# For every snowline year, clip associated climate data, and bin snowline data to climate resolution.
data.snowlines_climate <- lapply(X = snowlines_dates,
                                 FUN = function(x) {
                                   
                                   # Get Data
                                   snowlines_year <- data.snowlines[[x]]
                                   climate_year <- data.climate[[x]]
                              
                                   
                                   # Clip Data
                                   # Clip Climate to snowlines
                                   climate_clipped <- subset(x = climate_year, climate_year$distance > min(snowlines_year$distance) & climate_year$distance < max(snowlines_year$distance))
                                   
                                   # Clip snowlines to clipped climate
                                   snowlines_clipped <- subset(x = snowlines_year, snowlines_year$distance > min(climate_clipped$distance) & snowlines_year$distance < max(climate_clipped$distance))
                                   
                                   # Get the minimist and maximist distances.
                                   min_dist <- min(c(min(snowlines_year$distance), min(climate_clipped$distance)))
                                   max_dist <- max(c(max(snowlines_year$distance), max(climate_clipped$distance)))
                                   
                                   # Bin Data
                                   # Bin Climate
                                   climate_binned <- as.data.frame(t(sapply(X = seq(min_dist, max_dist, 5),
                                                                            FUN = function(x) {apply(X = climate_clipped,
                                                                                                     MARGIN = 2,
                                                                                                     FUN = function(y) {mean(subset(x = y, climate_clipped$distance > x & climate_clipped$distance < x + 5))})})))
                                   
                                   # Bin Snowlines
                                   snowlines_binned <- as.data.frame(t(sapply(X = seq(min_dist, max_dist, 5),
                                                                              FUN = function(x) {apply(X = snowlines_clipped[, seq(2, 9)],
                                                                                                       MARGIN = 2,
                                                                                                       FUN = function(y) {mean(subset(x = y, snowlines_clipped$distance > x & snowlines_clipped$distance < x + 5))})})))
                                   

                                   print(x)
                                   
                                   # Output
                                   return(na.omit(data.frame(snowlines_binned, climate_binned)))
                                   
                                 })

names(data.snowlines_climate) <- snowlines_dates

# Save ####
saveRDS(object = data.snowlines_climate, file = "~/snowlines/data/data.snowlines_climate.rds")
