# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Requirements ----
require(ggplot2)
require(reshape2)
require(patchwork)
require(RColorBrewer)

# Colours ----
# https://www.nature.com/articles/s41467-020-19160-7
# display.brewer.all()
# https://color.adobe.com/create/color-accessibility 

# Other Categorical
colourGradientCategorical <- colorRampPalette(brewer.pal(6, "Spectral"))

# Density Gradient (Call with ggplot)
# scale_color_viridis(option = "C",
#                     direction = -1,
#                     name = "Relative\nNeighbourhood\nDensity",
#                     labels = scales::percent) +

# Climate Series Colours
autumn <- "#D66D72"
winter <- "#6391BD"
spring <- "#9DDF8E"
summer <- "#EEEA8E"
seasons = c("#D66D72", "#6391BD", "#9DDF8E", "#EEEA8E")

# Sun Gradient
colourGradientSun <- rev(colorRampPalette(brewer.pal(11, "YlOrRd"))(11))

# Image Count Gradient
colourGradientImages <- colorRampPalette(brewer.pal(9, "Greys"))(9)[0:7]

# Snow Depth ----
# Import
snowDepths <- readRDS("~/snowlines/data/data.snow_depth.rds")[22038:22402,] # 2018

# Make Numeric
snowDepths <- data.frame("Date" = snowDepths$Date,
                         as.data.frame(apply(snowDepths[, 2:7], 2, as.numeric)))

# Melt to ggplot-style dataframe in order to plot as series
snowDepths <- melt(snowDepths, id = "Date")
colnames(snowDepths) <- c("date", "climateStation", "snowDepth")

# Plot
snowDepthPlot <- ggplot(snowDepths, aes(x = as.Date(date), y = snowDepth)) + 
  geom_line(aes(col = climateStation)) +
  scale_color_manual(values = colourGradientCategorical(6),
                     labels = c("Anestølen (443m asl)", "FV614 Grytadalen (422m asl)", "Jostedalen Mjølversgrendi (305m asl)", "Juvasshøe (1894m asl)", "Myklebust I Breim (315m asl)", "Sognefjellet snøpute nye (1425m asl)")) +
  theme_classic() +
  theme(legend.position = c(0.84, 0.85),
        legend.title = element_blank()) +
  scale_x_date(date_breaks = "1 month",
               date_labels = "%b") +
  scale_y_continuous(limits = c(0, 230)) +
  labs(x = "Date",
       y = "Snow Depth (cm)") +
  coord_cartesian(expand = FALSE)

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/snowDepth.svg", plot = snowDepthPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = png, file = "~/snowlines/showPlots/snowDepth.png", plot = snowDepthPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/snowDepth.pdf", plot = snowDepthPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/snowDepth.png")

# End of Ablation Season Dates ----
# Import
endOfAblationSeasonDates <- readRDS(file = "~/snowlines/data/data.end_of_ablation_season_dates.rds")
colnames(endOfAblationSeasonDates) <- c("year", "date")

# Add new column as day of year
endOfAblationSeasonDates[[paste0("dayOfYear")]] <- c(as.numeric(strftime(as.Date(endOfAblationSeasonDates[["date"]], origin = "1970-01-01"), format = "%j")))


# Plot Undated
endOfAblationSeasonDatesPlot <- ggplot(endOfAblationSeasonDates, aes(x = year, y = dayOfYear)) + 
  geom_rect(aes(xmin = 1980,
                xmax = 2023,
                ymin = 182, ymax = 213),
            fill = "light grey") +
  geom_point() + 
  theme_classic() +
  scale_y_continuous(breaks = c(152, 182, 213, 244),
                     labels = c("153\n~Jun 1st", "183\n~Jul 1st", "214\n~Aug 1st", "245\n~Sep 1st")) +
  scale_x_continuous(breaks = seq(1982, 2021, 3),
               labels = seq(1982, 2021, 3)) +
  labs(x = "Year", y = "Day of Year") +
  coord_cartesian(xlim = c(1982, 2020))

