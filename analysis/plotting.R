# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.end_of_ablation_season_dates <- readRDS(file = "~/snowlines/data/data.end_of_ablation_season_dates.rds")
data.image_stats_matrix <- readRDS(file = "~/snowlines/data/data.image_stats_matrix.rds")

data.snowlines <- readRDS(file = "~/snowlines/data/data.snowlines.rds")
data.snowlines_gradients <- readRDS(file = "~/snowlines/data/data.snowlines_gradients.rds")
data.snowlines_rsla <- readRDS(file = "~/snowlines/data/data.snowlines_rsla.rds")

data.climate <- readRDS(file = "~/snowlines/data/data.climate.rds")
data.climate_time <- readRDS("~/snowlines/data/data.climate_time.rds")

data.sun <- readRDS(file = "~/snowlines/data/data.sun.rds")
data.validation <- readRDS(file = "~/snowlines/data/data.validation.rds")

# Aesthetics ####

# Colours ---
# Base Colour Palette
black_s <- rgb(red = 0, green = 0, blue = 0, alpha = 255, maxColorValue = 255)
grey_s <- rgb(red = 0, green = 0, blue = 0, alpha = 100, maxColorValue = 255)
white_S

yellow_s <-    rgb(red = 250, green = 216, blue = 94, alpha = 255, maxColorValue = 255)
tangerine_s <- rgb(red = 217, green = 143, blue = 76, alpha = 255, maxColorValue = 255)
salmon_s <-    rgb(red = 240, green = 108, blue = 97, alpha = 255, maxColorValue = 255)
purple_s <-    rgb(red = 212, green = 76, blue = 217, alpha = 255, maxColorValue = 255)
blue_s <-      rgb(red = 125, green = 88, blue = 252, alpha = 255, maxColorValue = 255)

# High Transparency Palette
black_th <- rgb(red = 0, green = 0, blue = 0, alpha = 30, maxColorValue = 255)
yellow_th <-    rgb(red = 250, green = 216, blue = 94, alpha = 10, maxColorValue = 255)
tangerine_th <- rgb(red = 217, green = 143, blue = 76, alpha = 10, maxColorValue = 255)
salmon_th <-    rgb(red = 240, green = 108, blue = 97, alpha = 10, maxColorValue = 255)
purple_th <-    rgb(red = 212, green = 76, blue = 217, alpha = 10, maxColorValue = 255)
blue_th <-      rgb(red = 125, green = 88, blue = 252, alpha = 10, maxColorValue = 255)

# Low Transparency Palette
yellow_tl <-    rgb(red = 250, green = 216, blue = 94, alpha = 150, maxColorValue = 255)
tangerine_tl <- rgb(red = 217, green = 143, blue = 76, alpha = 150, maxColorValue = 255)
salmon_tl <-    rgb(red = 240, green = 108, blue = 97, alpha = 150, maxColorValue = 255)
purple_yl <-    rgb(red = 212, green = 76, blue = 217, alpha = 150, maxColorValue = 255)
blue_tl <-      rgb(red = 125, green = 88, blue = 252, alpha = 150, maxColorValue = 255)

# Colour Ramps
ramp_yelblu <- colorRampPalette(colors = c(yellow_th,
                                           tangerine_th,
                                           salmon_th,
                                           purple_th,
                                           blue_th),
                                bias = 2,
                                interpolate = c("linear"),
                                alpha = TRUE)

# Lines and Symbols ---
line_width <- 2

# Canvas ---
canvas_width <- 16
canvas_height <- 10
canvas_point_size <- 20
axis_magnification <- 0.8

# Axes ---
years_axis <- c(1982, 1985, 1988, 1991, 1994, 1997, 2000, 2003, 2006, 2009, 2012, 2015, 2018, 2021)


# Snowlines Image Count ####
svg(filename = "~/snowlines/outputs/snowline image stats/image count.svg",
    width = canvas_width,
    height = canvas_height,
    pointsize = canvas_point_size)

par(cex = axis_magnification)
barplot(height = data.image_stats_matrix,
        width = 1,
        space = 0.2,
        border = NA,
        lwd = line_width,
        yaxs = "i",
        xaxs = "r")

axis(side = 1, at = seq(-2.4, 48, 3.6) - 0.5, tick = TRUE, labels = FALSE, line = -0.28, lwd = line_width)
mtext(text = "Date", side = 1, line = 2.8)
mtext(text = "no. of Unique Quality Images", side = 2, line = 2.8)
dev.off()

# End of Ablation Season ####
# Add new column as day of year
transform <- function(df, x) {
  df[[paste0(x, "_day_of_year")]] <- c(as.numeric(strftime(as.Date(df[[x]], origin = "1970-01-01"), format = "%j")))
  df
}
data.end_of_ablation_season_dates <- transform(data.end_of_ablation_season_dates, "Date")

