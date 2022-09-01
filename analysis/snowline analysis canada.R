data.kitkatla <- read.csv("~/snowlines/upload/kitkatla/snowlinesSnowlineLandsat 8Date2021-07-01Days16.csv")
saveRDS(data.kitkatla, "~/snowlines/data/data.kitkatla.rds")

# RSLA ####

# Find the middle distance of all the years distance ranges
middle_distance <- median(data.kitkatla$distance)

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
  
  result <- na.omit(result)
  
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
function.rsla_generation <- function(data, altitude, distance, time, aspect, altitude_translation_error, altitude_base_error) {
  
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
  uncertainty_measurement_error <- quantile(altitude_translation_error + altitude_base_error, 0.95)
  
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
                    uncertainty_aspect,
                    "no_data_points" = nrow(data)))
}

# Generate rsla ####
data.kitkatla_rsla <- function.rsla_generation(data.kitkatla, data.kitkatla$altitude, data.kitkatla$distance, data.kitkatla$aqcuisition_time, data.kitkatla$aspect, data.kitkatla$altitude_translation_error, data.kitkatla$altitude_base_error)

# Save ####
saveRDS(file = "~/snowlines/data/data.kitkatla_rsla.rds", object = data.kitkatla_rsla)
data.kitkatla_rsla <- readRDS("~/snowlines/data/data.kitkatla_rsla.rds")

# Plot ####

# Reclassify ####
x <- data.kitkatla$distance
y <- data.kitkatla$altitude

mdl <- lm(y ~ x)
summary(mdl)
mdl_plus_err <- data.kitkatla_rsla$plus_error
mdl_minus_err <- data.kitkatla_rsla$minus_error

# Open SVG ####
svg(filename = paste0("~/snowlines/outputs/snowline space/plots/snowline kitkatla plot.svg"),
    width = aes.canvas$width,
    height = aes.canvas$height,
    pointsize = aes.canvas$point_size)

# Empty Plot ####
plot(x = x,
     y = y,
     xlab = "Distance (km)",
     ylab = "Altitude (m)",
     xlim = c(0, 300),
     ylim = c(0, 2700),
     yaxs = "i",
     xaxs = "i",
     type = "n",
     frame.plot = FALSE,
     axes = FALSE)

# Points ####
points(x = x,
       y = y,
       cex = aes.symbols$datapoint_size_small,
       pch = aes.symbols$datapoint_shape,
       col = densCols(x = x,
                      y = y,
                      nbin = 2000,
                      colramp = aes.colour$ramp_heat))

# Regression ####
clip(x1 = min(x), x2 = max(x),
     y1 = min(y), y2 = max(y))
abline(a = mdl$coefficients[1],
       b = mdl$coefficients[2],
       col = aes.colour$solid_black,
       lwd = aes.canvas$line_width)

# Regression Aspect Uncertainty ####
clip(x1 = min(x), x2 = max(x),
     y1 = min(y), y2 = max(y))
abline(a = mdl$coefficients[1] + mdl_plus_err,
       b = mdl$coefficients[2],
       col = aes.colour$solid_black,
       lwd = aes.canvas$line_width,
       lty = "dashed")
clip(x1 = min(x), x2 = max(x),
     y1 = min(y), y2 = max(y))
abline(a = mdl$coefficients[1] - mdl_minus_err,
       b = mdl$coefficients[2],
       col = aes.colour$solid_black,
       lwd = aes.canvas$line_width,
       lty = "dashed")

# Axes ####
box(bty = "l", lwd = aes.canvas$line_width)

par(cex = 0.8)

axis(side = 2,
     at = c(0, 500, 1000, 1500, 2000, 2500, 3000),
     lwd = aes.canvas$line_width)
axis(side = 2, at = seq(0, 3000, by = 100), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

axis(side = 1,
     at = c(0, 50, 100, 150, 200, 250, 300),
     lwd = aes.canvas$line_width)
axis(side = 1, at = seq(0, 300, by = 10), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

# Close SVG ####
dev.off()

browseURL(url = "~/snowlines/outputs/snowline space/plots/snowline kitkatla plot.svg")
