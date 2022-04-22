# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Import ####
data.snowlines_gradients <- readRDS("~/snowlines/data/data.snowlines_gradients.rds")

# Libraries ####
require(astrochron)

# Prep ####

# Get pval from model function
function.get_pval <- function(model) {
  with(summary(model), pf(fstatistic[1],fstatistic[2],fstatistic[3],lower.tail=F))
}

# climate analysis function
function.analyse_gradient <- function(gradient, date) {
  
  ols_regression <- lm(gradient ~ date)
  monte_carlo <- surrogateCor(dat1 = date,
                              dat2 = gradient,
                              nsim = 10000,
                              firstDif = FALSE,
                              genplot = TRUE,
                              verbose = FALSE,
                              cormethod = 3) # Mann-Kendall
  print(monte_carlo$datcor)
  
  outputs <- data.frame("ols_int" = ols_regression$coefficients[1],
                        "ols_grad" = ols_regression$coefficients[2],
                        "ols_adjr2" = summary(ols_regression)$adj.r.squared[1],
                        "ols_df" = summary(ols_regression)$df[2],
                        "ols_fstat" = summary(ols_regression)$fstatistic[1],
                        "ols_pval" = function.get_pval(ols_regression),
                        "mc_kendall_tau" = monte_carlo$datcor[1],
                        "mc_kendall_pval" = monte_carlo$pvalue[1],
                        "mc_kendall_df" = 9998)
  
  return(outputs)
  
}

# Analyse ####
stat.gradient_analysis <- function.analyse_rsla(data.snowlines_gradients$gradient, data.snowlines_gradients$aqcuisition_time_median)

# Melt from list to dataframe ####
stat.gradient_analysis_melted <- do.call(what = rbind,
                                         args = lapply(X = stat.gradient_analysis,
                                                       FUN = function(x) {x}))
# Save ####
saveRDS(file = "~/snowlines/outputs/snowline gradient/stat.gradient_analysis.rds", object = stat.gradient_analysis)
saveRDS(file = "~/snowlines/outputs/snowline gradient/stat.gradient_analysis_melted.rds", object = stat.gradient_analysis_melted)