# Plot Dated
#endOfAblationSeasonDatesPlot <- ggplot(endOfAblationSeasonDates, aes(x = as.Date(date, origin = "1970-01-01"), y = dayOfYear)) + 
#  geom_rect(aes(xmin = as.Date("1980-01-01", origin = "1970-01-01"),
#                xmax = as.Date("2023-01-01", origin = "1970-01-01"),
#                ymin = 182, ymax = 213),
#            fill = "light grey") +
#  geom_point() + 
#  theme_classic() +
#  scale_y_continuous(breaks = c(152, 182, 213, 244),
#                     labels = c("153\n~Jun 1st", "183\n~Jul 1st", "214\n~Aug 1st", "245\n~Sep 1st")) +
#  scale_x_date(breaks = as.Date(paste(seq(1982, 2021, 3), 1, 1, sep = "-"), origin = "1970-01-01"),
#               labels = seq(1982, 2021, 3)) +
#  labs(x = "Year", y = "Day of Year") +
#  coord_cartesian(xlim = c(as.Date("1982-01-01", origin = "1970-01-01"),
#                           as.Date("2020-12-31", origin = "1970-01-01")))

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/endOfAblationSeasonDates.svg", plot = endOfAblationSeasonDatesPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = png, file = "~/snowlines/showPlots/endOfAblationSeasonDates.png", plot = endOfAblationSeasonDatesPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/endOfAblationSeasonDates.pdf", plot = endOfAblationSeasonDatesPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/endOfAblationSeasonDates.png")

# Image Stats ----
# Import
imageStats <- readRDS(file = "~/snowlines/data/data.image_stats.rds")
imageStats$year <- rownames(imageStats)
imageStats <- melt(imageStats, id = "year")
colnames(imageStats) <- c("year", "satelliteName", "imageCount")

# Plot
imageStatsPlot <- ggplot(imageStats, aes(x = as.Date(paste(year, 1, 1, sep = "-"), origin = "1970-01-01"), y = imageCount)) + 
  geom_bar(position = "stack", stat = "identity", aes(fill = satelliteName)) +
  scale_fill_grey(labels = c("Landsat 4", "Landsat 5", "Landsat 7", "Landsat 8")) +
  #scale_fill_discrete(type = colourGradient(6), labels = c("Landsat 4", "Landsat 5", "Landsat 7", "Landsat 8")) +
  theme_classic() +
  theme(legend.position = c(0.066, 0.88),
        legend.title = element_blank(),
        legend.background = element_blank()) +
  scale_x_date(breaks = as.Date(paste(seq(1982, 2021, 3), 1, 1, sep = "-"), origin = "1970-01-01"),
               labels = seq(1982, 2021, 3)) +
  scale_y_continuous(expand = c(0, 0)) +
  labs(x = "Year",
       y = "No. Unique Quality Images") +
  coord_cartesian(xlim = c(as.Date("1982-01-01", origin = "1970-01-01"),
                           as.Date("2020-12-31", origin = "1970-01-01")))

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/imageStats.svg", plot = imageStatsPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = png, file = "~/snowlines/showPlots/imageStats.png", plot = imageStatsPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/imageStats.pdf", plot = imageStatsPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/imageStats.png")

# Snowline Norway Space ----
snowlineSpace <- readRDS(file = "~/snowlines/data/data.snowlines.rds")$`2018`
snowlineSpaceRegional <- readRDS(file = "~/snowlines/data/data.snowlines_rsla.rds")[30, ]
snowlineAhlmann <- data.frame("distance" = c(20, 44, 84, 136, 142, 157, 177, 192),
                              "altitude" = c(1350, 1400, 1600, 1650, 1650, 1800, 2000, 2200))

# Calculate Neighbourhood Densities (use denscols with a BW palette and change the resultant colours back to numbers)
x <- densCols(x = snowlineSpace$distance,
              y = snowlineSpace$altitude,
              nbin = 2000,
              #bandwidth = 200, 
              colramp = colorRampPalette(c("black", "white")))
snowlineSpace$dens <- col2rgb(x)[1,] + 1L
scaler <- function(x){(x-min(x))/(max(x)-min(x))}
snowlineSpace$dens <- scaler(snowlineSpace$dens) # scale to 0-1
#snowlineSpace = snowlineSpace[order(snowlineSpace$dens),]

