# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.validation <- readRDS(file = "~/snowlines/data/data.validation.rds")
data.sun <- readRDS(file = "~/snowlines/data/data.sun.rds")


# Normality ####
function.normality = function(x_data, y_data, title) {
  
  # Set up Plot Window
  par(mfrow = c(2, 2))
  
  # Descriptive Statistics
  mean = mean(x = y_data)
  median = median(x = y_data)
  observations = length(x = y_data)
  shapiro = shapiro.test(x = y_data)
  
  # Histogram
  hist(x = y_data,
       freq = FALSE,
       breaks = 100,
       main = paste0('Histogram of ', title))
  abline(v = mean,
         col = "red",
         lwd = 2)
  abline(v = median,
         col = "green",
         lwd = 2)
  curve(dnorm(x,
              mean = mean(x),
              sd = sd(x)
  ),
  col = "blue",
  lwd = 2,
  yaxt = "n",
  add = TRUE)
  
  # Boxplot
  boxplot(x = y_data,
          range = 0,
          main = paste0('Boxplot of ', title))
  
  # Q-Q plot
  qqnorm(y = y_data,
         pch = 20,
         main = paste0('Q-Q Plot of ', title))
  qqline(y = y_data,
         lwd = 2,
         col = 'yellow')
  
  # Text Plot
  plot.new()
  text(x = 0.5, y = 0.9, labels = "Mean:")
  text(x = 0.5, y = 0.8, labels = mean)
  text(x = 0.5, y = 0.7, labels = "Median:")
  text(x = 0.5, y = 0.6, labels = median)
  text(x = 0.5, y = 0.5, labels = "Observations:")
  text(x = 0.5, y = 0.4, labels = observations)
  text(x = 0.5, y = 0.3, labels = "shapiro-wilkes w stat:")
  text(x = 0.5, y = 0.2, labels = y_data[1])
  text(x = 0.5, y = 0.1, labels = "shapiro-wilkes pval:")
  text(x = 0.5, y = 0.0, labels = y_data[2])
  
  ## Quick Plot
  #par(mfrow = c(1, 1))
  #
  #plot(x = x_data,
  #     y = y_data,
  #     xlim = c(0, 300),
  #     ylim = c(0, 2500),
  #     main = paste0("Quick Plot of ", title))
  
}

# Open PDF
pdf('~/snowlines/outputs/validation/validation normality.pdf')

# Get Data
x_data <- data.validation$terra_snow_cover_percentage
y_data <- data.validation$landsat_snow_cover_percentage
title <- "Validation Normality"

# Run Normality Function
function.normality(x_data, y_data, title)
dev.off()

# Correlation Regression ####

# Pearson's Correlation
pearsons_correlation <- cor.test(x = data.validation$terra_snow_cover_percentage, y = data.validation$landsat_snow_cover_percentage)

# Regression
ols_regression <- lm(formula = landsat_snow_cover_percentage ~ terra_snow_cover_percentage, data = data.validation)

# Write to dataframe
stat.validation <- data.frame(
  "pcor_cor" = as.numeric(as.character(pearsons_correlation$estimate[1])), # pcor_cor
  "pcor_pval" = as.numeric(as.character(pearsons_correlation$p.value[1])), # pcor_pval
  "pcor_df" = as.numeric(as.character(pearsons_correlation$parameter[1])), # pcor_df
  "ols_intercept" = as.numeric(as.character(ols_regression$coefficients[1])), # ols_intercept
  "ols_gradient" = as.numeric(as.character(ols_regression$coefficients[2])), # ols_gradient
  "ols_adj_r2" = as.numeric(as.character(summary(ols_regression)$adj.r.squared[1])), # ols_adj_r2
  "ols_df" = as.numeric(as.character(summary(ols_regression)$df[2])), # ols_df
  "ols_fstat" = as.numeric(as.character(summary(ols_regression)$fstatistic[1]))) # ols_fstat,

# Mean Absolute Error ####

# MAE of All Validation Data
mae_all <- mean(data.validation$landsat_snow_cover_percentage) - mean(data.validation$terra_snow_cover_percentage)

# Regression of All Validation Data
summary(lm(data.validation$landsat_snow_cover_percentage ~ data.validation$terra_snow_cover_percentage))


# MAE of All Snowline Imagery Sun Elevations Range
sun_threshold_upper <- max(data.sun$sun_elevations)
sun_threshold_lower <- min(data.sun$sun_elevations)
mae_snowline_all <- mean(subset(data.validation, data.validation$sun_elevation > sun_threshold_lower & data.validation$sun_elevation < sun_threshold_upper)$landsat_snow_cover_percentage) - mean(subset(data.validation, data.validation$sun_elevation > sun_threshold_lower & data.validation$sun_elevation < sun_threshold_upper)$terra_snow_cover_percentage)

# Regression of All Snowline Imagery Sun Elevations Range
subset <- subset(data.validation, data.validation$sun_elevation > sun_threshold_lower & data.validation$sun_elevation < sun_threshold_upper)
summary(lm(subset$landsat_snow_cover_percentage ~ subset$terra_snow_cover_percentage))


# MAE of Majority Snowline Imagery Sun Elevations 
sun_threshold_upper <- mean(data.sun$sun_elevations) + sd(data.sun$sun_elevations)
sun_threshold_lower <- mean(data.sun$sun_elevations) - sd(data.sun$sun_elevations)
mae_snowline_majority <- mean(subset(data.validation, data.validation$sun_elevation > sun_threshold_lower & data.validation$sun_elevation < sun_threshold_upper)$landsat_snow_cover_percentage) - mean(subset(data.validation, data.validation$sun_elevation > sun_threshold_lower & data.validation$sun_elevation < sun_threshold_upper)$terra_snow_cover_percentage)

# Regression of Majority Snowline Imagery Sun Elevations
subset <- subset(data.validation, data.validation$sun_elevation > sun_threshold_lower & data.validation$sun_elevation < sun_threshold_upper)
summary(lm(subset$landsat_snow_cover_percentage ~ subset$terra_snow_cover_percentage))


# Save Outputs ####
saveRDS(object = stat.validation, file = "~/snowlines/outputs/validation/stat.validation.rds")
saveRDS(object = mae_all, file = "~/snowlines/outputs/validation/mae_all.rds")
saveRDS(object = mae_snowline_all, file = "~/snowlines/outputs/validation/mae_snowline_all.rds")
saveRDS(object = mae_snowline_majority, file = "~/snowlines/outputs/validation/mae_snowline_majority.rds")