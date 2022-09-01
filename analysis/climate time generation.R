# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.climate <- readRDS("~/snowlines/data/data.climate.rds")

# Manipulation ####
# Remove unwanted columns
#data.climate_no_sem <- lapply(X = data.climate,
#                              FUN = function(x) {x[, c(!grepl("sem", colnames(x)))]}) #c(grepl("mean", colnames(x)) | grepl("distance", colnames(x)))]})

# get numeric list of years
years_dataframe = data.frame("year" = as.numeric(as.character(names(data.climate))))

# Calculation ####
# mean each climate variable each year (not distance but including sem as each is from the same sample size (no. hours in 3 months. Mean SEM is also bigger than SD of this data too)
climate <- cbind(years_dataframe, as.data.frame(do.call(rbind, lapply(X = lapply(X = data.climate, FUN = function(x) {x[, !grepl("distance", colnames(x))]}),
                                                                            FUN = colMeans))))

#climate_means <- cbind(years_dataframe, as.data.frame(do.call(rbind, lapply(X = lapply(X = data.climate, FUN = function(x) {x[, c(!grepl("distance", colnames(x)) & !grepl("sem", colnames(x)))]}),
#                                                                            FUN = colMeans))))
#climate_means_sds <- cbind(years_dataframe, as.data.frame(do.call(rbind, lapply(X = lapply(X = data.climate, FUN = function(x) {x[, grepl("sem", colnames(x))]}),
#                                                                            FUN = function(x) {sapply(x, sd)}))))
#climate <- cbind(climate_means, climate_means_sds)

# Save ####
saveRDS(object = climate, file = "~/snowlines/data/data.climate_time.rds")
