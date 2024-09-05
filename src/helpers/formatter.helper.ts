import moment from 'moment';

export const formatDateIndonesian = (date: Date) => {
  // Define an array of Indonesian month names
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  // Extract date components
  const day = date.getDate();
  const month = date.getMonth(); // getMonth() returns 0-11
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes to always be two digits
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Construct the formatted date string
  const formattedDate = `${day} ${months[month]} ${year} Pukul ${formattedHours}:${formattedMinutes}`;

  return formattedDate;
};

// convert August 25, 2024 -> 2024-08-25
export const convertIntoNumericDate = (dateString: string) => {
  const months: { [key: string]: string } = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };

  const [month, day, year] = dateString.split(' ');
  const monthCode = months[month];
  const dayCode = day.replace(',', '').padStart(2, '0');

  return `${year}-${monthCode}-${dayCode}`;
};

// convert HH:mm -> {minute}
export function convertTimeToMinutes(time?: string) {
  if (time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  return 0;
}

export function formatNumericDateToEng(dateString: string) {
  const date = new Date(dateString);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let suffix = '';
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  return `${month} ${day}${suffix} ${year}`;
}

// convert new Date() -> HH:mm
export const convertHHmmTime = (date: Date) => {
  const timeHHmm = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return timeHHmm;
};

// convert HH:mm -> new Date()
export const convertStrToTime = (str: string) => {
  const timeString = str;
  const date = moment(timeString, 'HH:mm').toDate();
  return date;
};

// convert Date -> YYYY-MM-DD
export const convertDateToStr = (date: Date) => {
  return moment(date).format('YYYY-MM-DD');
};

// convert YYYY-MM-DD -> Date
export const YMDIntoDate = (dateString: string) => {
  return moment(dateString, 'YYYY-MM-DD').toDate();
};

// convert HH:mm:ss -> HH:mm
export function convertTimeHHmmss(timeStr: string) {
  // Split the input string into hours, minutes, and seconds
  let [hours, minutes, seconds] = timeStr.split(':');

  // Return the time in HH:mm format
  return `${hours}:${minutes}`;
}

// convert new Date() -> 20 Januari 2003
export function convertDateIntoIDDate(date: Date) {
  // Get the day, month, and year from the Date object
  let day = date.getDate();
  let month = date.toLocaleString('id-ID', { month: 'long' });
  let year = date.getFullYear();

  // Return the date in the format DD MMMM YYYY
  return `${day} ${month} ${year}`;
}

// convert HH:mm:ss -> new Date()
export function convertTimeHHmmssToDate(timeString: string) {
  // Assuming the input string is in the format "HH:mm:ss"
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  // Create a new Date object with the current date
  const date = new Date();

  // Set the hours, minutes, and seconds
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  // Optionally, set milliseconds to 0 for precision
  date.setMilliseconds(0);

  return date;
}

export function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const months = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;

  let result = '';
  if (months > 0) {
    result += `${months} Month${months > 1 ? 's' : ''}`;
  }
  // if (remainingDays > 0) {
  //   if (result) result += ' ';
  //   result += `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  // }
  // return result || '0 days';
  return result;
}
