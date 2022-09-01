# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.snowlines <- readRDS(file = "~/snowlines/data/data.snowlines.rds")

# Analyse ####

# Extract no. unique image codes for each platform
data.image_stats <- do.call(what = rbind, args = lapply(X = data.snowlines, FUN = function(x) {
  
  unique_image_codes = unique(as.character(substr(x$system.index, 1, 20)))
  
  l4_codes = grep("LT04", unique_image_codes)
  l5_codes = grep("LT05", unique_image_codes)
  l7_codes = grep("LE07", unique_image_codes)
  l8_codes = grep("LC08", unique_image_codes)
  
  return(data.frame("landsat_4" = length(l4_codes),
                    "landsat_5" = length(l5_codes),
                    "landsat_7" = length(l7_codes),
                    "landsat_8" = length(l8_codes)))
  
}))

# Add Blank Years
blank_row <- c(0, 0, 0, 0)

data.image_stats <- rbind(blank_row, blank_row, blank_row, data.image_stats)

for(i in c(8, 14, 27, 28)) {
  data.image_stats <- rbind(data.image_stats[1:i,], blank_row, data.image_stats[-(1:i),])
}

# Rename
rownames(data.image_stats) <- 1982:2021

# Rotate dataframe and make into matrix
data.image_stats_matrix = data.matrix(t(data.image_stats))

# How many images have been used?
print(sum(data.image_stats$landsat_4 + data.image_stats$landsat_5 + data.image_stats$landsat_7+ data.image_stats$landsat_8))

# Save ####
saveRDS(object = data.image_stats, "~/snowlines/data/data.image_stats.rds")
saveRDS(object = data.image_stats_matrix, "~/snowlines/data/data.image_stats_matrix.rds")