# Plot
snowlineSpacePlot <- ggplot(NULL) + 
  geom_point(data = snowlineSpace,
             aes(x = distance,
                 y = altitude,
                 colour = dens,
                 shape = "."),
             size = 0.1,
             alpha = 0.05) +
  scale_color_viridis(option = "C",
                      direction = -1,
                      name = "Relative\nNeighbourhood\nDensity",
                      labels = scales::percent) +
  geom_smooth(data = snowlineSpace,
              aes(x = distance, y = altitude),
              method = "lm",
              colour = "black",
              size = 0.5,
              lwd = 0.5) +
  geom_smooth(data = snowlineSpace,
              aes(x = distance, y = altitude),
              formula = y + snowlineSpaceRegional$plus_error ~ x,
              method = "lm",
              colour = "black",
              linetype = "dashed",
              size = 0.5,
              lwd = 0.5) +
  geom_smooth(data = snowlineSpace,
              aes(x = distance, y = altitude,),
              formula = y - snowlineSpaceRegional$minus_error ~ x,
              method = "lm",
              colour = "black",
              linetype = "dashed",
              size = 0.5,
              lwd = 0.5) +
  geom_point(data = snowlineAhlmann,
             aes(x = distance, y = altitude),
             shape = "cross",
             size = 2) +
  theme_classic() +
  theme(legend.position = c(0.05, 0.825),
        legend.background = element_blank(),
        legend.title = element_text(size = 9)) +
  labs(x = "Distance (km)",
       y = "Altitude (m asl)") +
  guides(shape = "none",
         colour = guide_colourbar(title = labs(subtitle = "Density"),
                                  title.position = "top",
                                  title.vjust = 2,
                                  draw.ulim = FALSE,
                                  draw.llim = FALSE,
                                  barwidth = 0.2))

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/snowlineSpace.svg", plot = snowlineSpacePlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = png, file = "~/snowlines/showPlots/snowlineSpace.png", plot = snowlineSpacePlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/snowlineSpace.pdf", plot = snowlineSpacePlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/snowlineSpace.png")

# Snowline Norway Regional ----
snowlineRegional <- readRDS(file = "~/snowlines/data/data.snowlines_rsla.rds")

snowlineRegionalPlot <- ggplot(data = snowlineRegional, aes(x = as.POSIXct(x = aqcuisition_time_median, origin = "1970-01-01"), y = rsla)) +
  geom_point() +
  geom_errorbar(aes(x = as.POSIXct(x = aqcuisition_time_median, origin = "1970-01-01"),
                    ymin = rsla - minus_error,
                    ymax = rsla + plus_error),
                alpha = 0.4) +
  geom_smooth(method = "lm", colour = "black", fill = "grey", lwd = 0.5) +
  theme_classic() +
  scale_x_datetime(breaks =  as.POSIXct(x = paste(seq(1982, 2021, 3), 1, 1, sep = "-"), origin = "1970-01-01"),
                   labels = seq(1982, 2021, 3)) +
  labs(x = "Year",
       y = "Altitude (m asl)") +
  coord_cartesian(expand = TRUE)

ggsave(device = svg, file = "~/snowlines/showPlots/snowlineRegional.svg", plot = snowlineRegionalPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = png, file = "~/snowlines/showPlots/snowlineRegional.png", plot = snowlineRegionalPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/snowlineRegional.pdf", plot = snowlineRegionalPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/snowlineRegional.png")

# Snowline Norway Gradient ----
snowlineGradient <- readRDS(file = "~/snowlines/data/data.snowlines_gradients.rds")

snowlineGradientPlot <- ggplot(data = snowlineGradient, aes(x = as.POSIXct(x = aqcuisition_time_median, origin = "1970-01-01"), y = gradient)) +
  geom_point() +
  geom_errorbar(aes(x = as.POSIXct(x = aqcuisition_time_median, origin = "1970-01-01"),
                    ymin = gradient_error_lower,
                    ymax = gradient_error_upper),
                alpha = 0.4) +
  geom_smooth(method = "lm", colour = "black", fill = "grey", lwd = 0.5) +
  theme_classic() +
  scale_x_datetime(breaks =  as.POSIXct(x = paste(seq(1982, 2021, 3), 1, 1, sep = "-"), origin = "1970-01-01"),
                   labels = seq(1982, 2021, 3)) +
  labs(x = "Year",
       y = expression("Gradient (m km"^-1*")")) +
  coord_cartesian(expand = TRUE)

ggsave(device = svg, file = "~/snowlines/showPlots/snowlineGradient.svg", plot = snowlineGradientPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = png, file = "~/snowlines/showPlots/snowlineGradient.png", plot = snowlineGradientPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/snowlineGradient.pdf", plot = snowlineGradientPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/snowlineGradient.png")

# Snowline Canada Space ----
snowlineCanadaSpace <- readRDS(file = "~/snowlines/data/data.kitkatla.rds")
snowlineCanadaSpaceRegional <- readRDS(file = "~/snowlines/data/data.kitkatla_rsla.rds")[1, ]

# Calculate Neighbourhood Densities (use denscols with a BW palette and change the resultant colours back to numbers)
x <- densCols(x = snowlineCanadaSpace$distance,
              y = snowlineCanadaSpace$altitude,
              nbin = 2000,
              #bandwidth = 200, 
              colramp = colorRampPalette(c("black", "white")))
