# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.climate <- readRDS("~/snowlines/data/data.climate.rds")

# Libraries ####
require("rasterpdf")

# Normality Function ####
function.normality = function(x_data, y_data, title) {
  
  # Set up Plot Window
  par(mfrow = c(2, 2))
  
  # Descriptive Statistics
  y_mean = mean(x = y_data)
  y_median = median(x = y_data)
  y_observations = length(x = y_data)
  x_min = min(x_data)
  x_max = max(x_data)
  
  # Histogram
  hist(x = y_data,
       freq = FALSE,
       breaks = 100,
       main = paste0('Histogram of ', title))
  abline(v = y_mean,
         col = "red",
         lwd = 2)
  abline(v = y_median,
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
  text(x = 0.5, y = 0.8, labels = y_mean)
  text(x = 0.5, y = 0.7, labels = "Median:")
  text(x = 0.5, y = 0.6, labels = y_median)
  text(x = 0.5, y = 0.5, labels = "Observations:")
  text(x = 0.5, y = 0.4, labels = y_observations)
  text(x = 0.5, y = 0.3, labels = "Min Distance:")
  text(x = 0.5, y = 0.2, labels = x_min)
  text(x = 0.5, y = 0.1, labels = "Max Distance:")
  text(x = 0.5, y = 0.0, labels = x_max)
  
  ## Quick Plot
  #par(mfrow = c(1, 1))
  #
  #plot(x = x_data,
  #     y = y_data,
  #     xlim = c(0, 300),
  #     ylim = c(0, 2500),
  #     main = paste0("Quick Plot of ", title))
  
}

# Run Normality Function ####
# For Loop through data.climate, testing for normality on only the mean data, not the SEMs
for(i in names(data.climate)) {
  
  # Get data for year
  data <- data.climate[[i]]
  
  # Get only the mean data
  data <- data[, c(grepl("mean", colnames(data)) | grepl("distance", colnames(data)))]
  
  # Open PDF
  raster_pdf(paste0("~/snowlines/outputs/climate space/normality/", 'climate normality ', i, ".pdf"))
  
  # For every column in the dataframe
  for(j in 1:ncol(data)) {
    
    # Get Data
    y_data <- as.numeric(data[, j])
    x_data <- as.numeric(data$distance)
    title <- paste0(i, " ", names(data)[j])
    
    # Run Normality Function
    function.normality(x_data, y_data, title)
    
    print(j)
    
  }
  
  ## Close PDF
  dev.off()
  
  print(i)
}
