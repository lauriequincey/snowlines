# Import ####
data.climate <- readRDS(file = "~/snowlines/data/data.climate.rds")

# Reclassify ####
# Winter
x1 <- data.climate$`1990`$distance
y1 <- data.climate$`1990`$winter_surface_solar_radiation_downwards_mean/1000000 
err1 <- data.climate$`1990`$winter_surface_solar_radiation_downwards_stdDev/1000000 
mdl1 <- lm(y1 ~ poly(x1, 3))

# Summer
x2 <- data.climate$`1990`$distance
y2 <- data.climate$`1990`$summer_surface_solar_radiation_downwards_mean/1000000 
err2 <- data.climate$`1990`$summer_surface_solar_radiation_downwards_stdDev/1000000 
mdl2 <- lm(y2 ~ poly(x2, 3))

# Autumn
x3 <- data.climate$`1990`$distance
y3 <- data.climate$`1990`$autumn_surface_solar_radiation_downwards_mean/1000000 
err3 <- data.climate$`1990`$autumn_surface_solar_radiation_downwards_stdDev/1000000 
mdl3 <- lm(y3 ~ poly(x3, 3))

# Spring
x4 <- data.climate$`1990`$distance
y4 <- data.climate$`1990`$spring_surface_solar_radiation_downwards_mean/1000000 
err4 <- data.climate$`1990`$spring_surface_solar_radiation_downwards_stdDev/1000000 
mdl4 <- lm(y4 ~ poly(x4, 3))

# Open SVG ####
svg(filename = paste0("~/snowlines/outputs/climate space/plots/climate space plot radiation.svg"),
    width = aes.canvas$width,
    height = aes.canvas$height,
    pointsize = aes.canvas$point_size)

# Open PNG ####
#png(filename = paste0("~/snowlines/outputs/climate space/plots/climate space plot radiation.png"),
#    width = aes.canvas$width*100,
#    height = aes.canvas$height*100,
#    pointsize = aes.canvas$point_size)

# Empty Plot ####
plot(x = x1,
     y = y2,
     xlab = "Distance (km)",
     ylab = expression(text = paste("Solar Downwelling Radiation (MJm"^"-2"*")")),
     xlim = c(0, 250),
     ylim = c(0, 10000000/1000000),
     yaxs = "i",
     xaxs = "i",
     type = "n",
     frame.plot = FALSE,
     axes = FALSE)

# Plot Points and Regression Line and Prediction Uncertainty ####
function.plot_seasons <- function(data_x, data_y, err, mdl, point_shape, colour_adjustment) {
  clip(x1 = -99999999990, x2 = 9999999999999,
       y1 = -99999999990, y2 = 9999999999999)
  
  # Points ####
  arrows(x0 = data_x,
         x1 = data_x,
         y0 = data_y + err,
         y1 = data_y - err,
         length = 0.05,
         angle = 90,
         code = 3,
         col = function.col_adjust(aes.colour$solid_yellow, colour_adjustment),
         lty = "solid",
         lwd = aes.canvas$line_width)
  
  points(x = data_x,
         y = data_y,
         cex = aes.symbols$datapoint_size_mid,
         pch = point_shape,
         col = function.col_adjust(aes.colour$solid_yellow, colour_adjustment))
  
  # Regression ####
  clip(x1 = min(data_x), x2 = max(data_x),
       y1 = -99999999990, y2 = 9999999999999)
  prediction <- predict(mdl, interval = "confidence", level = 0.95)
  ix <- sort(data_x, index.return=T)$ix
  lines(data_x[ix], prediction[ix , 1], col = function.col_adjust(aes.colour$solid_yellow, colour_adjustment), lwd = 2)
  polygon(c(rev(data_x[ix]), data_x[ix]), c(rev(prediction[ix, 3]), prediction[ix, 2]), col = function.col_adjust(aes.colour$transluscent_yellow2, colour_adjustment), border = NA)
  
}
function.col_adjust <- function(colour, brightness) {return(adjustcolor(col = colour, red.f = brightness, green.f = brightness, blue.f = brightness))}

function.plot_seasons(x1, y1, err1, mdl1, aes.symbols$datapoint_shape, 0.4)
function.plot_seasons(x2, y2, err2, mdl2, aes.symbols$datapoint_shape, 1.0)
function.plot_seasons(x3, y3, err3, mdl3, aes.symbols$datapoint_shape, 0.8)
function.plot_seasons(x4, y4, err4, mdl4, aes.symbols$datapoint_shape, 0.6)

# Axes ####
box(bty = "l", lwd = aes.canvas$line_width)

par(cex = 0.8)

axis(side = 2, at = seq(0, 10000000/1000000, by = 1000000/1000000), lwd = aes.canvas$line_width)
axis(side = 2, at = seq(0, 10000000/1000000 , by = 500000/1000000), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

axis(side = 1, at = c(0, 50, 100, 150, 200, 250), lwd = aes.canvas$line_width)
axis(side = 1, at = seq(0, 250, by = 10), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

# Close SVG ####
dev.off()

browseURL(url = "~/snowlines/outputs/climate space/plots/climate space plot radiation.svg")