snowlineCanadaSpace$dens <- col2rgb(x)[1,] + 1L
scaler <- function(x){(x-min(x))/(max(x)-min(x))}
snowlineCanadaSpace$dens <- scaler(snowlineCanadaSpace$dens) # scale to 0-1
#snowlineCanadaSpace = snowlineCanadaSpace[order(snowlineCanadaSpace$dens),]

# Plot
snowlineCanadaSpacePlot <- ggplot(NULL) + 
  geom_point(data = snowlineCanadaSpace,
             aes(x = distance,
                 y = altitude,
                 colour = dens,
                 shape = "."),
             size = 0.1,
             alpha = 0.05) +
  scale_color_viridis(option = "C",
                      direction = -1,
                      name = "Relative\nNeighbourhood\nDensity",
                      labels = scales::percent) +
  geom_smooth(data = snowlineCanadaSpace,
              aes(x = distance, y = altitude),
              method = "lm",
              colour = "black",
              size = 0.5,
              lwd = 0.5) +
  geom_smooth(data = snowlineCanadaSpace,
              aes(x = distance, y = altitude),
              formula = y + snowlineCanadaSpaceRegional$plus_error ~ x,
              method = "lm",
              colour = "black",
              linetype = "dashed",
              size = 0.5,
              lwd = 0.5) +
  geom_smooth(data = snowlineCanadaSpace,
              aes(x = distance, y = altitude,),
              formula = y - snowlineCanadaSpaceRegional$minus_error ~ x,
              method = "lm",
              colour = "black",
              linetype = "dashed",
              size = 0.5,
              lwd = 0.5) +
  theme_classic() +
  theme(legend.position = c(0.05, 0.825),
        legend.background = element_blank(),
        legend.title = element_text(size = 9)) +
  labs(x = "Distance (km)",
       y = "Altitude (m asl)") +
  scale_x_continuous(breaks = c(0, 50, 100, 150, 200, 250)) +
  scale_y_continuous(breaks = c(500, 1000, 1500, 2000, 2500)) +
  guides(shape = "none",
         colour = guide_colourbar(title = labs(subtitle = "Density"),
                                  title.position = "top",
                                  title.vjust = 2,
                                  draw.ulim = FALSE,
                                  draw.llim = FALSE,
                                  barwidth = 0.2))

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/snowlineCanadaSpace.svg", plot = snowlineCanadaSpacePlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = png, file = "~/snowlines/showPlots/snowlineCanadaSpace.png", plot = snowlineCanadaSpacePlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/snowlineCanadaSpace.pdf", plot = snowlineCanadaSpacePlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/snowlineCanadaSpace.png")

# Climate Space ----
# Import
climateSpace <- readRDS(file = "~/snowlines/data/data.climate.rds")$`2018`

# Snowfall
# Adjust units
climateSpace$autumn_snowfall_mean <- climateSpace$autumn_snowfall_mean * 1000
climateSpace$winter_snowfall_mean <- climateSpace$winter_snowfall_mean * 1000
climateSpace$spring_snowfall_mean <- climateSpace$spring_snowfall_mean * 1000
climateSpace$summer_snowfall_mean <- climateSpace$summer_snowfall_mean * 1000
climateSpace$autumn_snowfall_mean_sem <- climateSpace$autumn_snowfall_mean_sem * 1000
climateSpace$winter_snowfall_mean_sem <- climateSpace$winter_snowfall_mean_sem * 1000
climateSpace$spring_snowfall_mean_sem <- climateSpace$spring_snowfall_mean_sem * 1000
climateSpace$summer_snowfall_mean_sem <- climateSpace$summer_snowfall_mean_sem * 1000
climateSpace$autumn_surface_solar_radiation_downwards_mean <- climateSpace$autumn_surface_solar_radiation_downwards_mean / 1000000
climateSpace$winter_surface_solar_radiation_downwards_mean <- climateSpace$winter_surface_solar_radiation_downwards_mean / 1000000
climateSpace$spring_surface_solar_radiation_downwards_mean <- climateSpace$spring_surface_solar_radiation_downwards_mean / 1000000
climateSpace$summer_surface_solar_radiation_downwards_mean <- climateSpace$summer_surface_solar_radiation_downwards_mean / 1000000
climateSpace$autumn_surface_solar_radiation_downwards_mean_sem <- climateSpace$autumn_surface_solar_radiation_downwards_mean_sem / 1000000
climateSpace$winter_surface_solar_radiation_downwards_mean_sem <- climateSpace$winter_surface_solar_radiation_downwards_mean_sem / 1000000
climateSpace$spring_surface_solar_radiation_downwards_mean_sem <- climateSpace$spring_surface_solar_radiation_downwards_mean_sem / 1000000
climateSpace$summer_surface_solar_radiation_downwards_mean_sem <- climateSpace$summer_surface_solar_radiation_downwards_mean_sem / 1000000