# Plot
svg(filename = paste0("~/snowlines/outputs/end of ablation season/end of ablation season.svg"),
    width = 16,
    height = 10,
    pointsize = 20)

plot(x = data.end_of_ablation_season_dates$year,
     y = data.end_of_ablation_season_dates$Date_day_of_year,
     ylim = c(150, 250),
     xlim = c(1980, 2022),
     xlab = "Year",
     ylab = "Month-Day",
     yaxs = "i",
     xaxs = "i",
     axes = FALSE,
     type = "n")

polygon(x = c(1978, 2025, 2025, 1978),
        y = c(183, 183, 213, 213),
        col = black_th,
        border = NA)

points(x = data.end_of_ablation_season_dates$year,
       y = data.end_of_ablation_season_dates$Date_day_of_year,
       pch = 20)

# Axes Bars
box(bty = "l",
    lwd = line_width)

# Axes Ticks
par(cex = axis_magnification)
days_of_year <- as.Date(data.end_of_ablation_season_dates$Date_day_of_year, origin = "1970-01-01")
axis(side = 2,
     at = c(153, 183, 214, 245), #sequence <- seq(min(days_of_year), max(days_of_year), 20),
     labels = c("06-01", "07-01", "08-01", "09-01"), #strftime(as.Date(sequence, origin = "1970-01-01"), format = "%m-%d"),
     lwd = line_width)
axis(side = 1,
     at = years_axis,
     labels = years_axis,
     lwd = line_width)
dev.off()

# Snowlines Space ####
# Open SVG
for(i in names(data.snowlines[27])) {
  
  svg(filename = paste0("~/snowlines/outputs/snowline space/plots/snowline space ", i,".svg"),
      width = canvas_width,
      height = canvas_height,
      pointsize = canvas_point_size
  )
  
  # Recreate Data
  df <- data.frame("x" = data.snowlines[[i]]$distance,
                   "y" = data.snowlines[[i]]$altitude)
  lm <- lm(df$y ~ df$x)
  lm_err <- data.frame("plus" = as.numeric(data.snowlines_rsla$plus_error[27]),
                       "minus" = as.numeric(data.snowlines_rsla$minus_error[27]))
  
  # Blank Plot
  plot(x = df$x,
       y = df$y,
       xlab = "Distance (km)",
       ylab = "Altitude (m)",
       xlim = c(0, 250),
       ylim = c(0, 2500),
       yaxs = "i",
       xaxs = "i",
       type = "n",
       frame.plot = FALSE,
       axes = FALSE)
  
  # Points
  points(x = df$x,
         y = df$y,
         cex = 0.2,
         pch = 16,#".",
         col = densCols(x = df$x,
                        y = df$y,
                        nbin = 2000,
                        colramp = ramp_yelblu))
  
  # Regression
  clip(x1 = min(df$x), x2 = max(df$x),
       y1 = min(df$y), y2 = max(df$y))
  abline(a = lm$coefficients[1],
         b = lm$coefficients[2],
         col = black_s,
         lwd = line_width)
  
  # Regression Uncertainty
  clip(x1 = min(df$x), x2 = max(df$x),
       y1 = min(df$y), y2 = max(df$y))
  abline(a = lm$coefficients[1] + lm_err$plus,
         b = lm$coefficients[2],
         col = black_s,
         lwd = line_width,
         lty = "dashed")
  clip(x1 = min(df$x), x2 = max(df$x),
       y1 = min(df$y), y2 = max(df$y))
  abline(a = lm$coefficients[1] - lm_err$minus,
         b = lm$coefficients[2],
         col = black_s,
         lwd = line_width,
         lty = "dashed")
  
  # Ahlmann Data
  data.ahlmann <- data.frame("x" = c(20, 44, 84, 136, 142, 157, 177, 192),
                             "y" = c(1350, 1400, 1600, 1650, 1650, 1800, 2000, 2200))
  
  # Ahlmann Points
  points(x = data.ahlmann$x,
         y = data.ahlmann$y,
         cex = 0.8,
         lwd = 2.5,
         pch = 4,
         col = black_s)
  
  #  Ahlmann Regression
  #abline(lm(data.ahlmann$y ~ data.ahlmann$x),
  #       lty = "dotted",
  #       lwd = line_width)
  
  # Plot Left and Bottom Axes Bars
  box(bty = "l",
      lwd = line_width)
  
  # Axes
  par(cex = 0.8)
  axis(side = 2,
       at = c(0, 500, 1000, 1500, 2000, 2500),
       lwd = line_width)
  axis(side = 1,
       at = c(0, 50, 100, 150, 200, 250),
       lwd = line_width)
  
  # Close SVG
  dev.off()
}


