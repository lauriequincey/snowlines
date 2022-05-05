# Import ####
data.snowlines_climate <- readRDS("~/snowlines/data/data.snowlines_climate.rds")
data.snowlines_rsla <- readRDS("~/snowlines/data/data.snowlines_rsla.rds")

# Reclassify ####
# Winter
x1 <- data.snowlines_climate$`2017`$winter_temperature_2m_mean
y1 <- data.snowlines_climate$`2017`$altitude
#err1x <- data.snowlines_climate$`2017`$winter_temperature_2m_stdDev
err1yplus <- data.snowlines_rsla$plus_error[26]
err1yminus <- data.snowlines_rsla$minus_error[26]
x1quad <- x1^2
x1cub <- x1^3
x1four <- x1^4
x1five <- x1^5
mdl1 <- lm(y1 ~ x1)
print(anova(mdl1))
plot(y1, summary(mdl1)$residuals)

# Summer
x2 <- data.snowlines_climate$`2017`$summer_temperature_2m_mean
y2 <- data.snowlines_climate$`2017`$altitude
#err2x <- data.snowlines_climate$`2017`$summer_temperature_2m_stdDev
err2yplus <- data.snowlines_rsla$plus_error[26]
err2yminus <- data.snowlines_rsla$minus_error[26]
x2quad <- x2^2
x2cub <- x2^3
x2four <- x2^4
x2five <- x2^5
mdl2 <- lm(y2 ~ x2)
print(anova(mdl2))
plot(y2, summary(mdl2)$residuals)

# Autumn
x3 <- data.snowlines_climate$`2017`$autumn_temperature_2m_mean
y3 <- data.snowlines_climate$`2017`$altitude
#err3x <- data.snowlines_climate$`2017`$autumn_temperature_2m_stdDev
err3yplus <- data.snowlines_rsla$plus_error[26]
err3yminus <- data.snowlines_rsla$minus_error[26]
x3quad <- x3^2
x3cub <- x3^3
x3four <- x3^4
x3five <- x3^5
mdl3 <- lm(y3 ~ x3)
print(anova(mdl3))
plot(y3, summary(mdl3)$residuals)

# Spring
x4 <- data.snowlines_climate$`2017`$spring_temperature_2m_mean
y4 <- data.snowlines_climate$`2017`$altitude
#err1x <- data.snowlines_climate$`2017`$winter_temperature_2m_stdDev
err4yplus <- data.snowlines_rsla$plus_error[26]
err4yminus <- data.snowlines_rsla$minus_error[26]
x4quad <- x4^2
x4cub <- x4^3
x4four <- x4^4
x4five <- x4^5
mdl4 <- lm(y4 ~ x4)
print(anova(mdl4))
plot(y4, summary(mdl4)$residuals)

# Open SVG ####
svg(filename = paste0("~/snowlines/outputs/snowline climate/plots/snowline climate plot temperature.svg"),
    width = aes.canvas$width,
    height = aes.canvas$height,
    pointsize = aes.canvas$point_size)

# Open PNG ####
#png(filename = paste0("~/snowlines/outputs/climate space/plots/climate space plot temperature.png"),
#    width = aes.canvas$width*100,
#    height = aes.canvas$height*100,
#    pointsize = aes.canvas$point_size)

# Empty Plot ####
plot(x = x1,
     y = y1,
     xlab = "Temperature (K)",
     ylab = "Altitude (m asl)",
     xlim = c(264.5, 284.5),
     ylim = c(0, 2500),
     yaxs = "i",
     xaxs = "i",
     type = "n",
     frame.plot = FALSE,
     axes = FALSE)

# 0 degree Celcius point
abline(v = 273.15, col =  aes.colour$solid_grey, lwd = 3, lty = "dashed")

# Plot Points and Regression Line and Prediction Uncertainty ####
function.plot_seasons <- function(data_x, data_y, errplus, errminus, mdl, point_shape, colour_adjustment) {
  clip(x1 = -99999999990, x2 = 9999999999999,
       y1 = -99999999990, y2 = 9999999999999)
  
  # Points ####
  arrows(x0 = data_x,
         x1 = data_x,
         y0 = data_y + errplus,
         y1 = data_y - errminus,
         length = 0.05,
         angle = 90,
         code = 3,
         col = function.col_adjust(aes.colour$solid_salmon, colour_adjustment),
         lty = "solid",
         lwd = aes.canvas$line_width)
  
  points(x = data_x,
         y = data_y,
         cex = 0.4,
         pch = point_shape,
         col = function.col_adjust(aes.colour$solid_salmon, colour_adjustment))
  
  # Regression ####
  clip(x1 = min(data_x), x2 = max(data_x),
       y1 = -999999, y2 = 99999)
  prediction <- predict(mdl, interval = "confidence", level = 0.95)
  ix <- sort(data_x, index.return=T)$ix
  lines(data_x[ix], prediction[ix , 1], col = function.col_adjust(aes.colour$solid_salmon, colour_adjustment), lwd = 2)
  polygon(c(rev(data_x[ix]), data_x[ix]), c(rev(prediction[ix, 3]), prediction[ix, 2]), col = function.col_adjust(aes.colour$transluscent_salmon2, colour_adjustment), border = NA)
  
}
function.col_adjust <- function(colour, brightness) {return(adjustcolor(col = colour, red.f = brightness, green.f = brightness, blue.f = brightness))}

function.plot_seasons(x1, y1, err1yplus, err1yminus, mdl1, aes.symbols$datapoint_shape, 0.4)
function.plot_seasons(x2, y2, err2yplus, err2yminus, mdl2, aes.symbols$datapoint_shape, 1.3)
function.plot_seasons(x3, y3, err3yplus, err3yminus, mdl3, aes.symbols$datapoint_shape, 1.0)
function.plot_seasons(x4, y4, err4yplus, err4yminus, mdl4, aes.symbols$datapoint_shape, 0.7)

# Axes ####
box(bty = "l", lwd = aes.canvas$line_width)

par(cex = 0.8)

axis(side = 2, at = seq(0, 2500, by = 100), lwd = aes.canvas$line_width)
axis(side = 2, at = seq(0, 2500, by = 50), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

axis(side = 1, at = seq(264, 290, 1), lwd = aes.canvas$line_width)
axis(side = 1, at = seq(264, 290, 0.5), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

# Close SVG ####
dev.off()

browseURL(url = "~/snowlines/outputs/snowline climate/plots/snowline climate plot temperature.svg")