# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.snowlines <- readRDS("~/snowlines/data/data.snowlines.rds")

# Prep ####

# Function to get pval from model 
function.get_pval <- function(model) {
  with(summary(model), pf(fstatistic[1],fstatistic[2],fstatistic[3],lower.tail=F))
}

# climmate analysis function
function.analyse_snowline <- function(altitude, distance) {
  
  ols_regression <- lm(altitude ~ distance)
  pcor <- cor.test(x = distance, y = altitude)
  
  #print(distance)
  
  outputs <- data.frame("ols_int" = ols_regression$coefficients[1],
                        "ols_grad" = ols_regression$coefficients[2],
                        "ols_adjr2" = summary(ols_regression)$adj.r.squared[1],
                        "ols_df" = summary(ols_regression)$df[2],
                        "ols_fstat" = summary(ols_regression)$fstatistic[1],
                        "ols_pval" = function.get_pval(ols_regression),
                        "pcor_cor" = pcor$estimate,
                        "pcor_pval" = pcor$p.value,
                        "pcor_df" = pcor$parameter)
  
  return(outputs)
  
}

# Analyse ####
stat.snowline_spatial_analysis <- lapply(X = data.snowlines,
                                         FUN = function(x) {
                                           return(function.analyse_snowline(x$altitude, x$distance))})

# Melt from list to dataframe ####
stat.snowline_spatial_analysis_melted <- do.call(what = rbind,
                                             args = lapply(X = stat.snowline_spatial_analysis,
                                                           FUN = function(x) {as.data.frame(x)}))
# Save ####
saveRDS(file = "~/snowlines/outputs/snowline space/stat.snowline_spatial_analysis.rds", object = stat.snowline_spatial_analysis)
saveRDS(file = "~/snowlines/outputs/snowline space/stat.snowline_spatial_analysis_melted.rds", object = stat.snowline_spatial_analysis_melted)
