# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Residuals
data.snowlines <- readRDS(file = "~/snowlines/data/data.snowlines")

model <- lm(data.snowlines$`2018`$altitude ~ data.snowlines$`2018`$distance)

mean(summary(model)$residuals)

plot(data.snowlines$`2018`$altitude,
     summary(model)$residuals,
     pch = ".")

hist(summary(model)$residuals)
