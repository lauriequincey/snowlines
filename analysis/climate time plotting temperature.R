# Import ####
data.climate_time <- readRDS(file = "~/snowlines/data/data.climate_time.rds")

# Reclassify ####
# Winter
x1 <- data.climate_time$year
y1 <- data.climate_time$winter_temperature_2m_mean
err1 <- data.climate_time$winter_temperature_2m_stdDev
mdl1 <- lm(y1 ~ x1)

# Summer
x2 <- data.climate_time$year
y2 <- data.climate_time$summer_temperature_2m_mean
err2 <- data.climate_time$summer_temperature_2m_stdDev
mdl2 <- lm(y2 ~ x2)

# Autumn
x3 <- data.climate_time$year
y3 <- data.climate_time$autumn_temperature_2m_mean
err3 <- data.climate_time$autumn_temperature_2m_stdDev
mdl3 <- lm(y3 ~ x3)

# Spring
x4 <- data.climate_time$year
y4 <- data.climate_time$spring_temperature_2m_mean
err4 <- data.climate_time$spring_temperature_2m_stdDev
mdl4 <- lm(y4 ~ x4)

# Open SVG ####
#svg(filename = paste0("~/snowlines/outputs/climate space/plots/climate space plot snowfall.svg"),
#    width = aes.canvas$width,
#    height = aes.canvas$height,
#    pointsize = aes.canvas$point_size)

# Open PNG ####
png(filename = paste0("~/snowlines/outputs/climate time/plots/climate time plot temperature.png"),
    width = aes.canvas$width*100,
    height = aes.canvas$height*100,
    pointsize = aes.canvas$point_size)

# Empty Plot ####
plot(x = x1,
     y = y1,
     xlab = "Time (Years)",
     ylab = "Temperature (K)",
     xlim = c(1980, 2022),
     ylim = c(260, 290),
     yaxs = "i",
     xaxs = "i",
     type = "n",
     frame.plot = FALSE,
     axes = FALSE)

# Plot Points and Regression Line and Prediction Uncertainty ####
function.plot_seasons <- function(data_x, data_y, err, mdl, point_shape, colour_adjustment) {
  
  # Points ####
  arrows(x0 = data_x,
         x1 = data_x,
         y0 = data_y + err,
         y1 = data_y - err,
         length = 0.01,
         angle = 90,
         code = 3,
         col = function.col_adjust(aes.colour$solid_salmon, colour_adjustment),
         lty = "solid",
         lwd = aes.canvas$line_width)
  
  points(x = data_x,
         y = data_y,
         cex = aes.symbols$datapoint_size_mid,
         pch = point_shape,
         col = function.col_adjust(aes.colour$solid_salmon, colour_adjustment))
  
  # Regression ####
  clip(x1 = min(data_x), x2 = max(data_x),
       y1 = 0, y2 = 99999)
  prediction <- predict(mdl, interval = "confidence", level = 0.95)
  ix <- sort(data_x, index.return=T)$ix
  lines(data_x[ix], prediction[ix , 1], col = function.col_adjust(aes.colour$solid_salmon, colour_adjustment), lwd = 2)
  polygon(c(rev(data_x[ix]), data_x[ix]), c(rev(prediction[ix, 3]), prediction[ix, 2]), col = function.col_adjust(aes.colour$transluscent_salmon2, colour_adjustment), border = NA)
  
}
function.col_adjust <- function(colour, brightness) {return(adjustcolor(col = colour, red.f = brightness, green.f = brightness, blue.f = brightness))}

function.plot_seasons(x1, y1, err1, mdl1, aes.symbols$datapoint_shape_winter, 0.6)
function.plot_seasons(x2, y2, err2, mdl2, aes.symbols$datapoint_shape_summer, 1.2)
function.plot_seasons(x3, y3, err3, mdl3, aes.symbols$datapoint_shape_autumn, 1.0)
function.plot_seasons(x4, y4, err4, mdl4, aes.symbols$datapoint_shape_spring, 0.8)

# Axes ####
box(bty = "l", lwd = aes.canvas$line_width)

par(cex = 0.8)

axis(side = 2, at = seq(260, 290, by = 10), lwd = aes.canvas$line_width)
axis(side = 2, at = seq(260, 290, by = 1), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

axis(side = 1, at = seq(1980, 2022, 3), lwd = aes.canvas$line_width)
axis(side = 1, at = seq(1980, 2022, 1), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

# Close SVG ####
dev.off()

browseURL(url = "~/snowlines/outputs/climate time/plots/climate time plot temperature.png")
