export const historyRefine = (history) => {
    const now = new Date();

    // Function to calculate the time difference
    const calculateTimeDifference = (searchDate) => {
        const targetDate = new Date(searchDate);
        const timeDiffInMs = now - targetDate;
        const seconds = timeDiffInMs / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const months = days / 30.44; // Average days in a month
        const years = days / 365.25; // Average days in a year
        let time;

        if (years >= 1) {
            time = `${Math.floor(years)} year${years >= 2 ? 's' : ''} ago`;
        } else if (months >= 1) {
            time = `${Math.floor(months)} month${months >= 2 ? 's' : ''} ago`;
        } else if (days >= 7) {
            time = `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
        } else if (days >= 1) {
            time = `${Math.floor(days)} day${days >= 2 ? 's' : ''} ago`;
        } else if (hours >= 1) {
            time = `${Math.floor(hours)} hour${hours >= 2 ? 's' : ''} ago`;
        } else if (minutes >= 1) {
            time = `${Math.floor(minutes)} minute${minutes >= 2 ? 's' : ''} ago`;
        } else {
            time = `${Math.floor(seconds)} second${seconds >= 2 ? 's' : ''} ago`;
        }

        return time;
    };

    // Iterate over the history array and add the 'refineDate' field
    const refinedHistory = history.map(item => {
        const { searchDate } = item; // Get the search date field from the object
        const refineDate = calculateTimeDifference(searchDate); // Calculate the refined date
        return { ...item, refineDate }; // Return a new object with the refineDate added
    });

    console.log(refinedHistory); // Log the updated history array
    return refinedHistory; // Return the updated history array with the new `refineDate`
};