# Melt
melter <- function(className, data) {
  mean <- melt(data[, !grepl("sem", colnames(data)) & grepl(className, colnames(data)) | grepl("distance", colnames(data))], id = c("distance"))
  colnames(mean) <- c("distance", "class", "mean")
  sem <- melt(data[, grepl("sem", colnames(data)) & grepl(className, colnames(data)) | grepl("distance", colnames(data))], id = c("distance"))
  colnames(sem) <- c("distance", "class", "sem")
  return(cbind(mean, sem["sem"]))
}
climateSpaceSnowfall <- melter("snowfall", climateSpace)
climateSpaceTemperature <- melter("temperature", climateSpace)
climateSpaceInsolation <- melter("surface_solar_radiation_downwards", climateSpace)

# Plot
climateSpaceSnowfallPlot <- ggplot() +
  geom_point(data = climateSpaceSnowfall, aes(x = distance, y = mean, colour = class)) +
  scale_color_manual(values = c("#D66D72", "#9DDF8E", "#EEEA8E", "#6391BD"),
                     labels = c("Autumn", "Spring", "Summer", "Winter")) +
  geom_errorbar(data = climateSpaceSnowfall,
                aes(x = distance, ymin = mean - sem, ymax = mean + sem, colour = class),
                width = 4, alpha = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = autumn_snowfall_mean), method = "glm", formula = y ~ poly(x, 3), colour = autumn, fill = autumn, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = winter_snowfall_mean), method = "glm", formula = y ~ poly(x, 3), colour = winter, fill = winter, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = spring_snowfall_mean), method = "glm", formula = y ~ poly(x, 3), colour = spring, fill = spring, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = summer_snowfall_mean), method = "glm", formula = y ~ poly(x, 3), colour = summer, fill = summer, lwd = 0.5) +
  theme_classic() +
  scale_x_continuous(position = "top") +
  scale_y_continuous(n.breaks = 8) +
  labs(x = "Distance (km)", y = "Snowfall SWE (mmd"^-1*")") +
  theme(legend.title = element_blank(),
        legend.position = c(0.90, 0.85),
        legend.background = element_blank()) +
  guides(shape = "none")

climateSpaceTemperaturePlot <- ggplot() +
  geom_point(data = climateSpaceTemperature, aes(x = distance, y = mean, colour = class)) +
  scale_color_manual(values = c("#D66D72", "#9DDF8E", "#EEEA8E", "#6391BD")) +
  geom_errorbar(data = climateSpaceTemperature,
                aes(x = distance, ymin = mean - sem, ymax = mean + sem, colour = class),
                width = 4, alpha = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = autumn_temperature_mean), method = "lm", colour = autumn, fill = autumn, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = winter_temperature_mean), method = "lm", colour = winter, fill = winter, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = spring_temperature_mean), method = "lm", colour = spring, fill = spring, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = summer_temperature_mean), method = "lm", colour = summer, fill = summer, lwd = 0.5) +
  theme_classic() +
  scale_y_continuous(n.breaks = 8,
                     position = "right") +
  labs(x = "Distance (km)", y = expression("Temperature ("^o*"C)")) +
  theme(axis.title.x = element_blank(),
        axis.text.x = element_blank(),
        axis.ticks.x = element_blank(),
        axis.line.x = element_blank(),
        legend.position = "none") +
  guides(shape = "none")

climateSpaceInsolationPlot <- ggplot() +
  geom_point(data = climateSpaceInsolation, aes(x = distance, y = mean, colour = class)) +
  scale_color_manual(values = c("#D66D72", "#9DDF8E", "#EEEA8E", "#6391BD")) +
  geom_errorbar(data = climateSpaceInsolation,
                aes(x = distance, ymin = mean - sem, ymax = mean + sem, colour = class),
                width = 4, alpha = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = autumn_surface_solar_radiation_downwards_mean), method = "glm", formula = y ~ poly(x, 3), colour = autumn, fill = autumn, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = winter_surface_solar_radiation_downwards_mean), method = "glm", formula = y ~ poly(x, 4), colour = winter, fill = winter, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = spring_surface_solar_radiation_downwards_mean), method = "glm", formula = y ~ poly(x, 4), colour = spring, fill = spring, lwd = 0.5) +
  geom_smooth(data = climateSpace, aes(x = distance, y = summer_surface_solar_radiation_downwards_mean), method = "glm", formula = y ~ poly(x, 2), colour = summer, fill = summer, lwd = 0.5) +
  theme_classic() +
  scale_y_continuous(n.breaks = 8) +
  labs(x = "Distance (km)", y = expression("Surface Solar Downwelling Radiation (Mjm"^-2*"d"^-1*")")) +
  theme(legend.position = "none") +
  guides(shape = "none")