# Snowlines rsla ####

svg(filename = paste0("~/snowlines/outputs/plots/rsla/rsla plots.svg"),
    width = 16,
    height = 10,
    pointsize = 20
)

# Recreate Data
df <- data.frame("x" = as.Date.numeric(as.POSIXct(x = data.snowlines_rsla$aqcuisition_time_median, origin = "1970-01-01")),
                 "y" = data.snowlines_rsla$rsla,
                 "err_plus" = data.snowlines_rsla$plus_error,
                 "err_minus" = data.snowlines_rsla$minus_error)

# Plot
plot(x = df$x,
     y = df$y,
     xlab = "Time",
     ylab = "Altitude (m)",
     xlim = c(as.Date.numeric(x = min(df$x) - 200, origin = "1970-01-01"),
              as.Date.numeric(x = max(df$x) + 200, origin = "1970-01-01")),
     ylim = c(1250, 1750),
     yaxs = "i",
     xaxs = "i",
     type = "n",
     frame.plot = FALSE,
     axes = FALSE)

# Regression
regression <- lm(df$y ~ df$x)
newx <- c(sort(df$x[order(df$x)])) # create a new list of x axis data points that are ordered by size
conf_interval <- predict(regression, newdata = data.frame(x = newx),
                         interval = "confidence",
                         level = 0.99) # find confidence intervals for regression and put into dataframe
conf_interval2 <- data.frame(data = conf_interval[,2]) # split confidence interval dataframe into lower interval
conf_interval3 <- data.frame(data = conf_interval[,3]) # split confidence interval dataframe into upper interval
xconf <- c(newx, rev(newx)) # list of confidence data points going up in order and then down in order for the x axis of the polygon which will be drawn for to show the confidence intervals of the regression line more clearly
yconf <- c(conf_interval2$data, rev(conf_interval3$data)) # list of confidence data points going up in order and then down in order for the y axis of the polygon which will be drawn for to show the confidence intervals of the regression line more clearly
polygon(xconf, yconf, col = black_th, border = NA) # draw polygon (its positioned here before the actual interval lines, regression lines and plot lines to make sure its in the background)

# Points
points(x = df$x,
       y = df$y,
       cex = 1.5,
       pch = 20,
       col = salmon_s)

# Error Bars
arrows(x0 = df$x,
       y0 = df$y + df$err_plus,
       x1 = df$x,
       y1 = df$y - df$err_minus,
       length = 0.01,
       angle = 90,
       code = 3,
       col = salmon_s,
       lty = "solid",
       lwd = line_width)

# Regression
clip(x1 = min(df$x),
     x2 = max(df$x),
     y1 = min(df$y),
     y2 = max(df$y))
abline(regression,
       col = grey_s,
       lwd = line_width)

# Axes Bars
box(bty = "l",
    lwd = line_width)

# Axes Ticks
par(cex = 0.8)
axis(side = 2,
     at = seq(1250, 1750, by = 100),
     lwd = line_width)
axis(side = 1,
     at = as.Date(years_axis),
     labels = years_axis,
     lwd = line_width)
     
     
     
    # at = customdate <- as.Date(c("1980-01-01",
    #                              "1985-01-01",
    #                              "1990-01-01",
    #                              "1995-01-01",
    #                              "2000-01-01",
    #                              "2005-01-01",
    #                              "2010-01-01",
    #                              "2015-01-01",
    #                              "2020-01-01",
    #                              "2025-01-01"),
    #                            origin = "1970-01-01"),
    # labels = format(customdate, "%Y"),
    # lwd = line_width)

# Close PNG
dev.off()

# climate test ####
df <- data.frame("x" = climate$year,
                 "y" = climate$,
                 "z" = climate$)

plot(df$x,
     df$y)

arrows(x0 = df$x,
       y0 = df$y + df$z,
       x1 = df$x,
       y1 = df$y - df$z,
       length = 0.01,
       angle = 90,
       code = 3,
       col = "black",
       lty = "solid",
       lwd = 2)

abline(model <- lm(df$y ~ df$x))

# Regression
prediction <- predict(model, interval = "confidence", level = 0.99)
ix <- sort(df$x, index.return=T)$ix
lines(df$x[ix], prediction[ix , 1], col = "grey", lwd = 2)
polygon(c(rev(df$x[ix]), df$x[ix]), c(rev(prediction[ix, 3]), prediction[ix, 2]), col = rgb(red = 0,green = 0,blue = 0,alpha = 50, maxColorValue = 255), border = NA)
summary(model)
