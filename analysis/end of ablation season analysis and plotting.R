# Reset ####
rm(list = ls())
while (dev.cur() > 1) dev.off()

# Read in data.snow_depth ####
data.snow_depth <- readRDS("~/snowlines/data/data.snow_depth.rds")

# Years List ####
date_list <-list(
  "1981" = list(
    "x1" = 8525,
    "x2" = 8889,
    "name" = 1981),
  "1982" = list(
    "x1" = 8889,
    "x2" = 9253,
    "name" = 1982),
  "1983" = list(
    "x1" = 9254,
    "x2" = 9618,
    "name" = 1983),
  "1984" = list(
    "x1" = 9618,
    "x2" = 9984,
    "name" = 1984),
  "1985" = list(
    "x1" = 9986,
    "x2" = 10350,
    "name" = 1985),
  "1986" = list(
    "x1" = 10351,
    "x2" = 10715,
    "name" = 1986),
  "1987" = list(
    "x1" = 10716,
    "x2" = 11080,
    "name" = 1987),
  "1988" = list(
    "x1" = 11081,
    "x2" = 11445,
    "name" = 1988),
  "1989" = list(
    "x1" = 11447,
    "x2" = 11811,
    "name" = 1989),
  "1990" = list(
    "x1" = 11812,
    "x2" = 12176,
    "name" = 1990),
  "1991" = list(
    "x1" = 12177,
    "x2" = 12541,
    "name" = 1991),
  "1992" = list(
    "x1" = 12541,
    "x2" = 12907,
    "name" = 1992),
  "1993" = list(
    "x1" = 12908,
    "x2" = 13272,
    "name" = 1993),
  "1994" = list(
    "x1" = 13273,
    "x2" = 13637,
    "name" = 1994),
  "1995" = list(
    "x1" = 13638,
    "x2" = 14002,
    "name" = 1995),
  "1996" = list(
    "x1" = 14003,
    "x2" = 14369,
    "name" = 1996),
  "1997" = list(
    "x1" = 14370,
    "x2" = 14733,
    "name" = 1997),
  "1998" = list(
    "x1" = 14734,
    "x2" = 15097,
    "name" = 1998),
  "1999" = list(
    "x1" = 15098,
    "x2" = 15463,
    "name" = 1999),
  "2000" = list(
    "x1" = 15464,
    "x2" = 15830,
    "name" = 2000),
  "2001" = list(
    "x1" = 15831,
    "x2" = 16194,
    "name" = 2001),
  "2002" = list(
    "x1" = 16195,
    "x2" = 16559,
    "name" = 2002),
  "2003" = list(
    "x1" = 16560,
    "x2" = 16924,
    "name" = 2003),
  "2004" = list(
    "x1" = 16925,
    "x2" = 17290,
    "name" = 2004),
  "2005" = list(
    "x1" = 17291,
    "x2" = 17655,
    "name" = 2005),
  "2006" = list(
    "x1" = 17656,
    "x2" = 18020,
    "name" = 2006),
  "2007" = list(
    "x1" = 18021,
    "x2" = 18385,
    "name" = 2007),
  "2008" = list(
    "x1" = 18386,
    "x2" = 18751,
    "name" = 2008),
  "2009" = list(
    "x1" = 18751,
    "x2" = 19116,
    "name" = 2009),
  "2010" = list(
    "x1" = 19117,
    "x2" = 19481,
    "name" = 2010),
  "2011" = list(
    "x1" = 19482,
    "x2" = 19846,
    "name" = 2011),
  "2012" = list(
    "x1" = 19847,
    "x2" = 20212,
    "name" = 2012),
  "2013" = list(
    "x1" = 20213,
    "x2" = 20577,
    "name" = 2013),
  "2014" = list(
    "x1" = 20578,
    "x2" = 20942,
    "name" = 2014),
  "2015" = list(
    "x1" = 20943,
    "x2" = 21307,
    "name" = 2015),
  "2016" = list(
    "x1" = 21308,
    "x2" = 21673,
    "name" = 2016),
  "2017" = list(
    "x1" = 21674,
    "x2" = 22039,
    "name" = 2017),
  "2018" = list(
    "x1" = 22039,
    "x2" = 22403,
    "name" = 2018),
  "2019" = list(
    "x1" = 22404,
    "x2" = 22768,
    "name" = 2019),
  "2020" = list(
    "x1" = 22769,
    "x2" = 23134,
    "name" = 2020),
  "2021" = list(
    "x1" = 23135,
    "x2" = 23499,
    "name" = 2021)
)

# Plot and Record ####

# End of ablation season date dataframe blank output
data.end_of_ablation_season_dates <- na.omit(data.frame("year" = NA,
                                                        "Date" = NA))


# Open Console Recorder
sink("~/snowlines/outputs/end of ablation season/Juvasshoe Day of First Zero Snow Depth.txt")

for (i in date_list) {
  
  # Reconstruct Data and Variables
  x1 = i$x1
  x2 = i$x2
  name = i$name
  data2 = data.snow_depth[x1:x2,]
  
  # Open SVG
  svg(filename = paste0("~/snowlines/outputs/end of ablation season/", name, ".svg"), width = 16, height = 10, pointsize = 20)
  
  # Plot
  par(cex = 0.8)
  plot(data2$Date, data2$Anestolen_443,
       type = 'l',
       lwd = 2,
       col = "red",
       xlab = "",
       ylab = "",
       yaxs = "i",
       xaxs = "i",
       ylim = c(0, 250),
       #main = name
  )
  mtext("Snow Depth (cm)", side = 2, line = 3, cex = 1)
  mtext("Date", side = 1, line = 3, cex = 1)
  
  points(data2$Date, data2$FV614_Grytadalen_422,
         type = 'l',
         lwd = 2,
         col = "cyan")
  points(data2$Date, data2$Jostedalen_Mjolversgrendi_305,
         type = 'l',
         lwd = 2,
         col = "green")
  points(data2$Date, data2$Juvasshoe_1894,
         type = 'l',
         lwd = 2,
         col = "blue")
  points(data2$Date, data2$Myklebust_I_Breim_315,
         type = 'l',
         lwd = 2,
         col = "purple")
  points(data2$Date, data2$Sognefjellet_snopute_nye_1425,
         type = 'l',
         lwd = 2,
         col = "pink")
  
  # Close SVG
  dev.off()
  
  # Print Day of First Snow at Juvasshoe
  index = which(data2$Juvasshoe_1894 == 0, arr.ind = TRUE)[1]
  cat(paste0("\nJuvasshoe first day of zero snow depth:  ", data2$Date[index]))
  
  # Print Days of Zero Snow at Juvasshoe
  #index = which(data2$Juvasshoe_1894 %in% 0)
  #cat("\nDates of zero snow depth for", name, "at Juvasshoe (Blue)\n")
  #print(data2$Date[index], quote = FALSE)
  
  # Export end of ablation season dates
  # Add to output list, removing altitudes, .geo, system index. 
  data.end_of_ablation_season_dates[nrow(data.end_of_ablation_season_dates) +1, ] <- na.omit(c(name, as.Date(data2$Date[index], origin = "1970-01-01")))

  # Cleanup
  rm("name")
  rm("x1")
  rm("x2")
  rm("data2")
  rm("index")
}
sink()

# Save ####
saveRDS(file = "~/snowlines/data/data.end_of_ablation_season_dates.rds", object = data.end_of_ablation_season_dates)