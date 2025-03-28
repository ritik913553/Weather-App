function getWindStatus(windSpeed, windDeg) {
    // Wind direction mapping
    const directions = [
        "North", "Northeast", "East", "Southeast",
        "South", "Southwest", "West", "Northwest", "North"
    ];
    
    // Convert degrees to a direction (each section = 45°)
    let index = Math.round(windDeg / 45) % 8;
    let windDirection = directions[index];

    // Wind speed classification (in m/s)
    let windCondition;
    if (windSpeed < 0.3) windCondition = "Calm 🌿";
    else if (windSpeed < 1.5) windCondition = "Light Air 🍃";
    else if (windSpeed < 3.3) windCondition = "Light Breeze 🌬️";
    else if (windSpeed < 5.5) windCondition = "Gentle Breeze 💨";
    else if (windSpeed < 8) windCondition = "Moderate Wind 🍃💨";
    else if (windSpeed < 10.8) windCondition = "Fresh Wind 🌪️";
    else if (windSpeed < 13.9) windCondition = "Strong Wind 🌬️💨";
    else if (windSpeed < 17.2) windCondition = "Near Gale 🌊";
    else if (windSpeed < 20.8) windCondition = "Gale 🌪";
    else if (windSpeed < 24.5) windCondition = "Strong Gale 🌪🌬️";
    else if (windSpeed < 28.5) windCondition = "Storm 🌩️";
    else windCondition = "Hurricane 🌀";

    return `${windCondition}, From ${windDirection}`;
}

export { getWindStatus };
// Example usage
