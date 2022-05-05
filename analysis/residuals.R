# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import All Data ####
data.snowlines <- readRDS(file = "~/snowlines/data/data.snowlines.rds")
data.snowlines_rsla <- readRDS(file = "~/snowlines/data/data.snowlines_rsla.rds")
data.snowlines_gradients <- readRDS(file = "~/snowlines/data/data.snowlines_gradients.rds")
data.climate <- readRDS(file = "~/snowlines/data/data.climate.rds")
data.climate_time <- readRDS(file = "~/snowlines/data/data.climate_time.rds")

# Reclassify ####
x <- data.climate_time$year
y <- data.climate_time$summer_temperature_2m_mean

# Model ####
model <- lm(y ~ x)

# Residuals ####
# Get Residuals
residuals <- summary(model)$residuals

# Check means
mean(residuals)

# Histogram
hist(residuals)

# Plot Residuals
plot(y, residuals, pch = 16)

# QQ=Plot
qqnorm(y = residuals, pch = 16)
qqline(y = residuals)

plot(x, y)
abline(model)

summary(model)
