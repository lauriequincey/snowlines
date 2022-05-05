# Import ####
data.snowlines_gradients <- readRDS(file = "~/snowlines/data/data.snowlines_gradients.rds")

# Reclassify ####
x <- data.snowlines_gradients$aqcuisition_time_median
y <- data.snowlines_gradients$gradient

err_upper <- data.snowlines_gradients$gradient_error_upper
err_lower <- data.snowlines_gradients$gradient_error_lower

mdl <- lm(y ~ x)

# Open SVG ####
svg(filename = paste0("~/snowlines/outputs/snowline gradient/snowline gradients.svg"),
    width = aes.canvas$width,
    height = aes.canvas$height,
    pointsize = aes.canvas$point_size)

# Plot ####
plot(x = x,
     y = y,
     xlab = "Year",
     ylab = expression(text = paste("Gradient (m km"^"-1"*")")),
     xlim = c(473299200, 1640044800),
     ylim = c(2.8, 7),
     yaxs = "i",
     xaxs = "i",
     type = "n",
     frame.plot = FALSE,
     axes = FALSE)

# Regression Polygon ####
sorted_x <- c(sort(x[order(x)]))
confidence_interval <- predict(mdl, newdata = data.frame(x = sorted_x),
                               interval = "confidence",
                               level = 0.99)
confidence_interval_upper <- data.frame(data = confidence_interval[,2])
confidence_interval_lower <- data.frame(data = confidence_interval[,3])
confidence_x <- c(sorted_x, rev(sorted_x))
confidence_y <- c(confidence_interval_upper$data, rev(confidence_interval_lower$data))
polygon(confidence_x, confidence_y, col = aes.colour$solid_grey, border = NA)

# Points ####
points(x = x,
       y = y,
       cex = aes.symbols$datapoint_size_big2,
       pch = 20,
       col = aes.colour$solid_salmon)

# Error Bars ####
arrows(x0 = x,
       y0 = err_upper,
       x1 = x,
       y1 = err_lower,
       length = 0.01,
       angle = 90,
       code = 3,
       col = aes.colour$solid_black,
       lty = "solid",
       lwd = aes.canvas$line_width)

# Regression Lines ####
clip(x1 = min(x),
     x2 = max(x),
     y1 = min(y),
     y2 = max(y))
abline(mdl, col = aes.colour$solid_black, lwd = aes.canvas$line_width)

# Axis ####
box(bty = "l", lwd = aes.canvas$line_width)

par(cex = aes.canvas$text_sub)

axis(side = 2, at = seq(3, 7, by = 1), lwd = aes.canvas$line_width)
axis(side = 2, at = seq(3, 7, by = 0.5), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

axis(side = 1, at = seq(378691200, 1640995200, by = 31536000 * 3), labels = seq(1982, 2021, by = 3), lwd = aes.canvas$line_width)
axis(side = 1, at = seq(347155200, 1640995200, by = 31536000), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

# Close SVG ####
dev.off()

browseURL(url = "~/snowlines/outputs/snowline gradient/snowline gradients.svg")