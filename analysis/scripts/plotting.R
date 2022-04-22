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
# End of Ablation Season ####
# Add new column as day of year
transform <- function(df, x) {
  df[[paste0(x, "_day_of_year")]] <- c(as.numeric(strftime(as.Date(df[[x]], origin = "1970-01-01"), format = "%j")))
  df
}
data.end_of_ablation_season_dates <- transform(data.end_of_ablation_season_dates, "Date")

# Plot
svg(filename = paste0("~/snowlines/outputs/end of ablation season/end of ablation season.svg"), width = 16, height = 10, pointsize = 20)
plot(x = data.end_of_ablation_season_dates$year,
     y = data.end_of_ablation_season_dates$Date_day_of_year,
     ylim = c(150, 250),
     xlim = c(1978, 2025),
     xlab = "Year",
     ylab = "Month-Day",
     yaxs = "i",
     xaxs = "i",
     axes = FALSE,
     type = "n")

polygon(x = c(1978, 2025, 2025, 1978),
        y = c(183, 183, 213, 213),
        col = "grey80",
        border = NA)

points(x = data.end_of_ablation_season_dates$year,
       y = data.end_of_ablation_season_dates$Date_day_of_year,
       pch = 20)

# Axes Bars
box(bty = "l",
    lwd = 2)

# Axes Ticks
par(cex = 0.8)
days_of_year <- as.Date(data.end_of_ablation_season_dates$Date_day_of_year, origin = "1970-01-01")
axis(side = 2,
     at = c(153, 183, 214, 245), #sequence <- seq(min(days_of_year), max(days_of_year), 20),
     labels = c("06-01", "07-01", "08-01", "09-01"), #strftime(as.Date(sequence, origin = "1970-01-01"), format = "%m-%d"),
     lwd = 2)
axis(side = 1,
     at = c(1980, 1990, 2000, 2010, 2020),
     labels = c(1980, 1990, 2000, 2010, 2020),
     lwd = 2)
dev.off()

# Snowlines Image Count ####
svg(filename = "~/snowlines/outputs/snowline image stats/image count.svg",
    width = 16,
    height = 10,
    pointsize = 20)

par(cex = 0.8)
barplot(height = data.snowlines_stats_matrix,
        width = 1,
        space = 0.2,
        border = NA,
        #names.arg = rownames(data.snowlines_stats),
        lwd = 2,
        yaxs = "i",
        xaxs = "r",
        axes = TRUE)
abline(h = 0, lwd = 2)
mtext(text = "Date", side = 1, line = 2.8)
mtext(text = "no. of Unique Quality Images", side = 2, line = 2.8)
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