# Combine
climateSpacePlot <- climateSpaceSnowfallPlot / climateSpaceTemperaturePlot / climateSpaceInsolationPlot

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/climateSpace.svg", plot = climateSpacePlot, width = 210, height = 297, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = png, file = "~/snowlines/showPlots/climateSpace.png", plot = climateSpacePlot, width = 210, height = 297, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/climateSpace.pdf", plot = climateSpacePlot, width = 210, height = 297, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/climateSpace.png")

# Climate Time ----
# Import
climateTime <- readRDS(file = "~/snowlines/data/data.climate_time.rds")

# Change char date to real (POSIX) date
climateTime$year <- as.POSIXct(x = replace(x = as.character(climateTime$year), values = paste(as.character(climateTime$year), 1, 1, sep = "-")), origin = "1970-01-01")

# Adjust units
climateTime$autumn_snowfall_mean <- climateTime$autumn_snowfall_mean * 1000
climateTime$winter_snowfall_mean <- climateTime$winter_snowfall_mean * 1000
climateTime$spring_snowfall_mean <- climateTime$spring_snowfall_mean * 1000
climateTime$summer_snowfall_mean <- climateTime$summer_snowfall_mean * 1000
climateTime$autumn_snowfall_mean_sem <- climateTime$autumn_snowfall_mean_sem * 1000
climateTime$winter_snowfall_mean_sem <- climateTime$winter_snowfall_mean_sem * 1000
climateTime$spring_snowfall_mean_sem <- climateTime$spring_snowfall_mean_sem * 1000
climateTime$summer_snowfall_mean_sem <- climateTime$summer_snowfall_mean_sem * 1000
climateTime$autumn_surface_solar_radiation_downwards_mean <- climateTime$autumn_surface_solar_radiation_downwards_mean / 1000000
climateTime$winter_surface_solar_radiation_downwards_mean <- climateTime$winter_surface_solar_radiation_downwards_mean / 1000000
climateTime$spring_surface_solar_radiation_downwards_mean <- climateTime$spring_surface_solar_radiation_downwards_mean / 1000000
climateTime$summer_surface_solar_radiation_downwards_mean <- climateTime$summer_surface_solar_radiation_downwards_mean / 1000000
climateTime$autumn_surface_solar_radiation_downwards_mean_sem <- climateTime$autumn_surface_solar_radiation_downwards_mean_sem / 1000000
climateTime$winter_surface_solar_radiation_downwards_mean_sem <- climateTime$winter_surface_solar_radiation_downwards_mean_sem / 1000000
climateTime$spring_surface_solar_radiation_downwards_mean_sem <- climateTime$spring_surface_solar_radiation_downwards_mean_sem / 1000000
climateTime$summer_surface_solar_radiation_downwards_mean_sem <- climateTime$summer_surface_solar_radiation_downwards_mean_sem / 1000000

# Melt
melter <- function(className, data) {
  mean <- melt(data[, !grepl("sem", colnames(data)) & grepl(className, colnames(data)) | grepl("year", colnames(data))], id = c("year"))
  colnames(mean) <- c("year", "class", "mean")
  sem <- melt(data[, grepl("sem", colnames(data)) & grepl(className, colnames(data)) | grepl("year", colnames(data))], id = c("year"))
  colnames(sem) <- c("year", "class", "sem")
  return(cbind(mean, sem["sem"]))
}
climateTimeSnowfall <- melter("snowfall", climateTime)
climateTimeTemperature <- melter("temperature", climateTime)
climateTimeInsolation <- melter("surface_solar_radiation_downwards", climateTime)

