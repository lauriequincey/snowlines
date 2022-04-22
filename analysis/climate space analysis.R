# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.climate <- readRDS("~/snowlines/data/data.climate.rds")

# Prep ####
# Select only means and distance columns (exclude SEM)
data.climate_no_sem <- lapply(X = data.climate,
                              FUN = function(x) {x[, c(grepl("mean", colnames(x)) | grepl("distance", colnames(x)))]})

# Get pval from model function
function.get_pval <- function(model) {
  with(summary(model), pf(fstatistic[1],fstatistic[2],fstatistic[3],lower.tail=F))
}

# climmate analysis function
function.analyse_climate <- function(climate, distance) {
  
  ols_regression <- lm(climate ~ distance)
  poly2_regression = lm(climate ~ poly(distance, 2))
  poly3_regression = lm(climate ~ poly(distance, 3))
  
  outputs <- data.frame("ols_int" = ols_regression$coefficients[1],
                        "ols_grad" = ols_regression$coefficients[2],
                        "ols_adjr2" = summary(ols_regression)$adj.r.squared[1],
                        "ols_df" = summary(ols_regression)$df[2],
                        "ols_fstat" = summary(ols_regression)$fstatistic[1],
                        "ols_pval" = function.get_pval(ols_regression),
                        "poly2_int" = poly2_regression$coefficients[1],
                        "poly2_grad" = poly2_regression$coefficients[2],
                        "poly2_adjr2" = summary(poly2_regression)$adj.r.squared[1],
                        "poly2_df" = summary(poly2_regression)$df[2],
                        "poly2_fstat" = summary(poly2_regression)$fstatistic[1],
                        "poly2_pval" = function.get_pval(poly2_regression),
                        "poly3_int" = poly3_regression$coefficients[1],
                        "poly3_grad" = poly3_regression$coefficients[2],
                        "poly3_adjr2" = summary(poly3_regression)$adj.r.squared[1],
                        "poly3_df" = summary(poly3_regression)$df[2],
                        "poly3_fstat" = summary(poly3_regression)$fstatistic[1],
                        "poly3_pval" = function.get_pval(poly3_regression))
  
  return(outputs)
  
}

# Analyse ####
stat.climate_spatial_analysis <- lapply(X = data.climate_no_sem[1],
                                        FUN = function(x) {
                                          return(as.data.frame(sapply(X = x[, c(grepl("mean", colnames(x)))],
                                                                      FUN = function(y) function.analyse_climate(y, x$distance))))
})

# Save ####
saveRDS(file = "~/snowlines/outputs/spatial climate/stat.climate_spatial_analysis.rds", object = stat.climate_spatial_analysis)

# Tool to extract a specific stat for all columns each year ####
function.melt_stats <- function(dataframe, stat) {
  do.call(what = rbind,
          args = lapply(X = dataframe,
                        FUN = function(x) {x[stat, ]}))
}

stat.yearly_stat <- function.melt_stats(dataframe = stat.climate_spatial_analysis[seq(1,5,1)],
                                        stat = "ols_adjr2")