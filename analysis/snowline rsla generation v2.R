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

function.snowline_uncertainty <- function(data, altitude, aspect) {
  
  # Generate sequence of aspect degree bins to loop through
  aspect_ranges = seq(from = 0, to = 355, by = 3)
  
  # Declare Output Dataframe
  result <- na.omit(data.frame("binstart" = NA,
                                   "mean_alt" = NA))
  
  # Loop
  # For every aspect degree bin...
  for (k in aspect_ranges) {

    high <- k + 3
    low <- k
    bin <- subset(data, data$aspect > low & data$aspect < high)
    
    # Retrieve the aspects from the subset data
    alt_mean <- mean(bin$altitude)
    
    # Add to Output Dataframe
    result[nrow(result) + 1, ] = c(low,
                                           alt_mean)
    
  }
  
  # Plot aspects - kinda interesting...
  #plot(result$binstart, result$mean_alt, main = stat.dataframe_name)
  
  # With this, find the max and min and mean altitudes
  altmean <- mean(result$mean_alt)
  altmax <- max(result$mean_alt)
  altmin <- min(result$mean_alt)
  
  # Then, find plus minus error as a 95 and 5% quantile (helps get rid of outliers)
  plus_error <- quantile(x = result$mean_alt, probs = seq(0, 1, 0.05))[20]-altmean #altmax-altmean
  minus_error <- altmean-quantile(x = result$mean_alt, probs = seq(0, 1, 0.05))[2] #altmean-altmin
  
  # And then, the aspects the min and max altitude errors come from
  plus_error_aspect <- result$binstart[match(x = max(result$mean_alt), table = result$mean_alt)] # north west has max height
  minus_error_aspect <- result$binstart[match(x = min(result$mean_alt), table = result$mean_alt)] # south west has min height
  
  return(data.frame("plus_error" = plus_error,
                    "minus_error" = minus_error,
                    "plus_error_aspect" = plus_error_aspect,
                    "minus_error_aspect" = minus_error_aspect))
}


# rsla Generation Function
function.rsla_generation <- function(data, altitude, distance, time, aspect, altitudinal_translation_error, elevation_base_error) {
  
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
  uncertainty_aspect <- function.snowline_uncertainty(data, altitude, aspect)
  
  # Return
  return(data.frame("aqcuisition_time_year" = aqcuisition_time_year,
                    "aqcuisition_time_median" = aqcuisition_time_median,
                    "aqcuisition_time_min" = aqcuisition_time_min,
                    "aqcuisition_time_max" = aqcuisition_time_max,
                    "rsla" = rsla,
                    "uncertainty_measurement_error" = uncertainty_measurement_error,
                    "uncertainty_prediction_interval" = uncertainty_prediction_interval,
                    uncertainty_aspect))
}

# Generate rsla ####
data.snowlines_rsla <- as.data.frame(do.call(what = rbind, args = lapply(X = data.snowlines, FUN = function(x) {
  return(function.rsla_generation(x, x$altitude, x$distance, x$unix_aqcuisition_time, x$aspect, x$altitudinal_translation_error, x$elevation_base_error))
})))

# Save ####
saveRDS(file = "~/snowlines/data/data.snowlines_rsla.rds", object = data.snowlines_rsla)
