# Import ####
data.validation <- readRDS(file = "~/snowlines/data/data.validation.rds")
data.sun <- readRDS(file = "~/snowlines/data/data.sun.rds")

# Reclassify ####
x <- data.sun$sun_elevations
y <- data.validation$terra_snow_cover_percentage / data.validation$landsat_snow_cover_percentage

# Open SVG ####
svg(filename = paste0("~/snowlines/outputs/validation/ae plot.svg"),
    width = aes.canvas$width,
    height = aes.canvas$height,
    pointsize = aes.canvas$point_size)

# Plot ####
plot(x = x,
     y = y,
     xlab = "Sun Elevation (Degrees)",
     ylab = "Absolute Error (%)",
     xlim = c(0, 80),
     ylim = c(0, 80),
     col = aes.colour$solid_black,
     yaxs = "i",
     xaxs = "i",
     type = "n",
     lwd = aes.canvas$line_width,
     frame.plot = FALSE,
     axes = TRUE)

# Regression ####
regression <- lm(y ~ x)
prediction <- predict(regression, interval = "confidence", level =  0.95)
ix <- sort(x, index.return=T)$ix
polygon(c(rev(x[ix]), x[ix]), c(rev(prediction[ix, 3]), prediction[ix, 2]), col = aes.colour$solid_grey, border = NA)
lines(x[ix], prediction[ix , 1], col = aes.colour$solid_black, lwd = 2)

# 1:1 Line ####
abline(a = 1,
       b = 1,
       lty = "dashed",
       lwd = aes.canvas$line_width,
       col = aes.colour$solid_black)

# Points ####
points(x = x,
       y = y,
       pch = aes.symbols$datapoint_size_big,
       col = aes.colour$solid_black)

# Axes ####
par(cex = 0.8)
axis(side = 1, at = seq(0, 80, by = 5), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)
axis(side = 2, at = seq(0, 80, by = 5), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

dev.off()

browseURL("~/snowlines/outputs/validation/ae plot.svg")
