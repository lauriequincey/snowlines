# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.snowlines_climate <- readRDS("~/snowlines/data/data.snowlines_climate.rds")

# Functions ####
# Get pval from model function
function.get_pval <- function(model) {
  with(summary(model), pf(fstatistic[1],fstatistic[2],fstatistic[3],lower.tail=F))
}

# Analyse Function
function.snowlines_climate <- function(data, distance) {
  
  ols_regression <- lm(data ~ distance)
  poly2_regression <- lm(data ~ poly(distance, 2))
  poly3_regression <- lm(data ~ poly(distance, 3))
  poly4_regression <- lm(data ~ poly(distance, 4))
  
  return(data.frame("ols_int" = ols_regression$coefficients[1],
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
                     "poly3_pval" = function.get_pval(poly3_regression)))
  
}

# Analyse ####
data.snowlines_climate_analysis <- lapply(X = names(data.snowlines_climate),
                                        FUN = function(x) {
                                          
                                          distance <- data.snowlines_climate[[x]]$distance
                                          data <- data.snowlines_climate[[x]]
                                          
                                          return(as.data.frame(sapply(X = data[, c(grepl("temperature", colnames(data)) | grepl("snowfall", colnames(data)) | grepl("snowmelt", colnames(data)) | grepl("solar", colnames(data)))],
                                                                      FUN = function(y) function.snowlines_climate(y, distance))))
                                        })

names(data.snowlines_climate_analysis) <- names(data.snowlines_climate)

# Save ####
saveRDS(data.snowlines_climate_analysis, "~/snowlines/outputs/snowline climate/data.snowlines_climate_analysis.rds")