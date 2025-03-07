/*
1.Takes the foercast data of 5 days 
2.Grouoing all the data by date
3.Find overall temp and cloud for the day 
4.Return an object of two data one is 5 day hourly data and one is overall 5 days data
*/


export const groupingTheFoercastDataThruDate = (foercastData) => {
  const foercastDataGroupedByDate = {};

  foercastData.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0].split("-")[2];

    // Initialize the date group if it doesn't exist
    if (!foercastDataGroupedByDate[date]) {
      foercastDataGroupedByDate[date] = {
        hourlyData: [],
        overallData: {
          minTemp: Math.floor(entry.main.temp_min),
          maxTemp: Math.floor(entry.main.temp_max),
          weatherConditions: {}, // Object to count different weather conditions
        },
      };
      // Push the entry to the hourlyData array for that date
      foercastDataGroupedByDate[date].hourlyData.push(entry);
      // Increment weather condition count
      foercastDataGroupedByDate[date].overallData.weatherConditions[
        entry.weather[0].main
      ] =
        (foercastDataGroupedByDate[date].overallData.weatherConditions[
          entry.weather[0].main
        ] || 0) + 1;
    } else {
      // For existing date, update hourlyData and calculate min/max temp
      foercastDataGroupedByDate[date].hourlyData.push(entry);
      foercastDataGroupedByDate[date].overallData.minTemp = Math.floor(
        Math.min(
          foercastDataGroupedByDate[date].overallData.minTemp,
          entry.main.temp_min
        )
      );
      foercastDataGroupedByDate[date].overallData.maxTemp = Math.floor(
        Math.max(
          foercastDataGroupedByDate[date].overallData.maxTemp,
          entry.main.temp_max
        )
      );

      // Increment weather condition count
      foercastDataGroupedByDate[date].overallData.weatherConditions[
        entry.weather[0].main
      ] =
        (foercastDataGroupedByDate[date].overallData.weatherConditions[
          entry.weather[0].main
        ] || 0) + 1;
    }
  });

  // Now calculate the most frequent weather condition for each day
  Object.keys(foercastDataGroupedByDate).forEach((date) => {
    const dayData = foercastDataGroupedByDate[date].overallData;

    // Find the most frequent weather condition (just pick the one with the highest count)
    let mostFrequentWeather = "";
    let maxCount = 0;
    for (let condition in dayData.weatherConditions) {
      if (dayData.weatherConditions[condition] > maxCount) {
        maxCount = dayData.weatherConditions[condition];
        mostFrequentWeather = condition;
      }
    }
    dayData.mostFrequentWeather = mostFrequentWeather;
  });

  return foercastDataGroupedByDate;
};
