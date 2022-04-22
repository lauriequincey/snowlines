# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.climate <- readRDS("~/snowlines/data/data.climate.rds")

# Manipulation ####
# Remove unwanted columns
data.climate_no_sem <- lapply(X = data.climate,
                              FUN = function(x) {x[, c(grepl("mean", colnames(x)) | grepl("distance", colnames(x)))]})

# get numeric list of years
years_dataframe = data.frame("year" = as.numeric(as.character(names(data.climate_no_sem))))

# Calculation ####
# mean each climate variable each year
climate_means <- cbind(years_dataframe, as.data.frame(do.call(rbind, lapply(X = data.climate_mean <- lapply(X = data.climate, FUN = function(x) {x[, grepl("mean", colnames(x))]}),
                                                                            FUN = colMeans))))

climate_sds <- as.data.frame(do.call(rbind, lapply(X = data.climate_stddev <- lapply(X = data.climate, FUN = function(x) {x[, grepl("stdDev", colnames(x))]}),
                                                   FUN = function(x) sapply(x, sd))))
climate <- cbind(climate_means, climate_sds)

# Save ####
saveRDS(object = climate, file = "~/snowlines/data/data.climate_time.rds")