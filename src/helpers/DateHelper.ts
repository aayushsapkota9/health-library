export function formatTimestampToDate(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function formatTimestampToDateTime(timestamp: string): string {
  const date = new Date(timestamp);

  // Nepal Time is UTC+5:45
  const nepalOffset = 5 * 60 + 45; // Convert hours and minutes to total minutes

  // Adjust the date object to Nepal Time
  const localTime = date.getTime();
  const nepalTime = new Date(localTime + nepalOffset * 60 * 1000);

  const year = nepalTime.getUTCFullYear();
  const month = String(nepalTime.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(nepalTime.getUTCDate()).padStart(2, '0');

  let hours = nepalTime.getUTCHours();
  const minutes = String(nepalTime.getUTCMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, '0');

  return `${year}-${month}-${day} (${formattedHours}:${minutes} ${ampm})`;
}

type RemainingTimeInfo = {
  remainingHours: number;
  displayValue: string;
};

export function calculateRemainingTime(
  dueDate: string,
  dueTime: string
): RemainingTimeInfo {
  // Combine the due date and due time into a single string
  const dueDateTimeString = `${dueDate}T${dueTime}`;

  // Create a Date object from the due date and time string
  const dueDateTime = new Date(dueDateTimeString);

  // Get the current date and time
  const currentDateTime = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds =
    dueDateTime.getTime() - currentDateTime.getTime();

  // Convert milliseconds to hours
  const remainingHours = differenceInMilliseconds / (1000 * 60 * 60);

  // Calculate days and hours
  const remainingDays = Math.floor(remainingHours / 24);
  const remainingHoursInDay = remainingHours % 24;

  // Determine display value
  let displayValue: string;
  if (remainingDays >= 1) {
    displayValue = remainingDays === 1 ? '1 day' : `${remainingDays} days`;
  } else {
    displayValue = `${remainingHoursInDay.toFixed(1)} hours`;
  }

  return { remainingHours, displayValue };
}
