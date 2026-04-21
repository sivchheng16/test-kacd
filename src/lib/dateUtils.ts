/**
 * Formats a date string to the user's specific requested format:
 * "Wed Jan 17 2018"time"10:41:51 PM"
 * 
 * Specifically converted to Asia/Phnom_Penh (Cambodia) timezone.
 */
export function formatStudentDate(dateString: string | Date | undefined): string {
  if (!dateString) return 'Never';

  const date = new Date(dateString);
  
  // Format the date part (e.g., Wed Jan 17 2018)
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Phnom_Penh',
  };
  
  // Format the time part (e.g., 10:41:51 PM)
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Phnom_Penh',
  };

  const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
  const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);

  // Get parts and remove commas to match requested format
  const dateParts = dateFormatter.format(date).replace(/,/g, '');
  const timeParts = timeFormatter.format(date);

  return `${dateParts}"time"${timeParts}`;
}
