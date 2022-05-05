# Import ####
data.altitudes <- na.omit(read.csv("~/snowlines/upload/climate altitudes.csv"))
data.climate <- readRDS("~/snowlines/data/data.climate.rds")

# Conversion Factor ####
conversion_factor <- (data.altitudes$altitude / 100) * 0.65


# Convert ####
converted_temps <- lapply(X = data.climate,
                          FUN = function(x) {
                            
                            new_data <- x[c(grepl("temperature", colnames(x)) & grepl("mean", colnames(x)))] + conversion_factor - 273.15
                            
                            names(new_data) <- paste0(colnames(new_data), "_converted")
                            
                            
                            merged_data <- cbind(new_data, x)


                            return(merged_data)                            
                            } )

saveRDS(object = converted_temps, file = "~/snowlines/data/data.climate_converted.rds")

plot(y = converted_temps$`1981`$winter_temperature_2m_mean_converted, x = converted_temps$`1981`$distance)

qqnorm(converted_temps$`1981`$winter_temperature_2m_mean_converted)
