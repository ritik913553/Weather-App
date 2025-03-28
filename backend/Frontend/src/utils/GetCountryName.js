export function getCountryName(countryCode) {
    if (!countryCode) return "Unknown Country"; // Handle undefined/null cases

    const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode);
    return countryName || "Unknown Country"; // Return name or fallback
}