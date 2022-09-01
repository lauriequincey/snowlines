# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.validation <- readRDS(file = "~/snowlines/data/data.validation.rds")
data.sun <- data.frame("sun" = unlist(lapply(X = readRDS(file = "~/snowlines/data/data.snowlines.rds"), FUN = function(x) {unique(as.numeric(as.character(substr(x$sun_elevation, 1, 200))))})))

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
x_data <- data.validation$terraSnowCoverPercentage
y_data <- data.validation$landsatSnowCoverPercentage
title <- "Validation Normality"

# Run Normality Function
function.normality(x_data, y_data, title)
dev.off()

# Correlation Regression ####

# Pearson's Correlation
pearsons_correlation <- cor.test(x = data.validation$terraSnowCoverPercentage, y = data.validation$landsatSnowCoverPercentage)

# Regression
ols_regression <- lm(formula = landsatSnowCoverPercentage ~ terraSnowCoverPercentage, data = data.validation)

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
getMae <- function(data, by, thresholdLow, thresholdHigh, col1, col2) {
  sub = subset(data, by > thresholdLow & by < thresholdHigh)
  print(nrow(sub))
  #print(summary(lm( sub[, col2] / (sub[, col2] - sub[, col1]) )))
  mae = mean(sub[, col2] - sub[, col1])
}
maeAll = mean(data.validation$landsatSnowCoverPercentage - data.validation$terraSnowCoverPercentage)
maeImgAll = getMae(data.validation, data.validation$sunElevation, min(data.sun), max(data.sun), "landsatSnowCoverPercentage", "terraSnowCoverPercentage")
maeImgSd = getMae(data.validation, data.validation$sunElevation, mean(data.sun$sun) - sd(data.sun$sun), mean(data.sun$sun) + sd(data.sun$sun), "landsatSnowCoverPercentage", "terraSnowCoverPercentage")

# Save Outputs ####
saveRDS(object = stat.validation, file = "~/snowlines/outputs/validation/stat.validation.rds")
saveRDS(object = mae_all, file = "~/snowlines/outputs/validation/mae_all.rds")
saveRDS(object = mae_snowline_all, file = "~/snowlines/outputs/validation/mae_snowline_all.rds")
saveRDS(object = mae_snowline_majority, file = "~/snowlines/outputs/validation/mae_snowline_majority.rds")