# Plot
climateTimeSnowfallPlot <- ggplot() +
  geom_point(data = climateTimeSnowfall, aes(x = year, y = mean, colour = class)) +
  scale_color_manual(values = c("#D66D72", "#9DDF8E", "#EEEA8E", "#6391BD"),
                     labels = c("Autumn", "Spring", "Summer", "Winter")) +
  geom_errorbar(data = climateTimeSnowfall,
                aes(x = year, ymin = mean - sem, ymax = mean + sem, colour = class),
                alpha = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = autumn_snowfall_mean), method = "lm", colour = autumn, fill = autumn, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = winter_snowfall_mean), method = "lm", colour = winter, fill = winter, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = spring_snowfall_mean), method = "lm", colour = spring, fill = spring, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = summer_snowfall_mean), method = "lm", colour = summer, fill = summer, lwd = 0.5) +
  theme_classic() +
  scale_y_continuous(n.breaks = 8) +
  scale_x_datetime(breaks =  as.POSIXct(x = paste(seq(1982, 2021, 3), 1, 1, sep = "-"), origin = "1970-01-01"),
                   labels = seq(1982, 2021, 3),
                   position = "top") +
  labs(x = "Year", y = "Snowfall SWE (mmd"^-1*")") +
  theme(legend.title = element_blank(),
        legend.position = c(0.11, 0.85),
        legend.background = element_blank()) +
  guides(shape = "none")

climateTimeTemperaturePlot <- ggplot() +
  geom_point(data = climateTimeTemperature, aes(x = year, y = mean, colour = class)) +
  scale_color_manual(values = c("#D66D72", "#9DDF8E", "#EEEA8E", "#6391BD")) +
  geom_errorbar(data = climateTimeTemperature,
                aes(x = year, ymin = mean - sem, ymax = mean + sem, colour = class)
                , alpha = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = autumn_temperature_mean), method = "lm", colour = autumn, fill = autumn, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = winter_temperature_mean), method = "lm", colour = winter, fill = winter, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = spring_temperature_mean), method = "lm", colour = spring, fill = spring, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = summer_temperature_mean), method = "lm", colour = summer, fill = summer, lwd = 0.5) +
  theme_classic() +
  scale_y_continuous(n.breaks = 8,
                     position = "right") +
  scale_x_datetime(breaks =  as.POSIXct(x = paste(seq(1982, 2021, 3), 1, 1, sep = "-"), origin = "1970-01-01"),
                   labels = seq(1982, 2021, 3)) +
  labs(x = "Year", y = expression("Temperature ("^o*"C)")) +
  theme(axis.title.x = element_blank(),
        axis.text.x = element_blank(),
        axis.ticks.x = element_blank(),
        axis.line.x = element_blank(),
        legend.position = "none") +
  guides(shape = "none")

climateTimeInsolationPlot <- ggplot() +
  geom_point(data = climateTimeInsolation, aes(x = year, y = mean, colour = class)) +
  scale_color_manual(values = c("#D66D72", "#9DDF8E", "#EEEA8E", "#6391BD")) +
  geom_errorbar(data = climateTimeInsolation,
                aes(x = year, ymin = mean - sem, ymax = mean + sem, colour = class),
                alpha = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = autumn_surface_solar_radiation_downwards_mean), method = "lm", colour = autumn, fill = autumn, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = winter_surface_solar_radiation_downwards_mean), method = "lm", colour = winter, fill = winter, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = spring_surface_solar_radiation_downwards_mean), method = "lm", colour = spring, fill = spring, lwd = 0.5) +
  geom_smooth(data = climateTime, aes(x = year, y = summer_surface_solar_radiation_downwards_mean), method = "lm", colour = summer, fill = summer, lwd = 0.5) +
  theme_classic() +
  scale_y_continuous(n.breaks = 8) +
  scale_x_datetime(breaks =  as.POSIXct(x = paste(seq(1982, 2021, 3), 1, 1, sep = "-"), origin = "1970-01-01"),
                   labels = seq(1982, 2021, 3)) +
  labs(x = "Year", y = expression("Surface Solar Downwelling Radiation (Mjm"^-2*"d"^-1*")")) +
  theme(legend.position = "none") +
  guides(shape = "none")

# Combine
climateTimePlot <- climateTimeSnowfallPlot / climateTimeTemperaturePlot / climateTimeInsolationPlot

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/climateTime.svg", plot = climateTimePlot, width = 210, height = 297, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = png, file = "~/snowlines/showPlots/climateTime.png", plot = climateTimePlot, width = 210, height = 297, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/climateTime.pdf", plot = climateTimePlot, width = 210, height = 297, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/climateTime.png")

# Validation - Snow % ----
# Import
validation <- readRDS(file = "~/snowlines/data/data.validation.rds")

