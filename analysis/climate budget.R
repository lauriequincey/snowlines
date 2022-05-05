for(i in seq(1981, 2021, 1)) {
  
  snowfall <- data.frame("x1" = data.climate[[paste0(i)]]$autumn_snowfall_mean,
                         "x2" = data.climate[[paste0(i)]]$winter_snowfall_mean,
                         "x3" = data.climate[[paste0(i)]]$spring_snowfall_mean,
                         "x4" = data.climate[[paste0(i)]]$summer_snowfall_mean)
  
  snowmelt <- data.frame("x1" = data.climate[[paste0(i)]]$autumn_snowmelt_mean,
                         "x2" = data.climate[[paste0(i)]]$winter_snowmelt_mean,
                         "x3" = data.climate[[paste0(i)]]$spring_snowmelt_mean,
                         "x4" = data.climate[[paste0(i)]]$summer_snowmelt_mean)
  
  budget <- snowfall - snowmelt
  
  z <- data.climate[[paste0(i)]]$distance
  
  plot(x = z,
       y = seq(1,159,1),
       #xlim = c(0, 250),
       ylim = c(-0.01, 0.01),
       type = "n",
       main = i)
  
  points(x = z,
         y = budget$x1,
         pch = 16,
         col = "red")
  points(x = z,
         y = budget$x2,
         pch = 16,
         col = "blue")
  points(x = z,
         y = budget$x3,
         pch = 16,
         col = "green")
  points(x = z,
         y = budget$x4,
         pch = 16,
         col = "yellow")
  points(x = z,
         y = budget$x3 + budget$x4,
         pch = 16,
         col = "purple")
  
}
