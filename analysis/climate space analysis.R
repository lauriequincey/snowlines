# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.climate <- readRDS("~/snowlines/data/data.climate_converted.rds")

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
  poly4_regression = lm(climate ~ poly(distance, 4))
  pcor = cor.test(x = distance, y = climate)
  
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
                        "poly3_pval" = function.get_pval(poly3_regression),
                        "poly4_int" = poly4_regression$coefficients[1],
                        "poly4_grad" = poly4_regression$coefficients[2],
                        "poly4_adjr2" = summary(poly4_regression)$adj.r.squared[1],
                        "poly4_df" = summary(poly4_regression)$df[2],
                        "poly4_fstat" = summary(poly4_regression)$fstatistic[1],
                        "poly4_pval" = function.get_pval(poly4_regression),
                        "pcor_cor" = pcor$estimate,
                        "pcor_pval" = pcor$p.value,
                        "pcor_df" = pcor$parameter)
  
  return(outputs)
  
}

# Analyse ####
stat.climate_spatial_analysis <- lapply(X = data.climate_no_sem,
                                        FUN = function(x) {
                                          return(as.data.frame(sapply(X = x[, c(grepl("mean", colnames(x)))],
                                                                      FUN = function(y) function.analyse_climate(y, x$distance))))
})

# Save ####
saveRDS(file = "~/snowlines/outputs/climate space/stat.climate_spatial_analysis.rds", object = stat.climate_spatial_analysis)

# Tool to extract a specific stat for all columns each year ####
function.melt_stats <- function(dataframe, stat) {
  do.call(what = rbind,
          args = lapply(X = dataframe,
                        FUN = function(x) {x[stat, ]}))
}

stat.yearly_stat <- function.melt_stats(dataframe = stat.climate_spatial_analysis,
                                        stat = "ols_grad")

mean(as.numeric(stat.yearly_stat$winter_temperature_2m_mean_converted))
sd(as.numeric(stat.yearly_stat$winter_snowfall_mean))




# Get Range
test <- lapply(X = data.climate_no_sem,
               FUN = function(x) {
                 return(as.data.frame(sapply(X = x[, c(grepl("mean", colnames(x)))],
                                             FUN = function(y) {return(mean(y))})))
                 })

melt_test <- as.data.frame(do.call(what = rbind,
                       args = lapply(X = test,
                                     FUN = function(x) {t(x)})))

mean(melt_test$summer_temperature_2m_mean_converted)

plot(x = data.climate_no_sem$`1981`$distance, y = data.climate_no_sem$`1981`$summer_temperature_2m_mean_converted)


mean(stat.snowline_spatial_analysis_melted$ols_grad)





