# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Canvas and Text ####
aes.canvas <- list("width"                  = 16,
                   "height"                 = 10,
                   "point_size"             = 20,
                   "line_width"             = 2,
                   "text_main"              = 1.0,
                   "text_sub"               = 0.8,
                   "tick_mark_minor_height" = -0.3,
                   "tick_mark_minor_width"  = 1)

# Symbols ####
aes.symbols <- list("datapoint_shape"        = 16,
                    "datapoint_shape_winter" = 15,
                    "datapoint_shape_summer" = 16,
                    "datapoint_shape_autumn" = 17,
                    "datapoint_shape_spring" = 18,
                    "datapoint_size_big"     = 20,
                    "datapoint_size_big2"    = 1.5,
                    "datapoint_size_mid"     = 0.8,
                    "datapoint_size_small"   = 0.2)
  
# Colours ####
aes.colour <- list("solid_black"             = rgb(red = 0,   green = 0,   blue = 0,   alpha = 255, maxColorValue = 255),
                   "solid_grey"              = rgb(red = 218, green = 218, blue = 218, alpha = 255, maxColorValue = 255),
                   "solid_blue"              = rgb(red = 125, green = 88,  blue = 252, alpha = 255, maxColorValue = 255),
                   "solid_salmon"            = rgb(red = 240, green = 108, blue = 97,  alpha = 255, maxColorValue = 255),
                   "solid_purple"            = rgb(red = 212, green = 76,  blue = 217, alpha = 255, maxColorValue = 255),
                   "solid_cyan"              = rgb(red = 144, green = 240, blue = 240, alpha = 255, maxColorValue = 255),
                   "solid_yellow"            = rgb(red = 250, green = 216, blue = 94,  alpha = 255, maxColorValue = 255),
                   "solid_tangerine"         = rgb(red = 217, green = 143, blue = 76,  alpha = 255, maxColorValue = 255),
                   "transluscent_blue1"      = rgb(red = 125, green = 88,  blue = 252, alpha = 3,   maxColorValue = 255),
                   "transluscent_blue2"      = rgb(red = 125, green = 88,  blue = 252, alpha = 50,  maxColorValue = 255),
                   "transluscent_purple1"    = rgb(red = 212, green = 76,  blue = 217, alpha = 3,   maxColorValue = 255),
                   "transluscent_purple2"    = rgb(red = 212, green = 76,  blue = 217, alpha = 50,  maxColorValue = 255),
                   "transluscent_salmon1"    = rgb(red = 240, green = 108, blue = 97,  alpha = 3,   maxColorValue = 255),
                   "transluscent_salmon2"    = rgb(red = 240, green = 108, blue = 97,  alpha = 50,  maxColorValue = 255),
                   "transluscent_cyan1"      = rgb(red = 144, green = 240, blue = 240, alpha = 3,   maxColorValue = 255),
                   "transluscent_cyan2"      = rgb(red = 144, green = 240, blue = 240, alpha = 50,  maxColorValue = 255),
                   "transluscent_yellow1"    = rgb(red = 250, green = 216, blue = 94,  alpha = 3,   maxColorValue = 255),
                   "transluscent_yellow2"    = rgb(red = 250, green = 216, blue = 94,  alpha = 50,  maxColorValue = 255),
                   "transluscent_tangerine1" = rgb(red = 217, green = 143, blue = 76,  alpha = 3,   maxColorValue = 255),
                   "transluscent_tangerine2" = rgb(red = 217, green = 143, blue = 76,  alpha = 50,  maxColorValue = 255),
                   "ramp_heat"               = colorRampPalette(colors = c(rgb(red = 250, green = 216, blue = 94,  alpha = 10, maxColorValue = 255),
                                                                           rgb(red = 217, green = 143, blue = 76,  alpha = 10, maxColorValue = 255),
                                                                           rgb(red = 240, green = 108, blue = 97,  alpha = 10, maxColorValue = 255),
                                                                           rgb(red = 212, green = 76, blue = 217,  alpha = 10, maxColorValue = 255),
                                                                           rgb(red = 125, green = 88, blue = 252,  alpha = 10, maxColorValue = 255)),
                                                                bias = 2,
                                                                interpolate = c("linear"),
                                                                alpha = TRUE))

# Time Axis ####
aes.time <- list("time" = c(1982, 1985, 1988, 1991, 1994, 1997, 2000, 2003, 2006, 2009, 2012, 2015, 2018, 2021))

# Help with Dates ####
# Convert from unix to date
as.Date(as.POSIXct(x = 378691200, origin = "1970-01-01"))

# Convert to unix from date
as.numeric(as.POSIXct("2021-12-22"))