# Plot
validationPlot <- ggplot(data = validation, aes(x = terraSnowCoverPercentage, y = landsatSnowCoverPercentage)) +
  geom_abline(slope = 1, intercept = 0,
              linetype = "dashed",
              colour = "light grey",
              lwd = 0.5) +
  geom_smooth(method = "lm", colour = "black", fill = "grey", lwd = 0.5) +
  geom_point(aes(colour = sunElevation)) + 
  #scale_x_continuous(trans = 'log1p') +
  #scale_y_continuous(trans = 'log1p') +
  coord_cartesian(expand = FALSE, xlim = c(0, 80), ylim = c(0, 80)) +
  labs(x = "MOD10A1 Snow Extent (%)", y = "Study Algorithm Snow Extent (%)") +
  theme_classic() +
  scale_color_gradientn(colours = rev(colourGradientSun),
                        guide_colourbar(title = "Sun Elevation\n(Degrees)")) +
  theme(legend.position = c(0.07, 0.81),
        legend.background = element_blank(),
        legend.title = element_text(size = 9)) +
  guides(colour = guide_colourbar(title.position = "top",
                                  title.vjust = 2,
                                  draw.ulim = FALSE,
                                  draw.llim = FALSE,
                                  barwidth = 0.2))

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/validation.svg", plot = validationPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = png, file = "~/snowlines/showPlots/validation.png", plot = validationPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/validation.pdf", plot = validationPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/validation.png")

# Validation - Absolute Error ----
validation <- data.frame(validation,
                         "absoluteErrors" = validation$terraSnowCoverPercentage - validation$landsatSnowCoverPercentage)
sun <- data.frame("sunElevation" = unlist(lapply(X = readRDS(file = "~/snowlines/data/data.snowlines.rds"), FUN = function(x) {unique(as.numeric(as.character(substr(x$sun_elevation, 1, 200))))})))

breaks <- seq(min(sun$sunElevation), max(sun$sunElevation), 0.5)
bins   <- cut(sun$sunElevation, breaks)
binned <- data.frame(
  x      = head(breaks, -1) + 0.25,
  count  = sapply(split(sun$sunElevation, bins), length))

# Plot
colAlphaDimmer = function(colourGradient, reduceAlphaValue) {
  unlist(lapply(X = colourGradient, FUN = function(x) {
    colRgb = col2rgb(x, alpha = TRUE)
    newRgb = rgb(red = colRgb["red", ],
                 green = colRgb["green", ],
                 blue = colRgb["blue", ],
                 alpha = colRgb["red", ] / reduceAlphaValue,
                 maxColorValue = 255)
  }))
}
duplicator = (function(colours) {
  unlist(lapply(X = colours, FUN = function(x) {
    return(c(x, x))
  }))
})

# Plot
absoluteErrorPlot <- ggplot(NULL) +
  geom_col(data = binned, aes(x = x, y = count*1000, fill = count, width = 0.5)) + # it says width is an unknown aesthetic but it still works. 
  geom_col(data = binned, aes(x = x, y = -count*1000, fill = count, width = 0.5)) +
  scale_fill_gradientn(colours = colourGradientImages,
                       name = "Image\nCount",
                       guide = guide_colourbar(title.position = "top",
                                               title.vjust = 0,
                                             draw.ulim = FALSE,
                                             draw.llim = FALSE,
                                             barwidth = 0.2)) +
  scale_colour_gradientn(colours = colourGradientImages,
                         guide = "none") +
  geom_abline(slope = 0, intercept = 0,
              linetype = "dashed",
              colour = "light grey",
              lwd = 0.5) +
  geom_point(data = validation, aes(x = sunElevation, y = absoluteErrors)) +
  #geom_smooth(data = validation, aes(x = sunElevation, y = absoluteErrors), method = "lm", colour = "black") +
  scale_y_continuous(breaks = waiver(), n.breaks = 10) +
  scale_x_continuous(breaks = waiver(), n.breaks = 10) + 
  coord_cartesian(xlim = c(NA, NA), ylim = c(-45, 40)) +
  labs(x = "Sun Elevation (Degrees)", y = "Absolute Error (%)") +
  theme_classic() +
  theme(legend.position = c(0.04, 0.82),
        legend.background = element_blank(),
        legend.title = element_text(size = 9))

# Save
ggsave(device = svg, file = "~/snowlines/showPlots/absoluteError.svg", plot = absoluteErrorPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = png, file = "~/snowlines/showPlots/absoluteError.png", plot = absoluteErrorPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200) # size is A4
ggsave(device = cairo_pdf, file = "~/snowlines/showPlots/absoluteError.pdf", plot = absoluteErrorPlot, width = 210, height = 129.787137637, units = c("mm"), dpi = 1200)
browseURL("~/snowlines/showPlots/absoluteError.png")

