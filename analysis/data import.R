# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# End of Ablation Season ####

# Libraries
require(readxl)

# Import Data
data.Anestolen_443 <- read_excel("~/snowlines/upload/end of ablation season/Anestolen 443 Coverted and Cleaned.xlsx")
data.FV614_Grytadalen_422 <- read_excel("~/snowlines/upload/end of ablation season/FV614 Grytadelen 422 Converted and Cleaned.xlsx")
data.Jostedalen_Mjolversgrendi_305 <- read_excel("~/snowlines/upload/end of ablation season/Jostedalen - Mjolversgrendi 305 Converted and Cleaned.xlsx")
data.Juvasshoe_1894 <- read_excel("~/snowlines/upload/end of ablation season/Juvasshoe 1894.xlsx")
data.Myklebust_I_Breim_315 <- read_excel("~/snowlines/upload/end of ablation season/Myklebust I Breim 315.xlsx")
data.Sognefjellet_snopute_nye_1425 <- read_excel("~/snowlines/upload/end of ablation season/Sognefjellet snopute (nye) 1425.xlsx")

# Merge
data.snow_depth <- data.frame(
  "Date" = data.Anestolen_443$Date,
  "Anestolen_443" = data.Anestolen_443$`sd(cm)`,
  "FV614_Grytadalen_422" = data.FV614_Grytadalen_422$`sd(cm)`,
  "Jostedalen_Mjolversgrendi_305" = data.Jostedalen_Mjolversgrendi_305$`sd(cm)`,
  "Juvasshoe_1894" = data.Juvasshoe_1894$`sd(cm)`,
  "Myklebust_I_Breim_315" = data.Myklebust_I_Breim_315$`sd(cm)`,
  "Sognefjellet_snopute_nye_1425" = data.Sognefjellet_snopute_nye_1425$`sd(cm)`
)

# Save as RDS
saveRDS(object = data.snow_depth, file = "~/snowlines/data/data.snow_depth.rds")

# Clean
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Snowline ####

# Import function with row binding for directory contents
function.importer_rbind <- function(directory, year) {
  
  # for each file in each folder read, omitting NAs, and row bind together. Then for each yearly file created from each folder, put them into a list.
  return(do.call(rbind,
                 lapply(paste0(directory, "/", year, "/", list.files(paste0(directory, "/", year))),
                        read.csv
                 )
  ))
  
}

# List of folder names
list_of_years <- list.files("~/snowlines/upload/snowline")

# Blank output list
data.snowlines <- c()

# Iterate through each folder, importing all files, row-binding, to generate list of 1 dataframe per year
for(i in list_of_years) {
  
  # Import
  temp_dataframe <- function.importer_rbind(directory = "~/snowlines/upload/snowline",
                                               year = i)
  
  # Add to output list
  data.snowlines[[(length(data.snowlines) + 1)]] <- na.omit(temp_dataframe)[-11]
  
  # Progress
  cat(paste0("\n", i, " complete"))
  
}

# Rename list entries
names(data.snowlines) <- list_of_years

# Save as RDS
saveRDS(object = data.snowlines, file = "~/snowlines/data/data.snowlines.rds")

# Clean
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Climate ####

# Import function with column binding for directory contents
function.importer_cbind <- function(directory, year) {
  
  # for each file in each folder read, omitting NAs, and column bind together. Then for each yearly file created from each folder, put them into a list.
  return(do.call(cbind,
                 lapply(paste0(directory, "/", year, "/", list.files(paste0(directory, "/", year))),
                        read.csv
                 )
  ))
}

# List of column names
#column_names <- c("altitude", "autumn_snow_evaporation_mean", "autumn_snow_evaporation_stdDev", "autumn_snowfall_mean", "autumn_snowfall_stdDev", "autumn_snowmelt_mean", "autumn_snowmelt_stdDev", "autumn_surface_latent_heat_flux_mean", "autumn_surface_latent_heat_flux_stdDev", "autumn_surface_sensible_heat_flux_mean", "autumn_surface_sensible_heat_flux_stdDev", "autumn_surface_solar_radiation_downwards_mean", "autumn_surface_solar_radiation_downwards_stdDev","autumn_temperature_2m_mean", "autumn_temperature_2m_stdDev", "distance", "spring_snow_evaporation_mean", "spring_snow_evaporation_stdDev", "spring_snowfall_mean", "spring_snowfall_stdDev", "spring_snowmelt_mean", "spring_snowmelt_stdDev", "spring_surface_latent_heat_flux_mean", "spring_surface_latent_heat_flux_stdDev", "spring_surface_sensible_heat_flux_mean", "spring_surface_sensible_heat_flux_stdDev", "spring_surface_solar_radiation_downwards_mean", "spring_surface_solar_radiation_downwards_stdDev", "spring_temperature_2m_mean", "spring_temperature_2m_stdDev", "summer_snow_evaporation_mean", "summer_snow_evaporation_stdDev", "summer_snowfall_mean", "summer_snowfall_stdDev", "summer_snowmelt_mean", "summer_snowmelt_stdDev", "summer_surface_latent_heat_flux_mean", "summer_surface_latent_heat_flux_stdDev", "summer_surface_sensible_heat_flux_mean", "summer_surface_sensible_heat_flux_stdDev", "summer_surface_solar_radiation_downwards_mean", "summer_surface_solar_radiation_downwards_stdDev", "summer_temperature_2m_mean"                     ,"summer_temperature_2m_stdDev"                   ,"winter_snow_evaporation_mean"                   ,"winter_snow_evaporation_stdDev"                 ,"winter_snowfall_mean"                           ,"winter_snowfall_stdDev"                         ,"winter_snowmelt_mean"                           ,"winter_snowmelt_stdDev", "winter_surface_latent_heat_flux_mean", "winter_surface_latent_heat_flux_stdDev", "winter_surface_sensible_heat_flux_mean", "winter_surface_sensible_heat_flux_stdDev", "winter_surface_solar_radiation_downwards_mean", "winter_surface_solar_radiation_downwards_stdDev", "winter_temperature_2m_mean", "winter_temperature_2m_stdDev")

# List of folder names
list_of_years <- list.files("~/snowlines/upload/climate")

# Blank output list
data.climate <- c()

# Iterate through each folder, importing all files, column-binding, to generate list of 1 dataframe per year
for(i in list_of_years) {
  
  # Run import function
  temp_dataframe <- function.importer_cbind(directory = "~/snowlines/upload/climate",
                          year = i)
  
  # Remove duplciate columns (distance, altitude, etc.)
  temp_dataframe <- temp_dataframe[, !duplicated(colnames(temp_dataframe))]
  
  # Add to output list, removing altitudes, .geo, system index. 
  data.climate[[(length(data.climate) + 1)]] <- na.omit(temp_dataframe)[c(grepl("mean", colnames(temp_dataframe)) | grepl("sem", colnames(temp_dataframe)) | grepl("distance", colnames(temp_dataframe)))]
  
  # Progress
  cat(paste0("\n", i, " complete"))
}

# Rename list entries
names(data.climate) <- list_of_years

# Save as RDS
saveRDS(object = data.climate, file = "~/snowlines/data/data.climate.rds")

# Clean
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Validation Import ####

# Read validation.csv
data.validation <- read.csv("~/snowlines/upload/validation/snowlinesValidation.csv")[c(-1, -7)]

# Save as RDS
saveRDS(object = data.validation, file = "~/snowlines/data/data.validation.rds")

# Clean
rm(list = ls())
while (dev.cur() > 1) dev.off()