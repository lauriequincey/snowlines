# Import ####
data.snowlines <- readRDS(file = "~/snowlines/data/data.snowlines.rds")
data.snowlines_rsla <- readRDS(file = "~/snowlines/data/data.snowlines_rsla.rds")
data.ahlmann <- data.frame("x" = c(20, 44, 84, 136, 142, 157, 177, 192),
                           "y" = c(1350, 1400, 1600, 1650, 1650, 1800, 2000, 2200))

# Reclassify ####
x <- data.snowlines$`2018`$distance
y <- data.snowlines$`2018`$altitude

mdl <- lm(y ~ x)
mdl_plus_err <- data.snowlines_rsla$plus_error[27]
mdl_minus_err <- data.snowlines_rsla$minus_error[27]

x2 <- data.ahlmann$x
y2 <- data.ahlmann$y

# Open SVG ####
svg(filename = paste0("~/snowlines/outputs/snowline space/plots/snowline space plot.svg"),
    width = aes.canvas$width,
    height = aes.canvas$height,
    pointsize = aes.canvas$point_size)

# Empty Plot ####
plot(x = x,
     y = y,
     xlab = "Distance (km)",
     ylab = "Altitude (m)",
     xlim = c(0, 250),
     ylim = c(0, 2500),
     yaxs = "i",
     xaxs = "i",
     type = "n",
     frame.plot = FALSE,
     axes = FALSE)

# Points ####
points(x = x,
       y = y,
       cex = aes.symbols$datapoint_size_small,
       pch = aes.symbols$datapoint_shape,
       col = densCols(x = x,
                      y = y,
                      nbin = 2000,
                      colramp = aes.colour$ramp_heat))

# Regression ####
clip(x1 = min(x), x2 = max(x),
     y1 = min(y), y2 = max(y))
abline(a = mdl$coefficients[1],
       b = mdl$coefficients[2],
       col = aes.colour$solid_black,
       lwd = aes.canvas$line_width)

# Regression Aspect Uncertainty ####
clip(x1 = min(x), x2 = max(x),
     y1 = min(y), y2 = max(y))
abline(a = mdl$coefficients[1] + mdl_plus_err,
       b = mdl$coefficients[2],
       col = aes.colour$solid_black,
       lwd = aes.canvas$line_width,
       lty = "dashed")
clip(x1 = min(x), x2 = max(x),
     y1 = min(y), y2 = max(y))
abline(a = mdl$coefficients[1] - mdl_minus_err,
       b = mdl$coefficients[2],
       col = aes.colour$solid_black,
       lwd = aes.canvas$line_width,
       lty = "dashed")

# Ahlmann Points ####
points(x = x2,
       y = y2,
       cex = 0.8,
       lwd = 2.5,
       pch = 4,
       col = aes.colour$solid_black)

# Axes ####
box(bty = "l", lwd = aes.canvas$line_width)

par(cex = 0.8)

axis(side = 2,
     at = c(0, 500, 1000, 1500, 2000, 2500),
     lwd = aes.canvas$line_width)

axis(side = 1,
     at = c(0, 50, 100, 150, 200, 250),
     lwd = aes.canvas$line_width)

# Close SVG ####
dev.off()

browseURL(url = "~/snowlines/outputs/snowline space/plots/snowline space plot.svg")