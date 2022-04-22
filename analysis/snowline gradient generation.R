# WARNING: Script contains bootstrap code that can take days to run depending on the size of the data. It is advised to be sourced as a local job.
# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.snowlines <- readRDS("~/snowlines/data/data.snowlines.rds")

# Libraries ####
require(boot)

# Prep ####
function.boot <- function(data, indicies){
  boot <- data[indicies,]
    
  # Regression
  ols_regression <- lm(boot$altitude ~ boot$distance)
    
  # SLA Gradient
  return(ols_regression$coefficients[2])
}

boot_output <- list()

# Generate Gradients ####
snowline_gradients = as.data.frame(do.call(what = rbind, args = lapply(X = data.snowlines, FUN = function(x) {
  
  # Time
  aqcuisition_time_year = as.numeric(format(x = as.Date(as.POSIXct(x = x$unix_aqcuisition_time/1000, origin = "1970-01-01")), format = "%Y")[1])
  aqcuisition_time_median = median(x$unix_aqcuisition_time/1000)
  aqcuisition_time_min = min(x$unix_aqcuisition_time/1000)
  aqcuisition_time_max = max(x$unix_aqcuisition_time/1000)
  
  # Gradient
  gradient = unname(lm(x$altitude ~ x$distance)$coefficients[2])
  
  return(data.frame("aqcuisition_time_year" = aqcuisition_time_year,
                    "aqcuisition_time_median" = aqcuisition_time_median,
                    "aqcuisition_time_min" = aqcuisition_time_min,
                    "aqcuisition_time_max" = aqcuisition_time_max,
                    "gradient" = gradient))
})))
  
# Generate Gradient Error ####

# Bootstrap
for(i in names(data.snowlines)) {
  
  # Select Just the columns I want to bootstrap
  columns_for_boot <- data.frame("altitude" = data.snowlines[[i]]$altitude,
                                 "distance" = data.snowlines[[i]]$distance)
  
  # Bootstrap using rSLA Function
  # 'R' is the number of samples. Default = 10000
  boot_gradients <- boot(columns_for_boot, function.boot, R = 10000)
  
  boot_output <- append(boot_output, list(boot_gradients))
  
  cat("\n", i, "bootstrap complete")
}
saveRDS(object = boot_output, file = "~/snowlines/outputs/snowline gradient/boot_output.rds")

# Already got boostrap data and want to change the confidence interval without having to wait an eternity again? - use this line to read in the previous bootstrap data
#boot_output <- readRDS(file = "~/snowlines/outputs/snowline gradient/boot_output.rds")

# Confidence Intervals
# If you receive warnings about extreme order statistics it means you need to increase the bootstrap sample amount above (the 'R' value) and rerun.
snowline_gradient_errors = as.data.frame(do.call(what = rbind, args = lapply(X = boot_output, FUN = function(x) {
  
  confidence_intervals = boot.ci(x, conf = 0.95, type = ("perc"))
  
  return(data.frame("gradient_error_upper" = confidence_intervals$percent[4],
                    "gradient_error_lower" = confidence_intervals$percent[5]))
})))

# Melt ####
data.snowlines_gradients <- cbind(snowline_gradients, snowline_gradient_errors)

# Save ####
saveRDS(object = data.snowlines_gradients, file = "~/snowlines/data/data.snowlines_gradients.rds")
