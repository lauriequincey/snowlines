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
data.snowlines_climate <- lapply(X = snowlines_dates[1],
                                 FUN = function(x) {
                                   
                                   # Get Data
                                   snowlines_year <- data.snowlines[[x]]
                                   rsla_year <- data.snowlines_rsla[[x]]
                                   climate_year <- data.climate[[x]]
                                   
                                   
                                   
                                   # Clip Data
                                   # Clip Climate to snowlines
                                   climate_clipped <- subset(x = climate_year, climate_year$distance > min(snowlines_year$distance) & climate_year$distance < max(snowlines_year$distance))
                                   print(length(climate_clipped))
                                   
                                   # Clip snowlines to clipped climate
                                   snowlines_clipped <- subset(x = snowlines_year, snowlines_year$distance > min(climate_clipped$distance) & snowlines_year$distance < max(climate_clipped$distance))
                                   print(length(snowlines_clipped))

                                   
                                   
                                   # Bin Data
                                   # Bin Climate
                                   climate_binned <- sapply(X = seq(min(climate_clipped$distance), max(climate_clipped$distance), 11.312),
                                                            FUN = function(x) {mean(subset(x = climate_clipped, climate_clipped$distance > x & climate_clipped$distance < x + 11.312))})
                                   print(length(climate_binned))
                                   
                                   # Bin Snowlines
                                   snowlines_binned <- sapply(X = seq(min(snowlines_clipped$distance), max(snowlines_clipped$distance), 11.312),
                                                              FUN = function(x) {mean(subset(x = snowlines_year[["altitude"]], snowlines_year$distance > x & snowlines_year$distance < x + 11.312))})
                                   print(length(snowlines_binned))
                                   

                                   
                                   # Output
                                   return(data.frame(snowlines_binned, climate_binned))
                                   
                                 })





seq(min(data.snowlines[[1]]$distance), max(data.snowlines[[1]]$distance), 11.312)