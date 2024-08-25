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

export function formatNumericDateToEng(dateString : string) {
  const date = new Date(dateString);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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



export const convertHHmmTime = (date: Date) => {
  const timeHHmm = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return timeHHmm;
};

export const convertStrToDate = (str: string) => {
  const timeString = str;
  const date = moment(timeString, 'HH:mm').toDate();
  return date;
};
