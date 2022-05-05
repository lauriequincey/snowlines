# Import ####
data.image_stats_matrix <- readRDS(file = "~/snowlines/data/data.image_stats_matrix.rds")

# Reclassify ####
x <- data.image_stats_matrix

# Open SVG ####
svg(filename = paste0("~/snowlines/outputs/image stats/image count.svg"),
    width = aes.canvas$width,
    height = aes.canvas$height,
    pointsize = aes.canvas$point_size)

# Plot ####
par(cex = aes.canvas$text_sub)
barplot(height = x,
        width = 1,
        space = 0.2,
        border = NA,
        lwd = aes.canvas$line_width,
        yaxs = "i",
        xaxs = "r")

# Axes ####
par(cex = aes.canvas$text_main)

axis(side = 1, at = seq(-2.4, 48, 3.6) - 0.5, tick = TRUE, labels = FALSE, line = -0.28, lwd = aes.canvas$line_width)
axis(side = 1, at = seq(0, 48, 1.2) - 0.5, tick = TRUE, labels = FALSE, line = -0.28, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

axis(side = 2, at = seq(1, 22, 2), tick = TRUE, labels = FALSE, line = 0, lwd = aes.canvas$tick_mark_minor_width, tcl = aes.canvas$tick_mark_minor_height)

mtext(text = "Year", side = 1, line = 3)
mtext(text = "no. of Unique Quality Images", side = 2, line = 3)

# Close SVG ####
dev.off()

browseURL("~/snowlines/outputs/image stats/image count.svg")
