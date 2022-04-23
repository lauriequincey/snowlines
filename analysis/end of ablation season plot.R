# Import ####
data.end_of_ablation_season_dates <- readRDS(file = "~/snowlines/data/data.end_of_ablation_season_dates.rds")

# Manipulate ####
# Add new column as day of year
data.end_of_ablation_season_dates[[paste0("Date", "_day_of_year")]] <- c(as.numeric(strftime(as.Date(data.end_of_ablation_season_dates[["Date"]], origin = "1970-01-01"), format = "%j")))

# Reclassify ####
x <- data.end_of_ablation_season_dates$year
y <- data.end_of_ablation_season_dates$Date_day_of_year

# Open SVG ####
svg(filename = paste0("~/snowlines/outputs/end of ablation season/end of ablation season.svg"),
    width = aes.canvas$width,
    height = aes.canvas$height,
    pointsize = aes.canvas$point_size)

# Empty Plot ####
plot(x = x,
     y = y,
     ylim = c(150, 250),
     xlim = c(1980, 2022),
     xlab = "Year",
     ylab = "Month-Day",
     yaxs = "i",
     xaxs = "i",
     axes = FALSE,
     type = "n")

# September Polygon ####
polygon(x = c(1980, 2025, 2025, 1980),
        y = c(183, 183, 213, 213),
        col = aes.colour$solid_grey,
        border = NA)

# Points ####
points(x = x,
       y = y,
       pch = aes.symbols$datapoint_size_big,
       col = aes.colour$solid_black)

# Axes ####
box(bty = "l", lwd = aes.canvas$line_width)

par(cex = aes.canvas$text_sub)

axis(side = 2, at = c(153, 183, 214, 245), labels = c("06-01", "07-01", "08-01", "09-01"), lwd = aes.canvas$line_width)
axis(side = 2, at = c(168, 198, 229.5), tick = TRUE, labels = FALSE, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

axis(side = 1, at = aes.time$time, labels = aes.time$time, lwd = aes.canvas$line_width)
axis(side = 1, at = seq(min(aes.time$time) - 1, max(aes.time$time), 1), tick = TRUE, labels = FALSE, line = 0, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

# Close SVG ####
dev.off()

browseURL("~/snowlines/outputs/end of ablation season/end of ablation season.svg")
