# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.snowlines <- readRDS("~/snowlines/data/data.snowlines.rds")

# Prep ####

# Find the middle distance of all the years distance ranges
middle_distance <- mean(do.call(what = rbind,
                                args = lapply(data.snowlines, function(x) {return(median(x$distance))})
                                ))

# Function find regression uncertainty based on aspect
function.snowline_uncertainty <- function(altitude, aspect) {
  
  mean_altitudes = do.call(what = rbind,
                           args = apply(X = as.data.frame(seq(from = 0, to = 355, by = 0.1)),
                                        MARGIN = 1,
                                        FUN = function(y) {data.frame("altitudes" = mean(subset(altitude, aspect > y, aspect < y + 5)),
                                                                      "median_bin_aspect" = y + 2.5)}
                           )
  )
  
  # Find min, max, and mean altitudes of the binned altitude list
  min_altitude <- min(mean_altitudes$altitudes)
  max_altitude <- max(mean_altitudes$altitudes)
  mean_altitude <- mean(mean_altitudes$altitudes)
  
  # Find the 95th and 5th percentile difference between the mean for min and max
  alt_plus_error <- unname(quantile(x = mean_altitudes$altitudes, probs = seq(0, 1, 0.05))[20] - mean_altitude)
  alt_minus_error <- unname(mean_altitude - quantile(x = mean_altitudes$altitudes, probs = seq(0, 1, 0.05))[2])
  
  # Find aspects the altitude errors come from
  alt_plus_error_aspect <- mean_altitudes$median_bin_aspect[match(x = max(mean_altitudes$altitudes), table = mean_altitudes$altitudes)]
  alt_minus_error_aspect <- mean_altitudes$median_bin_aspect[match(x = min(mean_altitudes$altitudes), table = mean_altitudes$altitudes)]
  
  # Output in dataframe
  return(data.frame("alt_plus_error" = alt_plus_error,
                    "alt_minus_error" = alt_minus_error,
                    "alt_plus_error_aspect" = alt_plus_error_aspect,
                    "alt_minus_error_aspect" = alt_minus_error_aspect))
}

# rsla Generation Function
function.rsla_generation <- function(altitude, distance, time, aspect, altitudinal_translation_error, elevation_base_error) {
  
  # Time
  aqcuisition_time_year = as.numeric(format(x = as.Date(as.POSIXct(x = time/1000, origin = "1970-01-01")), format = "%Y")[1])
  aqcuisition_time_median = median(time/1000)
  aqcuisition_time_min = min(time/1000)
  aqcuisition_time_max = max(time/1000)
  
  # ols regression
  ols_regression <- lm(altitude ~ distance)
  
  # rsla
  rsla <- ols_regression$coefficients[2] * middle_distance + ols_regression$coefficients[1]
  
  # Snowline regression uncertainty by measurement error 95th percentile
  uncertainty_measurement_error <- quantile(altitudinal_translation_error + elevation_base_error, 0.95)
  
  # Snowline regression uncertainty by prediction interval
  predict <- data.frame(predict(object = ols_regression, newdata = data.frame(distance), interval = 'predict', level = 0.95))
  uncertainty_prediction_interval <- mean(predict$upr) - mean(predict$fit)
  
  # Snowline regression uncertainty by aspect
  uncertainty_aspect <- function.snowline_uncertainty(altitude, aspect)
 
  # Return
  return(data.frame("aqcuisition_time_year" = aqcuisition_time_year,
                    "aqcuisition_time_median" = aqcuisition_time_median,
                    "aqcuisition_time_min" = aqcuisition_time_min,
                    "aqcuisition_time_max" = aqcuisition_time_max,
                    "rsla" = rsla,
                    "uncertainty_measurement_error" = uncertainty_measurement_error,
                    "uncertainty_prediction_interval" = uncertainty_prediction_interval,
                    "uncertainty_aspect" = uncertainty_aspect))
}

# Generate rsla ####
data.snowlines_rsla <- as.data.frame(do.call(what = rbind, args = lapply(X = data.snowlines, FUN = function(x) {
  return(function.rsla_generation(x$altitude, x$distance, x$unix_aqcuisition_time, x$aspect, x$altitudinal_translation_error, x$elevation_base_error))
})))

# Save ####
saveRDS(file = "~/snowlines/data/data.snowlines_rsla.rds", object = data.snowlines_rsla)
